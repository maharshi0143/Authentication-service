const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: false, // Disable the `RateLimit-*` headers
  legacyHeaders: true, // Enable the `X-RateLimit-*` headers
  message: 'Too many login attempts from this IP, please try again after a minute',
  handler: (req, res, next, options) => {
    res.status(429).json({
      message: options.message,
    });
  }
});

module.exports = authLimiter;
