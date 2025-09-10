import React from "react";
import LandingButton from "../reusables/LandingButton";
import { IconAt, IconDownload } from "@tabler/icons-react";

const Hero = () => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-blue-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm text-blue-300">
                Live Feed • Auto-Updated Every 10 Minutes
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Only{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                24 Hours
              </span>
              <br />
              That Matter
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Experience news that stays <strong>fresh and relevant</strong>.
              Our platform automatically removes stories older than 24 hours,
              ensuring you only see what's happening <em>right now</em>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <LandingButton onClick={() => (window.location.href = "/feed")}>
                <div className="px-4 py-2 flex items-center gap-2">
                  <IconAt size={18} />
                  LAUNCH WEB APP
                </div>
              </LandingButton>

              <LandingButton
                onClick={() => (window.location.href = "/get-app")}
              >
                <div className="px-0 py-2 flex items-center gap-2">
                  <IconDownload size={18} /> GET MOBILE APP
                </div>
              </LandingButton>
            </div>
          </div>

          {/* Right Image */}
          {/* <div className="relative">
            <div className="relative z-10">
              <img
                src="/api/placeholder/600/400"
                alt="Real-time news updates visualization"
                className="rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                Just Updated!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <span className="line-through opacity-60">25h old</span> Deleted
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl transform scale-110 -z-10"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
