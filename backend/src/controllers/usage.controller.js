const { fetchUsage } = require("../services/usage.service.js");

exports.getUsage = async (req, res) => {
  try {
    const userId = req.user.id;
    const usage = await fetchUsage({ userId });

    res.status(200).json({
      success: true,
      message: "Usage retrieved successfully",
      data: usage,
    });
  } catch (error) {
    console.error("error in getting usage:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving usage",
      error: error.message,
    });
  }
};
