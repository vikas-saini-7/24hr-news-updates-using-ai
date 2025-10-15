"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  IconCheck,
  IconCrown,
  IconBolt,
  IconHeadset,
  IconSparkles,
} from "@tabler/icons-react";

const Page = () => {
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
      // Support either { data: ... } or raw payload
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Sentimental Analysis
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                {articleUrl ? "" : "Please Enter a valid article URL you want to analyze"}
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
                {(sentimentLabel || typeof sentimentScore !== "undefined") && (
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
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="border border-gray-500/20 rounded-lg p-5 space-y-5">
              {/* Header */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium">
                    {isSubscribed ? "Pro Plan" : "Free Plan"}
                  </span>
                </div>
                {!isSubscribed && (
                  <p className="text-xs text-neutral-500">Daily limit</p>
                )}
              </div>

              {/* Usage Progress */}
              {!isSubscribed && (
                <div className="space-y-4">
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
                          : "bg-gradient-to-r from-amber-400 to-amber-500"
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

              {/* Pro Features */}
              {!isSubscribed && (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                      <IconCrown size={12} />
                      Go Pro
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <IconCheck size={10} className="text-amber-500" />
                      Unlimited requests
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <IconBolt size={10} className="text-amber-500" />
                      Priority processing
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/30">
                      <IconHeadset size={10} className="text-amber-500" />
                      Premium support
                    </div>
                  </div>
                </div>
              )}

              {/* Subscribe Button */}
              {!isSubscribed && (
                <button
                  onClick={() => router.push("/subscribe")}
                  className="w-full py-2.5 text-sm font-medium rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-500 hover:to-amber-600 transition-all duration-200 shadow-sm"
                >
                  Upgrade
                </button>
              )}

              {/* Pro Status */}
              {isSubscribed && (
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400/10 to-amber-500/10 border border-amber-400/20">
                    <IconCrown size={12} className="text-amber-500" />
                    <span className="text-xs font-medium text-amber-600">
                      Pro Active
                    </span>
                  </div>
                  <p className="text-xs text-black-500">Unlimited access</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
