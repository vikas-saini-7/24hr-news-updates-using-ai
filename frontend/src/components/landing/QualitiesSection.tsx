import React from "react";
import LandingButton from "../reusables/LandingButton";
import Link from "next/link";

const qualities = [
  {
    title: "RSS Feeds",
    description: "Stay informed with real-time updates from trusted sources.",
    image: "",
    button: <LandingButton>TRY APP</LandingButton>,
  },
  {
    title: "24Hrs Updates",
    description: "Get the latest news and updates around the clock.",
    image: "",
    button: <LandingButton>TRY APP</LandingButton>,
  },
  {
    title: "AI Summary",
    description: "Quickly grasp key points with AI-generated summaries.",
    image: "",
    button: <LandingButton>TRY APP</LandingButton>,
  },
];

const QualitiesSection = () => {
  return (
    <div className="bg-gradient-to-b from-white/5 to-black py-30 border-t border-white/10">
      <div className="max-w-7xl mx-auto min-h-screen">
        <div>
          <div className="mb-10 text-white/50 uppercase flex items-center space-x-4">
            <span>[</span>
            <h2>Qualities</h2>
            <span>]</span>
          </div>
          <h1 className="text-5xl mb-20">Why Choose Us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {qualities.map((quality, idx) => (
            <div
              key={idx}
              className={`p-10 py-14 shadow-md border-r border-white/10 hover:bg-gradient-to-b from-white/5 to-black transition hover:border-y hover:scale-103 ${
                idx == 0 ? "border-l" : ""
              }`}
            >
              <h3 className="text-xl mb-6">{quality.title}</h3>
              <p className="text-white/50">{quality.description}</p>
              <div className="min-h-72"></div>
              <Link href={"/feed"}>{quality.button}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitiesSection;
