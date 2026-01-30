const express = require('express');
const {
    getProfile,
    updateProfile,
    listUsers
} = require('../controllers/user.controller');
const {
    authenticateToken,
    authorizeRoles
} = require('../middlewares/auth.middleware');

const router = express.Router();

// Protected routes
router.use(authenticateToken);

router.get('/me', getProfile);
router.patch('/me', updateProfile);

// Admin routes
router.get('/', authorizeRoles('admin'), listUsers);

module.exports = router;
