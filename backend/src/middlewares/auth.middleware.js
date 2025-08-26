const { verifyAccessToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired. Please refresh.",
      });
    }
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

module.exports = { authenticate };
