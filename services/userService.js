const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const refreshService = require("./authRefreshService");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");

// REGISTER
const registerUser = async (username, email, password) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: Date.now() + 1000 * 60 * 60
  });

  const verifyURL = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`;

  const html = `
    <h2>Email Verification</h2>
    <p>Please verify your email:</p>
    <a href="${verifyURL}">Verify Email</a>
  `;

  await sendEmail(user.email, "Verify your email", html);

  return {
    _id: user._id,
    username: user.username,
    email: user.email
  };
};

// VERIFY EMAIL
const verifyEmail = async (token) => {

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  return true;
};

// LOGIN
const loginUser = async (email, password) => {

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      tokenVersion: user.tokenVersion
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = await refreshService.generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    role: user.role
  };
};

// LOGOUT
const logoutUser = async (userId, accessToken, refreshToken) => {

  const tokenRecord = await Token.findOne({ user: userId });

  if (!tokenRecord) return true;

  if (accessToken) {

    tokenRecord.blacklistedAccessTokens =
      tokenRecord.blacklistedAccessTokens || [];

    if (!tokenRecord.blacklistedAccessTokens.includes(accessToken)) {
      tokenRecord.blacklistedAccessTokens.push(accessToken);
    }

  }

  if (refreshToken) {
    tokenRecord.refreshToken = null;
  }

  await tokenRecord.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail
};