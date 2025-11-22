"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/feed/ArticleCard";
import { fetchFeedByCategory } from "@/queries/articles";

const categories = [
  { name: "All" },
  { name: "Technology" },
  { name: "Health" },
  { name: "Business" },
  { name: "Entertainment" },
  { name: "Sports" },
  { name: "Science" },
  { name: "Politics" },
  { name: "World" },
];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const {
    data: news = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", selectedCategory.name],
    queryFn: () => fetchFeedByCategory(selectedCategory.name),
  });

  return (
    <div className="p-6">
      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`p-4 py-1 bg-gray-500/10 rounded-xl text-sm transition-colors cursor-pointer ${
              selectedCategory.name === category.name
                ? "bg-white text-black"
                : "text-white/70"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* News content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
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
