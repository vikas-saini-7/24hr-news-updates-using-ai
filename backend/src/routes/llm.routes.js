const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");
const llmController = require("../controllers/llm.controller.js");

router.post("/summary", asyncHandler(llmController.getNewsSummary));
router.get("/summary", asyncHandler(llmController.getNewsSummary));
router.post("/sentiment", asyncHandler(llmController.getSentimentAnalysis));

module.exports = router;
