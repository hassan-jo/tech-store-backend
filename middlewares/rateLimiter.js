const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
});

module.exports = {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
};
