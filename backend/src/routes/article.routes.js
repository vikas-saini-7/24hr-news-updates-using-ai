const express = require("express");
const router = express.Router();
const {
  authenticate,
  authenticateAI,
  authenticateOptional,
} = require("../middlewares/auth.middleware.js");

const articleController = require("../controllers/article.controller.js");
const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");

router.post("/", authenticateAI, asyncHandler(articleController.createArticle));
// router.get("/:id", authenticate, articleController.getArticleById);
router.delete(
  "/:id",
  authenticate,
  asyncHandler(articleController.deleteArticle)
);

// exposed for public access
router.get(
  "/top-stories",
  authenticateOptional,
  asyncHandler(articleController.getTopStories)
);
router.get(
  "/",
  authenticateOptional,
  asyncHandler(articleController.getAllArticlesByCategory)
);
router.get(
  "/:slug",
  authenticateOptional,
  asyncHandler(articleController.getArticleBySlug)
);
router.get(
  "/:id/related",
  authenticateOptional,
  asyncHandler(articleController.getRelatedArticles)
);

module.exports = router;
