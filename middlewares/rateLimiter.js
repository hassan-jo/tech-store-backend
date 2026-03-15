const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
};
