"use client";
import LandingHeader from "@/components/landing/LandingHeader";
import PlanComparisonOnPayment from "@/components/subscribe/PlanComparisonOnPayment";
import { useAuth } from "@/contexts/AuthContext";
import {
  IconCheck,
  IconCrown,
  IconCreditCard,
  IconLock,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";

const GoPremiusPage = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handlePayment = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      setIsProcessing(true);

      // 1️⃣ Create order from backend
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create`,
        { amount: 99, currency: "INR" },
        { withCredentials: true } // send cookies if any
      );

      if (!data.success)
        throw new Error(data.message || "Failed to create order");

      const order = data.data;

      // 2️⃣ Configure Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from .env
        amount: order.amount, // in paise (e.g., 9900 = ₹99)
        currency: order.currency,
        name: "News Premium",
        description: "Lifetime Premium Access",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3️⃣ Verify payment with backend
            const verifyRes = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            const verifyData = verifyRes.data;

            if (verifyData.success) {
              alert("Payment successful! You are now Premium.");
              // redirect to profile
              window.location.href = "/feed/profile";
            } else {
              alert("Payment verification failed.");
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#f59e0b" }, // orange-yellow accent
      };

      // 4️⃣ Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong during payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <LandingHeader />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400">
              Premium
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get lifetime access to all premium features with a one-time payment
            of just ₹99
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plan Comparison */}
          <PlanComparisonOnPayment />

          {/* Payment Form */}
          {user?.plan === "FREE" ? (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <IconCreditCard className="text-blue-400" size={20} />
                Complete Your Purchase
              </h3>

              {user ? (
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Name:</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Current Plan:</span>
                        <span className="text-orange-400">{user.plan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-semibold mb-3">Payment Method</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === "razorpay"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-orange-400"
                        />
                        <div className="flex items-center gap-2">
                          <IconCreditCard size={20} className="text-blue-400" />
                          <span>Cards, UPI, Net Banking ( Razorpay )</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Premium Plan (Lifetime)</span>
                        <span>₹99</span>
                      </div>
                      {/* <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-₹200</span>
                    </div> */}
                      <hr className="border-white/10 my-2" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹99</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-xl animate-spin"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <IconLock size={18} />
                        Pay ₹99 - Upgrade to Premium
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <IconCrown
                      className="mx-auto text-orange-400 mb-4"
                      size={48}
                    />
                    <h4 className="text-xl font-semibold mb-2">
                      Please Sign In
                    </h4>
                    <p className="text-white/60 mb-6">
                      You need to be logged in to purchase premium
                    </p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                    Sign In to Continue
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center h-full text-center">
                <IconCheck className="text-green-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">
                  You are already a Premium member!
                </h3>
                <p className="text-white/60 mb-6">
                  Enjoy your lifetime access to all premium features.
                </p>
                <a
                  href="/feed/profile"
                  className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Go to Your Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoPremiusPage;
