import LandingHeader from "@/components/landing/LandingHeader";
import React from "react";

const page = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <LandingHeader />
      <div className="max-w-7xl mx-auto py-16">
        <h1 className="text-2xl mb-4">Contact Us</h1>
        <p className="text-white/50">
          If you have any questions or feedback, feel free to reach out to us at
          vikas289888@gmail.com. We're here to help you stay informed!
        </p>
      </div>
    </div>
  );
};

export default page;
