"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/feed/ArticleCard";
import { Article } from "@/types";
import axios from "axios";

export default function TopStoriesPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/top-stories`
        );
        setNews(res.data.data);
      } catch (error) {
        console.error("Error fetching top stories:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-6">Top Stories</h1>

      {/* News content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Simple skeleton loader
          Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gray-500/10 animate-pulse rounded-xl"
            />
          ))
        ) : news.length > 0 ? (
          news.map((item) => <ArticleCard key={item.id} article={item} />)
        ) : (
          <p className="text-white/70">No top stories found.</p>
        )}
      </div>
    </div>
  );
}
