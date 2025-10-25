"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  IconMoodHappy,
  IconMoodSad,
  IconMoodNeutral,
  IconCheck,
  IconCrown,
  IconBolt,
  IconHeadset,
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import LandingButton from "@/components/reusables/LandingButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const totalFreeRequests = 10;

const getSentimentColor = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "text-green-400";
    case "negative":
      return "text-red-400";
    default:
      return "text-yellow-400";
  }
};

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return <IconMoodHappy size={32} className="text-green-400" />;
    case "negative":
      return <IconMoodSad size={32} className="text-red-400" />;
    default:
      return <IconMoodNeutral size={32} className="text-yellow-400" />;
  }
};

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [articleUrl, setArticleUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);
    // if (isQuotaExhausted) {
    //   setError(
    //     "You have exhausted your free daily quota. Please upgrade to Pro for unlimited access."
    //   );
    //   setIsLoading(false);
    //   return;
    // }
    try {
      setUsedRequests((prev) => prev + 1);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/llm/sentiment`,
        { url: articleUrl },
        { withCredentials: true }
      );

      // Properly extract the sentiment data from the response
      if (res.data && res.data.success && res.data.data) {
        setResult(res.data.data);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to analyze";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  const [isSubscribed] = useState(user?.plan === "PREMIUM");
  const [usedRequests, setUsedRequests] = useState(0);
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);

  const usedPercent = Math.min(
    Math.round((usedRequests / totalFreeRequests) * 100),
    100
  );

  useEffect(() => {
    if (user) {
      const fetchUsageData = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usage/sentiment`,
            {
              withCredentials: true,
            }
          );
          console.log("Usage fetch response:", res.data.data);
          setUsedRequests(res.data.data.sentiment_count);
        } catch (error) {
          console.error("Error fetching usage data:", error);
        }
      };
      fetchUsageData();
    }
  }, [user]);

  useEffect(() => {
    setIsQuotaExhausted(usedRequests >= totalFreeRequests);
  }, [usedRequests]);

  return (
    <div className="relative p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-72px)]">
      {/* --- Main Content --- */}
      <div
        className={`transition-all duration-500 pb-4 ${
          user === null ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
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
                placeholder="https://example.com/article-to-analyze"
                className="w-full px-3 py-3 border text-sm text-white/70 rounded-xl border-gray-500/20 bg-gray-500/10 outline-none"
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
                <div className="border border-red-500/20 rounded-md px-3 py-2 text-sm bg-red-500/10">
                  {/* <div className="text-red-400 font-medium">Error</div> */}
                  <div className="text-red-300 text-xs my-1">{error}</div>
                </div>
              )}

              {isLoading && !error && (
                <div className="border border-blue-500/20 rounded-md px-3 py-3 text-sm bg-blue-500/10">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span className="text-blue-400">
                      Analyzing sentiment...
                    </span>
                  </div>
                </div>
              )}

              {result && !error && (
                <div className="space-y-4">
                  {/* Main Sentiment Result */}
                  <div className="border border-gray-500/20 rounded-lg px-4 py-4 bg-gray-500/5">
                    <div className="flex items-center gap-3 mb-3">
                      {getSentimentIcon(result.sentiment)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-lg ${getSentimentColor(
                              result.sentiment
                            )}`}
                          >
                            {result.sentiment}
                          </span>
                          <span className="text-sm text-neutral-400">
                            ({result.confidence}% confidence)
                          </span>
                        </div>
                        {result.articleTitle && (
                          <div className="text-sm text-neutral-300 mt-1 line-clamp-2">
                            {result.articleTitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {result.explanation && (
                      <div className="border-t border-gray-500/20 pt-3 mt-3">
                        <ReactMarkdown
                          children={result.explanation}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p
                                className="text-neutral-200 text-sm leading-relaxed my-2"
                                {...props}
                              />
                            ),
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-lg font-semibold text-white my-3"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-base font-semibold text-white my-2"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-sm font-semibold text-white my-2"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                className="text-neutral-200 text-sm ml-4 list-disc my-1"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="my-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="my-2" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-semibold text-white"
                                {...props}
                              />
                            ),
                            em: ({ node, ...props }) => (
                              <em
                                className="italic text-neutral-300"
                                {...props}
                              />
                            ),
                            code: ({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }: any) => (
                              <code
                                className={`${
                                  inline
                                    ? "bg-gray-700 text-white px-1 rounded text-xs"
                                    : "block bg-gray-700 text-white p-2 rounded my-2 overflow-x-auto text-xs"
                                }`}
                                {...props}
                              >
                                {children}
                              </code>
                            ),
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Technical Details (Collapsible) */}
                  <details className="border border-gray-500/20 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer text-sm text-neutral-400 hover:text-neutral-300 select-none">
                      Technical Details
                    </summary>
                    <div className="px-4 pb-3 border-t border-gray-500/20">
                      <pre className="whitespace-pre-wrap break-words text-xs text-neutral-400 bg-gray-500/10 p-3 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>

          {/* Usage Card - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-22 bg-gray-500/10 rounded-2xl p-6 border border-gray-500/20 w-full">
              <div className="space-y-5">
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
                        Extra Premium features
                      </div>
                      {/* <div className="flex items-center gap-2 text-xs text-white/30">
                        <IconHeadset size={10} className="text-green-500" />
                        Premium support
                      </div> */}
                    </div>
                  </div>
                )}

                {!isSubscribed && (
                  <button
                    onClick={() => router.push("/go-premium")}
                    className="w-full cursor-pointer py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-black hover:from-orange-500 hover:via-red-500 hover:to-amber-500 transition-all duration-200 shadow-sm"
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
