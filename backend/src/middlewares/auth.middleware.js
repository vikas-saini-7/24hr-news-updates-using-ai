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

const authenticateAI = (req, res, next) => {
  try {
    const token = req.headers["last-24hr-updates-api-key"];

    if (!token || token !== process.env.LAST_24HR_UPDATES_API_KEY) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    console.log("AI Authenticated");

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { authenticate, authenticateAI };
