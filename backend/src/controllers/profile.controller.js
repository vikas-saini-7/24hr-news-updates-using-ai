const { fetchProfile } = require("../services/profile.service.js");

exports.getProfile = async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user.id; // Assuming user ID is available in req.user
    const profile = await fetchProfile({ userId });

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    console.error("error in getting profile:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving profile",
      error: error.message,
    });
  }
};
