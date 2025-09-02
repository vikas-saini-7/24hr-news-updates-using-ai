const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const saveArticlesRoutes = require("./saved-articles.routes.js");
const articleRoutes = require("./article.routes.js");
const llmRoutes = require("./llm.routes.js");
const profileRoutes = require("./profile.routes.js");

router.use("/auth", authRoutes);
router.use("/articles/save", saveArticlesRoutes);
router.use("/articles", articleRoutes);
router.use("/llm", llmRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
