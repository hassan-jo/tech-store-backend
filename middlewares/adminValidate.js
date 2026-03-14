const adminValidate = (req, res, next) => {
  try {

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden - Admin only",
      });
    }

    next();

  } catch {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = adminValidate;