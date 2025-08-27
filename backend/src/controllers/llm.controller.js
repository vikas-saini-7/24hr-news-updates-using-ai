const { getNewsSummary } = require("../services/llm.service.js");

exports.getSummary = async (req, res) => {
  try {
    const { model } = req.query;
    const summary = await getNewsSummary({ model });

    res.status(200).json({
      success: true,
      message: "Summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.error("error in getting summary:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
