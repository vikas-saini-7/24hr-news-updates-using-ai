"use client";

import ArticleCard from "@/components/feed/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

const news = [
  {
    id: 1,
    title: "New AI Model Released",
    slug: "new-ai-model-released",
    category: "Technology",
    summary:
      "A new AI model has been released that outperforms previous models.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 2,
    title: "Health Benefits of Meditation",
    slug: "health-benefits-of-meditation",
    category: "Health",
    summary:
      "Studies show that meditation can significantly improve mental health.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 3,
    title: "Stock Market Hits Record Highs",
    slug: "stock-market-hits-record-highs",
    category: "Business",
    summary:
      "The stock market reached new record highs amid economic optimism.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 4,
    title: "New Movie Breaks Box Office Records",
    slug: "new-movie-breaks-box-office-records",
    category: "Entertainment",
    summary:
      "The latest blockbuster movie has broken box office records worldwide.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 5,
    title: "Local Team Wins Championship",
    slug: "local-team-wins-championship",
    category: "Sports",
    summary:
      "The local sports team has won the national championship in a thrilling final.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 6,
    title: "New Species Discovered in Amazon",
    slug: "new-species-discovered-in-amazon",
    category: "Science",
    summary:
      "Scientists have discovered a new species of insect in the Amazon rainforest.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
  {
    id: 7,
    title: "Elections Coming Up Next Month",
    slug: "elections-coming-up-next-month",
    category: "Politics",
    summary:
      "Elections are scheduled for next month with several key issues at stake.",
    image:
      "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
