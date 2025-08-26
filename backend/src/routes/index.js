const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes.js");
const articleRoutes = require("./article.routes.js");

router.use("/auth", authRoutes);
router.use("/article", articleRoutes);

module.exports = router;
