const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const User = require("../models/User");

const jwtValidate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        message: "Token revoked"
      });
    }

    const blacklistedToken = await Token.findOne({
      user: decoded.userId,
      blacklistedAccessTokens: { $in: [token] }
    });

    if (blacklistedToken) {
      return res.status(401).json({
        message: "Token revoked"
      });
    }

    req.user = decoded;

    next();

  } catch {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
};

module.exports = jwtValidate;