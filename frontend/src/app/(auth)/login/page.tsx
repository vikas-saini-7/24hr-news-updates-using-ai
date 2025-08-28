import LandingButton from "@/components/reusables/LandingButton";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white px-4">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Welcome back! Please enter your details.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full border border-white/20 text-white px-5 py-2 rounded-xl text-sm cursor-pointer hover:bg-white hover:text-black transition font-medium"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline hover:text-white">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
