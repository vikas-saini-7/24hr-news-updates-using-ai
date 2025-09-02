const express = require("express");
const router = express.Router();
const {
  authenticate,
  authenticateAI,
  authenticateOptional,
} = require("../middlewares/auth.middleware.js");

const articleController = require("../controllers/article.controller.js");

router.post("/", authenticateAI, articleController.createArticle);
// router.get("/:id", authenticate, articleController.getArticleById);
router.delete("/:id", authenticate, articleController.deleteArticle);

// exposed for public access
router.get(
  "/top-stories",
  authenticateOptional,
  articleController.getTopStories
);
router.get(
  "/",
  authenticateOptional,
  articleController.getAllArticlesByCategory
);
router.get("/:slug", authenticateOptional, articleController.getArticleBySlug);
router.get(
  "/:id/related",
  authenticateOptional,
  articleController.getRelatedArticles
);

module.exports = router;
