const pool = require('../config/db');
const { hashPassword } = require('../utils/password');

const createUser = async ({ name, email, password }) => {
  const passwordHash = await hashPassword(password);

  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role
  `;

  const values = [name, email, passwordHash];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rows[0];
};

const { comparePassword } = require('../utils/password');

const validateUserCredentials = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || !user.password_hash) {
    return null;
  }

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    return null;
  }

  return user;
};

const findOrCreateProviderUser = async ({ name, email, provider, providerUserId }) => {
  // 1. Check if user exists by email
  let user = await findUserByEmail(email);

  if (user) {
    // 2. If user exists, check if this provider is already linked
    const providerQuery = `
      SELECT * FROM auth_providers 
      WHERE user_id = $1 AND provider = $2
    `;
    const providerRes = await pool.query(providerQuery, [user.id, provider]);

    if (providerRes.rows.length === 0) {
      // Link new provider
      await pool.query(
        'INSERT INTO auth_providers (user_id, provider, provider_user_id) VALUES ($1, $2, $3)',
        [user.id, provider, providerUserId]
      );
    }
  } else {
    // 3. User does not exist, create new user and link provider
    // Note: We don't have a password for social login users. 
    // The DB schema allows nullable password_hash.

    // Create User
    const userQuery = `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING id, name, email, role
    `;
    const userRes = await pool.query(userQuery, [name, email]);
    user = userRes.rows[0];

    // Link Provider
    await pool.query(
      'INSERT INTO auth_providers (user_id, provider, provider_user_id) VALUES ($1, $2, $3)',
      [user.id, provider, providerUserId]
    );
  }

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  validateUserCredentials,
  findOrCreateProviderUser
};
