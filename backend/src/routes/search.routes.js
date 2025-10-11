const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");

const searchController = require("../controllers/search.controller.js");
const { authenticateOptional } = require("../middlewares/auth.middleware.js");

router.get(
  "/articles",
  authenticateOptional,
  asyncHandler(searchController.searchArticles)
);

module.exports = router;
