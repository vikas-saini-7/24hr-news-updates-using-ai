const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");

const llmController = require("../controllers/llm.controller.js");

router.get("/summary", asyncHandler(llmController.getSummary));

module.exports = router;
s;
