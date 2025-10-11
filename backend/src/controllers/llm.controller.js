// controllers/summary.controller.js
const { streamNewsSummaryFromWeb } = require("../services/llm.service.js");

exports.getSummary = async (req, res) => {
  const userQuery = req.query.query || "world news";
  const length = req.query.length || "short";
  await streamNewsSummaryFromWeb(userQuery, length, res);
};
