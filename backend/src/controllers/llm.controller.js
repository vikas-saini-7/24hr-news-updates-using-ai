const {
  streamNewsSummaryFromWeb,
  getSentimentAnalysisFromUrl,
} = require("../services/llm.service");

/**
 * @desc Stream AI-generated news summary based on topic query
 * @route POST /api/llm/summary
 * @route GET /api/llm/summary
 * @access Public
 */
exports.getNewsSummary = async (req, res, next) => {
  try {
    const query = req.body.query || req.query.query;
    const length = req.body.length || req.query.length;

    if (!query) {
      const error = new Error("Query is required for summary");
      error.statusCode = 400;
      throw error;
    }

    const summaryLength = length || "short";
    await streamNewsSummaryFromWeb(query, summaryLength, res);
  } catch (err) {
    console.error("Error in getNewsSummary controller:", err);
    if (!res.headersSent) {
      next(err);
    }
  }
};

/**
 * @desc Get sentiment analysis result from article URL as JSON
 * @route POST /api/llm/sentiment
 * @access Public
 */
exports.getSentimentAnalysis = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Article URL is required for sentiment analysis",
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (urlError) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format provided",
      });
    }

    const sentimentData = await getSentimentAnalysisFromUrl(url);

    res.status(200).json({
      success: true,
      data: sentimentData,
    });
  } catch (err) {
    console.error("Error in getSentimentAnalysis controller:", err);

    // Handle specific error cases
    if (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED") {
      return res.status(503).json({
        success: false,
        message: "Unable to fetch article. Please check the URL and try again.",
      });
    }

    if (err.statusCode === 400) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};
