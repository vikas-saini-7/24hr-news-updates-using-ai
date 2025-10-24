import LandingHeader from "@/components/landing/LandingHeader";
import Link from "next/link";
import React from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    description: "Perfect for getting started with news updates",
    features: [
      "Up to 10 articles per day",
      "Basic categories",
      "Email notifications",
      "Mobile app access",
    ],
    buttonText: "Current Plan",
    popular: false,
    comingSoon: false,
    currentPlan: true,
  },
  {
    name: "Premium",
    price: "₹99",
    period: "/month",
    description: "Unlimited access to all premium features",
    features: [
      "Unlimited articles",
      "All categories & filters",
      "Real-time notifications",
      "Ad-free experience",
      "Offline reading",
      "Priority support",
    ],
    buttonText: "Go Premium",
    popular: true,
    comingSoon: false,
    currentPlan: false,
  },
  {
    name: "Family",
    price: "₹299",
    period: "/month",
    description: "Perfect for families up to 5 members",
    features: [
      "Everything in Premium",
      "Up to 5 family members",
      "Shared reading lists",
      "Family dashboard",
      "Parental controls",
      "Individual profiles",
    ],
    buttonText: "Coming Soon",
    popular: false,
    comingSoon: true,
    currentPlan: false,
  },
];

const page = () => {
  return (
    <div className="bg-black/50 text-white min-h-screen">
      <LandingHeader />

      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400">
              Plan
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get access to the latest news and updates with our flexible pricing
            plans. Start free and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-500/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full ${
                plan.comingSoon
                  ? "opacity-75 border-gray-500/20"
                  : plan.popular
                  ? "border-orange-400 shadow-orange-400/20 shadow-lg"
                  : "border-gray-500/30 hover:border-gray-500/50"
              }`}
            >
              {/* Current Plan Badge */}
              {plan.currentPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Current Plan
                  </span>
                </div>
              )}

              {/* Coming Soon Badge */}
              {plan.comingSoon && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Popular Badge */}
              {plan.popular && !plan.comingSoon && !plan.currentPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/70">{plan.period}</span>
                </div>
                <p className="text-white/70">{plan.description}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {plan.popular && !plan.comingSoon && !plan.currentPlan ? (
                <Link href="/subscribe/go-premium">
                  <button className="w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 mt-auto bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black hover:from-orange-500 hover:via-red-500 hover:to-amber-500 shadow-sm cursor-pointer">
                    {plan.buttonText}
                  </button>
                </Link>
              ) : (
                <button
                  disabled={plan.comingSoon || plan.currentPlan}
                  className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 mt-auto ${
                    plan.comingSoon
                      ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                      : plan.currentPlan
                      ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20 border border-gray-500/30 hover:border-gray-500/50 cursor-pointer"
                  }`}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-16">
          <p className="text-white/70 mb-4">
            Having questions? We're here to help.
          </p>
          <button className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 hover:from-orange-300 hover:via-red-300 hover:to-amber-300 underline">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
