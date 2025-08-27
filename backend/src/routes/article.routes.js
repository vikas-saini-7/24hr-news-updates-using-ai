const express = require("express");
const router = express.Router();
const {
  authenticate,
  authenticateAI,
} = require("../middlewares/auth.middleware.js");

const articleController = require("../controllers/article.controller.js");

router.post("/", authenticateAI, articleController.createArticle);
// router.get("/:id", authenticate, articleController.getArticleById);
router.delete("/:id", authenticate, articleController.deleteArticle);

// exposed for public access
router.get("/:slug", articleController.getArticleBySlug);
router.get("/", articleController.getAllArticlesByCategory);
router.get("/:id/related", articleController.getRelatedArticles);

module.exports = router;
