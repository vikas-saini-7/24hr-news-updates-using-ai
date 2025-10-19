const { verifyAccessToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  try {
    // console.log("Authenticating token:", token);
    const token = await req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }
    let decoded;
    if (token) {
      decoded = verifyAccessToken(token);
    }

    if (decoded) {
      req.user = decoded;
    }

    next();
  } catch (error) {
    console.log("Authentication error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired. Please refresh.",
      });
    }
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

const authenticateOptional = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded || null;
    return next();
  } catch {
    req.user = null;
    return next();
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

module.exports = { authenticate, authenticateOptional, authenticateAI };
