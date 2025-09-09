const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");
const { authenticate } = require("../middlewares/auth.middleware.js");

const profileController = require("../controllers/profile.controller.js");

router.get("/", authenticate, asyncHandler(profileController.getProfile));
// router.put("/", profileController.updateProfile);

module.exports = router;
