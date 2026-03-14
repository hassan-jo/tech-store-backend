const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
});

module.exports = {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
};