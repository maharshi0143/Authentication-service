const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET
} = require('../config/env');

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user.id
    },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
