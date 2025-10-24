"use client";
import React, { useState, useRef, useEffect } from "react";
import LandingButton from "../reusables/LandingButton";
import Link from "next/link";
import LaunchingScreen from "./LaunchingScreen";
import { useAuth } from "@/contexts/AuthContext";

const LandingHeader = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
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
              <li className="hover:text-white cursor-pointer transition px-4 py-4 hidden md:flex">
                About
              </li>
            </Link>
            <Link href={"/contact"}>
              <li className="hover:text-white cursor-pointer transition px-4 py-4 hidden md:flex">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <LaunchingScreen />
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-12 h-12 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-sm transition-colors border border-white/10"
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/10 py-1 z-50">
                  <div className="px-4 py-2 text-sm text-white/80 border-b border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <p className="truncate flex-1 mr-2">{user.name}</p>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black font-bold uppercase tracking-wide whitespace-nowrap">
                        {user.plan || "FREE"}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link href="/feed/profile">
                    <button className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                      Profile
                    </button>
                  </Link>

                  <Link href="/feed/settings">
                    <button className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                      Settings
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
