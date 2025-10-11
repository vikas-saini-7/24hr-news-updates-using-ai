const { searchNewsArticles } = require("../services/search.service.js");

exports.searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user?.id; // Get user ID from authenticated user

    const articles = await searchNewsArticles({
      query,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Articles searched successfully",
      data: articles,
    });
  } catch (error) {
    console.error("error in searching articles:", error);
    res.status(500).json({
      success: false,
      message: "Error searching Articles",
      error: error.message,
    });
  }
};
