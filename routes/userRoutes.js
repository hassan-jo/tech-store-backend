const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middlewares/validation/authValidation");
const { loginLimiter, registerLimiter, refreshLimiter } = require("../middlewares/rateLimiter");
const jwtValidate = require("../middlewares/jwtValidate");
const User = require("../models/User");

router.post("/register", registerLimiter, validateRegister, authController.register);
router.post("/login", loginLimiter, validateLogin, authController.login);
router.post("/refresh", refreshLimiter, authController.refreshToken);
router.post("/logout", jwtValidate, authController.logout);
router.get("/verify-email/:token", authController.verifyEmail);
router.get("/users-count", async (req, res) => {
  const count = await User.countDocuments();

  res.json({
    success: true,
    count
  });
});
module.exports = router;