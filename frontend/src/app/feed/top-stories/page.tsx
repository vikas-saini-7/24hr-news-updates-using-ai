"use client";

import ArticleCard from "@/components/feed/ArticleCard";
import { fetchTopStories } from "@/queries/articles";
import { useQuery } from "@tanstack/react-query";

export default function TopStoriesPage() {
  const {
    data: news = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["top-stories"],
    queryFn: () => fetchTopStories(),
  });

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-6">Top Stories</h1>

      {/* News content */}
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
        ) : news.length > 0 ? (
          news.map((item) => <ArticleCard key={item.id} article={item} />)
        ) : (
          <p className="text-white/70">No news found.</p>
        )}
      </div>
    </div>
  );
}
