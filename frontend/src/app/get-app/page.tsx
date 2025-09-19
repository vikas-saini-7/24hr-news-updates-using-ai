import LandingHeader from "@/components/landing/LandingHeader";
import React from "react";
import img from "@/assets/under-construction.svg";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      <div className="flex items-center justify-center h-[80vh] flex-col">
        <Image
          src={img}
          alt="Under Construction"
          className="w-full md:w-1/3 lg:w-1/4 mb-4"
        />
        <p className="text-lg text-white/50 mt-8">
          Mobile App is under Development. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default page;
