const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware.js");
const savedArticleController = require("../controllers/savedArticles.controller.js");

// Save an article
router.post("/", authenticate, savedArticleController.saveArticle);

// Unsave an article
router.delete("/:articleId", authenticate, savedArticleController.unsaveArticle);

// Get all saved articles of a user
router.get("/", authenticate, savedArticleController.getSavedArticles);

module.exports = router;
