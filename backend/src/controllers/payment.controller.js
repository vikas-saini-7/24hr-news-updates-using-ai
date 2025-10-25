const { createUserPayment, verifyUserPayment } = require("../services/payment.service.js");

exports.createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, currency } = req.body;

    const order = await createUserPayment({ userId, amount, currency });

    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: order,
    });
  } catch (error) {
    console.error("error in creating payment:", error);
    res.status(500).json({
      success: false,
      message: "Error creating payment",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    await verifyUserPayment({
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and plan upgraded successfully",
    });
  } catch (error) {
    console.error("error in verifying payment:", error);
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
