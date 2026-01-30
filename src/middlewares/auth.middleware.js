const { verifyToken } = require('../utils/jwt');
const { JWT_SECRET } = require('../config/env');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const user = verifyToken(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};
