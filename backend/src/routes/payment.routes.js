const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/global-error-handler/asyncHandler.js");
const { authenticate } = require("../middlewares/auth.middleware.js");

const paymentController = require("../controllers/payment.controller.js");

router.post(
  "/create",
  authenticate,
  asyncHandler(paymentController.createPayment)
);

router.post(
  "/verify",
  authenticate,
  asyncHandler(paymentController.verifyPayment)
);

module.exports = router;
