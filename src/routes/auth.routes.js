const express = require('express');
const {
    register,
    login,
    refreshToken,
    googleAuth,
    googleCallback,
    githubAuth,
    githubCallback
} = require('../controllers/auth.controller');
const authLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refresh', refreshToken);

// OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

module.exports = router;
