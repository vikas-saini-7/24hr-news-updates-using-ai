"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "@/components/feed/ArticleCard";
import { Article } from "@/types";
import axios from "axios";

const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchArticles = async () => {
      if (!query.trim()) return;

      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const res = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/search/articles?query=${encodeURI(query)}`
        );
        setNews(res.data.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setIsError(true);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    searchArticles();
  }, [query]);

  // No query state
  if (!query.trim()) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Search Articles</h1>
        <div className="text-center text-white/70 py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg mb-2">Enter a search term to find articles</p>
          <p className="text-sm text-white/50">
            Use the search box above to search for news articles
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Search results for "{query}"
        </h1>
        <div className="text-center text-red-500 py-12">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search results for "{query}"
      </h1>

      {isLoading ? (
        // Loading state with skeleton loaders
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gray-500/10 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : news.length === 0 ? (
        // Empty state - no results found
        <div className="text-center text-white/70 py-12">
          <div className="text-4xl mb-4">📰</div>
          <p className="text-lg mb-2">No articles found for "{query}"</p>
          <p className="text-sm text-white/50">
            Try searching with different keywords or check your spelling
          </p>
        </div>
      ) : (
        // Results found
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, idx) => (
            <ArticleCard key={idx} article={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
