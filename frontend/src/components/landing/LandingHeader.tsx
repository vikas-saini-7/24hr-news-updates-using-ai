import React from "react";
import LandingButton from "../reusables/LandingButton";
import Link from "next/link";
import LaunchingScreen from "./LaunchingScreen";

const LandingHeader = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-16">
          <Link href={"/"}>
            <h1 className="text-xl font-bold">News.AI</h1>
          </Link>
          <ul className="flex space- uppercase text-sm text-white/50">
            {/* <Link href={"/feed"}>
              <li className="hover:text-white cursor-pointer transition px-4 py-4">
                News
              </li>
            </Link> */}
            <Link href={"/about"}>
              <li className="hover:text-white cursor-pointer transition px-4 py-4">
                About
              </li>
            </Link>
            <Link href={"/contact"}>
              <li className="hover:text-white cursor-pointer transition px-4 py-4">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <LaunchingScreen />
      </div>
    </div>
  );
};

export default LandingHeader;
