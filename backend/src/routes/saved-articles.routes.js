const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware.js");
const savedArticleController = require("../controllers/saved-articles.controller.js");
const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");

// Save an article
router.post(
  "/:articleId",
  authenticate,
  asyncHandler(savedArticleController.saveArticle)
);

// Unsave an article
router.delete(
  "/:articleId",
  authenticate,
  asyncHandler(savedArticleController.unsaveArticle)
);

// Get all saved articles of a user
router.get(
  "/",
  authenticate,
  asyncHandler(savedArticleController.getSavedArticles)
);

module.exports = router;
