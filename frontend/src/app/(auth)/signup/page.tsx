"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
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
        `${API_BASE}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      // Save user in context
      setUser(res.data.data.user);

      // Redirect after success
      router.push("/feed");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Create your account to get started
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
