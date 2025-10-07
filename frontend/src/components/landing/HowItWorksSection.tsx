import React from "react";
import { IconClock, IconBrain, IconRefresh, IconTrash } from "@tabler/icons-react";

const steps = [
  {
    number: "01",
    title: "Continuous Collection",
    description: "Our system continuously aggregates news from trusted RSS feeds and sources worldwide, ensuring comprehensive coverage.",
    icon: <IconRefresh size={32} className="text-orange-400" />,
    color: "from-orange-400/20 to-red-400/20"
  },
  {
    number: "02", 
    title: "AI Processing",
    description: "Advanced AI algorithms analyze, summarize, and categorize each article for quick consumption and relevance.",
    icon: <IconBrain size={32} className="text-orange-400" />,
    color: "from-red-400/20 to-amber-400/20"
  },
  {
    number: "03",
    title: "24-Hour Filter",
    description: "Every story is timestamped and automatically removed after exactly 24 hours, keeping your feed fresh and current.",
    icon: <IconClock size={32} className="text-orange-400" />,
    color: "from-amber-400/20 to-orange-400/20"
  },
  {
    number: "04",
    title: "Auto Cleanup",
    description: "Outdated content is permanently removed, ensuring you only see what's happening right now, not yesterday's news.",
    icon: <IconTrash size={32} className="text-orange-400" />,
    color: "from-orange-400/20 to-red-400/20"
  }
];

const HowItWorksSection = () => {
  return (
    <div className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 text-white/60 uppercase flex items-center justify-center space-x-4 text-sm tracking-wider">
            <div className="w-8 h-px bg-white/20"></div>
            <span>[</span>
            <h2 className="font-medium">Process</h2>
            <span>]</span>
            <div className="w-8 h-px bg-white/20"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            How It Works
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our unique 24-hour news cycle ensures you always stay informed with the most current information
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connection Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-orange-400/50 to-transparent z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative bg-black/60 border border-white/10 rounded-[32px] p-8 hover:border-orange-400/20 transition-all duration-500">
                {/* Step Number */}
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4 leading-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-400/20">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-[32px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full px-6 py-3 border border-orange-400/20">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-white/80 text-sm">
              Fully Automated • No Manual Intervention Required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;