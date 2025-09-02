"use client";
import React, { useEffect, useState } from "react";
import { Article } from "@/types";
import axios from "axios";
import ArticleCard from "@/components/feed/ArticleCard";

const page = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/save`,
          {
            withCredentials: true,
          }
        );
        setSavedArticles(res.data.data);
      } catch (err) {
        console.error("Error fetching saved articles:", err);
        setError("Failed to load saved articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedArticles();
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 min-h-72 flex items-center justify-center">
        <div>
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
      <h1 className="text-2xl font-bold text-white mb-6">Saved Articles</h1>

      {loading ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
