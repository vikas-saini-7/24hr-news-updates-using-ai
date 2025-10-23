const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");

const usageController = require("../controllers/usage.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");

router.get("/sentiment", authenticate, asyncHandler(usageController.getUsage));

module.exports = router;
