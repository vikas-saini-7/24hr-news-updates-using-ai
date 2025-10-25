const { db } = require("../lib/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { payments, users } = require("../lib/schema");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPaymentOrder = async ({ userId, amount, currency }) => {
  // const existingPayment = await db
  //   .select()
  //   .from(payments)
  //   .where(eq(payments.user_id, userId))
  //   .where(eq(payments.status, "paid"))
  //   .limit(1);

  // if (existingPayment.length > 0) {
  //   throw new Error("You already have a premium plan!");
  // }

  const order = await razorpay.orders.create({
    amount: amount * 100, // Amount in smallest currency unit
    currency: currency,
    receipt: `receipt_order_${Date.now()}`,
  });

  await db.insert(payments).values({
    user_id: userId,
    amount,
    provider_order_id: order.id,
    status: "created",
  });

  return order;
};

exports.verifyPayment = async ({
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    // Update payment status
    await db
      .update(payments)
      .set({ provider_payment_id: razorpay_payment_id, status: "paid" })
      .where({ provider_order_id: razorpay_order_id });

    // Upgrade user plan to PREMIUM
    await db.update(users).set({ plan: "PREMIUM" }).where({ id: userId });

    return true;
  } else {
    throw new Error("Invalid payment signature");
  }
};
