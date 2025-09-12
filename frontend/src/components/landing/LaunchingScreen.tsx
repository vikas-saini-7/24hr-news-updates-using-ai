'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LandingButton from "../reusables/LandingButton";

const LaunchingScreen = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    setIsLaunching(true);

    setTimeout(() => {
      router.push("/feed");
    }, 2000);
  };

  return (
    <>
      <LandingButton onClick={handleLaunch}>LAUNCH APP</LandingButton>

      {isLaunching && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-6">
            {/* Minimal dot loader */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-white/80 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>

            {/* Text with fade animation */}
            <p className="text-white/90 font-light text-sm tracking-wider animate-pulse">
              LAUNCHING
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LaunchingScreen;
