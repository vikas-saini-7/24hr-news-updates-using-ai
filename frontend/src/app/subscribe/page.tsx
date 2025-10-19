import LandingHeader from "@/components/landing/LandingHeader";
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
    buttonText: "Get Started",
    popular: false,
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
    buttonText: "Choose Family",
    popular: false,
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
              className={`relative bg-gray-500/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? "border-orange-400 shadow-orange-400/20 shadow-lg"
                  : "border-gray-500/30 hover:border-gray-500/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
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
              <ul className="space-y-3 mb-8">
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
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "rounded-md bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black hover:from-orange-500 hover:via-red-500 hover:to-amber-500 transition-all duration-200 shadow-sm"
                    : "bg-white/10 text-white hover:bg-white/20 border border-gray-500/30 hover:border-gray-500/50"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-16">
          <p className="text-white/70 mb-4">
            Have questions? We're here to help.
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
