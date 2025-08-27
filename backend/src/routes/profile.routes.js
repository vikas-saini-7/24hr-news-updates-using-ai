const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile.controller.js");
const { authenticate } = require("../middlewares/auth.middleware.js");

router.get("/", authenticate, profileController.getProfile);
// router.put("/", profileController.updateProfile);

module.exports = router;
