"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  IconCheck,
  IconCrown,
  IconBolt,
  IconHeadset,
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import LandingButton from "@/components/reusables/LandingButton";
import Link from "next/link";

const Page = () => {
  const { user } = useAuth();
  const [articleUrl, setArticleUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  // Mock state for UI only
  const [isSubscribed] = useState(false);
  const [remainingRequests] = useState(7);
  const totalFreeRequests = 10;
  const usedRequests = Math.max(0, totalFreeRequests - remainingRequests);
  const usedPercent = Math.round((usedRequests / totalFreeRequests) * 100);
  const isQuotaExhausted = !isSubscribed && remainingRequests <= 0;

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/llm/sentiment`,
        { url: articleUrl },
        { withCredentials: true }
      );
      setResult((res.data && (res.data.data ?? res.data)) || res.data);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to analyze";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  const sentimentLabel = result?.sentiment || result?.label || null;
  const sentimentScore =
    typeof result?.score === "number" ? result.score : result?.confidence;

  return (
    <div className="relative p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-72px)]">
      {/* --- Main Content --- */}
      <div
        className={`transition-all duration-500 ${
          user === null ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            Sentimental Analysis
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleAnalyze} className="space-y-2">
              <input
                type="url"
                value={articleUrl}
                onChange={(e) => setArticleUrl(e.target.value)}
                placeholder="Paste article URL here..."
                className="w-full px-3 py-2 border rounded-xl border-gray-500/20 bg-gray-500/10 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && articleUrl.trim()) {
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  {articleUrl
                    ? ""
                    : "Please Enter a valid article URL you want to analyze"}
                </span>
                <button
                  type="submit"
                  disabled={!articleUrl.trim() || isLoading}
                  className="px-3 py-2 text-sm rounded-md border border-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-3">
              {error && (
                <div className="border border-gray-500/20 rounded-md px-3 py-2 text-sm">
                  {error}
                </div>
              )}

              {isLoading && !error && (
                <div className="border border-gray-500/20 rounded-md px-3 py-3 text-sm">
                  Processing...
                </div>
              )}

              {result && !error && (
                <div className="border border-gray-500/20 rounded-md px-3 py-3">
                  {(sentimentLabel ||
                    typeof sentimentScore !== "undefined") && (
                    <div className="mb-2 text-sm">
                      {sentimentLabel && (
                        <span className="font-medium">{sentimentLabel}</span>
                      )}
                      {typeof sentimentScore !== "undefined" && (
                        <span className="ml-2 text-neutral-500">
                          Score: {sentimentScore}
                        </span>
                      )}
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap break-words text-xs">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Usage Card - Right Side */}
          <div className="lg:col-span-1 bg-gray-500/10 rounded-2xl p-6 border border-gray-500/20">
            <div className="sticky top-6">
              <div className="rounded-lg space-y-5">
                {/* Header */}
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    <span className="text-sm font-medium">
                      {isSubscribed ? "Pro Plan" : "Free Plan"}
                    </span>
                  </div>
                  {!isSubscribed && (
                    <p className="text-xs text-neutral-500">Daily limit</p>
                  )}
                </div>

                {!isSubscribed && (
                  <div className="space-y-4 ">
                    <div className="text-center">
                      <div className="text-2xl font-light mb-1">
                        {usedRequests}
                        <span className="text-neutral-500 text-lg">
                          /{totalFreeRequests}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">requests used</p>
                    </div>

                    <div className="relative h-1 rounded-full bg-gray-500/10">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                          isQuotaExhausted
                            ? "bg-red-400"
                            : "bg-gradient-to-r from-orange-400 via-red-400 to-amber-400"
                        }`}
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>

                    {isQuotaExhausted && (
                      <div className="text-center">
                        <span className="text-xs text-red-500 font-medium">
                          Limit reached
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {!isSubscribed && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-1.5 text-orange-400 text-xs font-medium">
                        <IconCrown size={12} />
                        Go Premium
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <IconCheck size={10} className="text-green-500" />
                        Unlimited requests
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <IconBolt size={10} className="text-green-500" />
                        Advanced fefatures
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <IconHeadset size={10} className="text-green-500" />
                        Premium support
                      </div>
                    </div>
                  </div>
                )}

                {!isSubscribed && (
                  <button
                    onClick={() => router.push("/subscribe")}
                    className="w-full cursor-pointer py-2.5 text-sm font-medium rounded-md bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black hover:from-orange-500 hover:via-red-500 hover:to-amber-500 transition-all duration-200 shadow-sm"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Overlay when not logged in --- */}
      {user === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs rounded-xl z-50">
          <div className="text-center space-y-3 text-white">
            <h2 className="text-lg font-semibold">Please login to continue</h2>
            <Link href={"/login"}>
              <LandingButton>Login</LandingButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
