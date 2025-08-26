const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware.js");

const articleController = require("../controllers/article.controller.js");

router.get("/", articleController.getAllArticlesByCategory);
router.post("/", authenticate, articleController.createArticle);
router.get("/:id", authenticate, articleController.getArticleById);
router.delete("/:id", authenticate, articleController.deleteArticle);

module.exports = router;
