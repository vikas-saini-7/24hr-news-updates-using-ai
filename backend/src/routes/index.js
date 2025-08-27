const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const articleRoutes = require("./article.routes.js");
const llmRoutes = require("./llm.routes.js");

router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/llm", llmRoutes);

module.exports = router;
