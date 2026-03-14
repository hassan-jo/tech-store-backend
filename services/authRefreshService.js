const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/* =========================
   Generate Refresh Token
========================= */
const generateRefreshToken = async (user) => {

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      tokenVersion: user.tokenVersion
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const hashedRefresh = await bcrypt.hash(refreshToken, SALT_ROUNDS);

  await Token.findOneAndUpdate(
    { user: user._id },
    {
      refreshToken: hashedRefresh
    },
    { upsert: true, new: true }
  );

  return refreshToken;
};

/* =========================
   Refresh Access Token
========================= */
const refreshAccessToken = async (oldRefreshToken) => {

  if (!oldRefreshToken) {
    throw new Error("Refresh token required");
  }

  try {

    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const tokenRecord = await Token.findOne({
      user: decoded.userId
    });

    if (!tokenRecord || !tokenRecord.refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const isMatch = await bcrypt.compare(
      oldRefreshToken,
      tokenRecord.refreshToken
    );

    if (!isMatch) {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      throw new Error("Token revoked");
    }

    const newRefreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const hashedNewRefresh = await bcrypt.hash(
      newRefreshToken,
      SALT_ROUNDS
    );

    tokenRecord.refreshToken = hashedNewRefresh;
    await tokenRecord.save();

    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };

  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = {
  generateRefreshToken,
  refreshAccessToken
};