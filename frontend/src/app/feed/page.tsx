"use client";

import ArticleCard from "@/components/feed/ArticleCard";
import { Article } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const categories = [
  { name: "All" },
  { name: "Technology" },
  { name: "Health" },
  { name: "Business" },
  { name: "Entertainment" },
  { name: "Sports" },
  { name: "Science" },
  { name: "Politics" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async (category: string) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?category=${category}`
        );

        console.log("Fetched news:", res.data.data);

        setNews(res.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews(selectedCategory.name);
  }, [selectedCategory]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {news.map((item) => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </div>
    </div>
  );
}
