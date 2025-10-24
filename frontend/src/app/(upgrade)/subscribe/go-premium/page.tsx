"use client";
import LandingHeader from "@/components/landing/LandingHeader";
import { useAuth } from "@/contexts/AuthContext";
import {
  IconCheck,
  IconCrown,
  IconShield,
  IconStar,
  IconCreditCard,
  IconLock,
  IconInfinity,
  IconEye,
  IconBell,
  IconDownload,
  IconHeadphones,
  IconSearch,
  IconFileText,
  IconPalette,
  IconSettings,
} from "@tabler/icons-react";
import React, { useState } from "react";

const GoPremiusPage = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const premiumFeatures = [
    "Unlimited articles access",
    "All categories & advanced filters",
    "Real-time push notifications",
    "Complete ad-free experience",
    "Offline reading capability",
    "Priority customer support",
    "Advanced search functionality",
    "Export articles to PDF",
    "Dark/Light theme options",
    "Customizable news feed",
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // TODO: Implement Razorpay payment integration
    console.log("Processing payment for user:", user?.id);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <LandingHeader />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400/10 via-red-400/10 to-amber-400/10 rounded-full px-6 py-3 border border-orange-400/20 mb-6">
            <IconCrown className="text-orange-400" size={20} />
            <span className="text-orange-400 font-semibold">
              Premium Upgrade
            </span>
          </div>

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
          {/* Plan Details */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <IconStar className="text-amber-400" size={24} />
                <h3 className="text-2xl font-bold">Premium Plan</h3>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold">₹99</span>
                <div className="text-white/60 mt-2">
                  <span className="text-green-400 font-semibold">
                    One-time payment • Lifetime access
                  </span>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white/90 mb-4">
                What you get:
              </h4>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <IconCheck className="text-green-400" size={14} />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm">
              <IconShield size={16} />
              <span>Secure payment powered by Razorpay</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <IconCreditCard className="text-blue-400" size={20} />
              Complete Your Purchase
            </h3>

            {user ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
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
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
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
                        <span>Razorpay (Cards, UPI, Net Banking)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Premium Plan (Lifetime)</span>
                      <span>₹99</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-₹200</span>
                    </div>
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
                  className="w-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
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
                  <h4 className="text-xl font-semibold mb-2">Please Sign In</h4>
                  <p className="text-white/60 mb-6">
                    You need to be logged in to purchase premium
                  </p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Sign In to Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoPremiusPage;
