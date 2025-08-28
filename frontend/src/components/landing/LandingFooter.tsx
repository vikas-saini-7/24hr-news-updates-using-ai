import React from "react";
import LandingButton from "../reusables/LandingButton";

const LandingFooter = () => {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex items-center justify-between">
        <h4 className="text-white/50">@2024 All rights reserved.</h4>
        <LandingButton>
          <div className="flex items-center">
            <span className="h-1.5 w-1.5 bg-green-400 inline-block mr-2 rounded-full"></span>
            <span className="text-white/50">All System Active</span>
          </div>
        </LandingButton>
      </div>
    </div>
  );
};

export default LandingFooter;
