import React from "react";
import LandingButton from "../reusables/LandingButton";
import Link from "next/link";
import Image from "next/image";
import LaunchingScreen from "./LaunchingScreen";

const qualities = [
  {
    title: "24x7 Updates",
    description:
      "Get the latest news and updates around the clock, ensuring you never miss important information.",
    image: "/images/24hours.svg", // Add your image path
    button: <LaunchingScreen />,
  },
  {
    title: "AI Summary",
    description:
      "Quickly grasp key points with AI-generated summaries that save your time and enhance comprehension.",
    image: "/images/ai-brain.svg", // Add your image path
    button: <LaunchingScreen />,
  },
  {
    title: "RSS Feeds",
    description:
      "Stay informed with real-time updates from trusted sources aggregated in one convenient location.",
    image: "/images/rss-feed.svg", // Add your image path
    button: <LaunchingScreen />,
  },
];

const QualitiesSection = () => {
  return (
    <div className="bg-black/95 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-8 text-white/60 uppercase flex items-center justify-center space-x-4 text-sm tracking-wider">
            <div className="w-8 h-px bg-white/20"></div>
            <span>[</span>
            <h2 className="font-medium">Qualities</h2>
            <span>]</span>
            <div className="w-8 h-px bg-white/20"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Why Choose Us
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover the powerful features that make our platform the perfect
            choice for staying informed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualities.map((quality, idx) => (
            <div
              key={idx}
              className="group bg-black/60 border border-white/10 rounded-[46px] p-8 md:p-10 hover:border-white/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-16 h-16 mb-6 relative">
                <Image
                  src={quality.image}
                  alt={quality.title}
                  fill
                  className="object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                {quality.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 leading-relaxed mb-8">
                {quality.description}
              </p>

              {/* Button */}
              <div className="mt-auto">{quality.button}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitiesSection;
