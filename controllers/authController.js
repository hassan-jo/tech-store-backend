const userService = require("../services/userService");
const refreshService = require("../services/authRefreshService");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const data = await userService.registerUser(username, email, password);

    res.status(201).json({
      success: true,
      message: "User registered. Please verify your email.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params; // ✅ التعديل هنا

    await userService.verifyEmail(token);

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        role: data.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = await refreshService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {

  try {

    const refreshToken = req.body?.refreshToken;

    const authHeader = req.headers.authorization;

    const accessToken = authHeader?.split(" ")[1];

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await userService.logoutUser(userId, accessToken, refreshToken);

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    next(error);
  }

};
module.exports = {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
};