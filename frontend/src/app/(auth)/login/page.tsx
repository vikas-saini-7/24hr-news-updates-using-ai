"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // save user to context
      setUser(res.data.data);

      // redirect to /feed
      router.push("/feed");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-white/20 text-white px-5 py-2 rounded-xl text-sm cursor-pointer hover:bg-white hover:text-black transition font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
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
