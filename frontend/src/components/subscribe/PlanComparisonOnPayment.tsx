import React from "react";
import {
  IconCheck,
  IconCrown,
  IconCreditCard,
  IconEye,
  IconDownload,
  IconHeadphones,
  IconSearch,
  IconFileText,
  IconX,
} from "@tabler/icons-react";

const planComparison = [
  {
    feature: "Daily News Articles",
    free: "1000 per day",
    premium: "Unlimited",
    icon: IconFileText,
  },
  {
    feature: "Resource Access",
    free: false,
    premium: true,
    icon: IconDownload,
  },
  {
    feature: "Sentimental Analysis",
    free: "10 per day",
    premium: "Unlimited",
    icon: IconEye,
  },
  {
    feature: "Advanced Search",
    free: false,
    premium: true,
    icon: IconSearch,
  },
  {
    feature: "Premium Support",
    free: false,
    premium: true,
    icon: IconHeadphones,
  },
  {
    feature: "Price",
    free: "₹0",
    premium: "₹99",
    icon: IconCreditCard,
    isPricing: true,
  },
];

const PlanComparisonOnPayment = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          {/* <IconStar className="text-amber-400" size={24} /> */}
          <h3 className="text-2xl font-bold">Benefits of Premium Plan</h3>
        </div>
        <p className="text-white/60 text-sm">See what you get with Premium</p>
      </div>

      {/* Comparison Table */}
      <div className="space-y-1">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10">
          <div className="text-white/60 text-sm font-medium flex items-center pl-4">
            Features
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-xl py-2 px-3">
              <div className="text-sm font-semibold">Free</div>
              {/* <div className="text-xs text-white/60 mt-1">₹0</div> */}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-black font-semibold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 px-3 py-2 rounded-xl border">
              <div className="text-sm flex items-center justify-center gap-1">
                <IconCrown size={14} />
                Premium
              </div>
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        {planComparison.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`${
                    item.isPricing ? "text-green-400" : "text-white/60"
                  }`}
                  size={16}
                />
                <span
                  className={`text-sm font-medium ${
                    item.isPricing ? "font-bold" : ""
                  }`}
                >
                  {item.feature}
                </span>
              </div>

              {/* Free Plan */}
              <div className="flex justify-center items-center">
                {typeof item.free === "boolean" ? (
                  item.free ? (
                    <div className="w-6 h-6 rounded-xl bg-green-400 flex items-center justify-center">
                      <IconCheck className="text-black" size={14} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-xl bg-red-400 flex items-center justify-center">
                      <IconX className="text-black" size={14} />
                    </div>
                  )
                ) : (
                  <span
                    className={`${
                      item.isPricing
                        ? "text-white font-bold text-xl rounded-lg"
                        : "text-xs text-white/60 bg-white/10 px-2 py-1 rounded-lg"
                    }`}
                  >
                    {item.free}
                  </span>
                )}
              </div>

              {/* Premium Plan */}
              <div className="flex justify-center items-center">
                {typeof item.premium === "boolean" ? (
                  item.premium ? (
                    <div className="w-6 h-6 rounded-xl bg-green-400 flex items-center justify-center">
                      <IconCheck className="text-black" size={14} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <IconX className="text-black" size={14} />
                    </div>
                  )
                ) : (
                  <span
                    className={`${
                      item.isPricing
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 font-bold text-lg"
                        : item.premium === "Unlimited"
                        ? "text-xs text-black font-semibold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 px-3 py-1 rounded-lg border"
                        : "text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded border border-orange-400/30"
                    }`}
                  >
                    {item.premium}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanComparisonOnPayment;
