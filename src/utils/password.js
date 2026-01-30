const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword
};