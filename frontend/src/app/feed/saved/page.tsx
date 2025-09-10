"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/feed/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSavedArticles } from "@/queries/articles";

const page = () => {
  const {
    data: savedArticles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["saved-articles"],
    queryFn: fetchSavedArticles,
  });

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 min-h-72 flex items-center justify-center">
        <div>
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
      <h1 className="text-2xl font-bold text-white mb-6">Saved Articles</h1>

      {isLoading ? (
        // Skeleton loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gray-500/10 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : savedArticles.length === 0 ? (
        // Empty state
        <div className="text-center text-white/70 py-12">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-lg mb-2">No saved articles yet</p>
          <p className="text-sm text-white/50">
            Start saving articles to see them here
          </p>
        </div>
      ) : (
        // Articles list
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 bg-gray-500/10 animate-pulse rounded-xl"
              />
            ))
          ) : isError ? (
            <p className="text-red-400">
              {(error as Error)?.message || "Error fetching news."}
            </p>
          ) : savedArticles.length > 0 ? (
            savedArticles.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))
          ) : (
            <p className="text-white/70">No news found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
