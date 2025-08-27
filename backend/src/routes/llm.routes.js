const express = require("express");
const router = express.Router();
const llmController = require("../controllers/llm.controller.js");

router.get("/summary", llmController.getSummary);

module.exports = router;
