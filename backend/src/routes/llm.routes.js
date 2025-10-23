const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");
const llmController = require("../controllers/llm.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");
const usageLimiter = require("../middlewares/usage.middleware.js");

router.post("/summary", asyncHandler(llmController.getNewsSummary));
router.get("/summary", asyncHandler(llmController.getNewsSummary));
router.post(
  "/sentiment",
  authenticate,
  usageLimiter,
  asyncHandler(llmController.getSentimentAnalysis)
);

module.exports = router;
