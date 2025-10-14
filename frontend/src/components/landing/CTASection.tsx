import React from "react";
import { IconArrowRight, IconDownload, IconAt } from "@tabler/icons-react";
import LandingButton from "../reusables/LandingButton";
import LaunchingScreen from "./LaunchingScreen";
import Link from "next/link";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-br from-orange-500/5 via-black to-red-500/5 py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Main Content */}
        <div className="mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full px-4 py-2 border border-orange-400/20 mb-8">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-white/80">Ready to Get Started?</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stay Informed with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400">
              Fresh News Daily
            </span>
          </h1>

          <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Join thousands of users who trust our platform for timely, relevant
            news updates. Experience the difference of truly current
            information.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <LaunchingScreen />

          <Link href="/get-app">
            <LandingButton>
              <div className="flex items-center gap-2 md:py-2">
                <IconDownload size={20} />
                <span>Download App</span>
                <IconArrowRight size={16} className="ml-1" />
              </div>
            </LandingButton>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-white/60 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/60 text-sm">Live Updates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">20+</div>
            <div className="text-white/60 text-sm">News Sources</div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm">
            All Features Free • Fully Automated • Trustful Coverage
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
