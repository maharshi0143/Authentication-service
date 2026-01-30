const pool = require('../config/db');

const getUserById = async (id) => {
    const { rows } = await pool.query(
        'SELECT id, name, email, role FROM users WHERE id = $1',
        [id]
    );
    return rows[0];
};

const updateUser = async (id, { name }) => {
    const { rows } = await pool.query(
        'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, role',
        [name, id]
    );
    return rows[0];
};

const getAllUsers = async () => {
    const { rows } = await pool.query('SELECT id, name, email, role FROM users');
    return rows;
};

module.exports = {
    getUserById,
    updateUser,
    getAllUsers
};
