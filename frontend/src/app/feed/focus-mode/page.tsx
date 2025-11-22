"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";
import { fetchFeedByCategory } from "@/queries/articles";
import placeHolderNewsImage from "@/assets/placeholder-news.png";
import SaveButton from "@/components/feed/SaveButton";
import { IconChartDonut } from "@tabler/icons-react";

export default function FocusModePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["focus-news", selectedCategory],
    queryFn: () => fetchFeedByCategory(selectedCategory),
  });

  const currentArticle = articles[currentIndex];

  const handleNextArticle = useCallback(() => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, articles.length]);

  const handlePrevArticle = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNextArticle();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevArticle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextArticle, handlePrevArticle]);

  // Wheel scroll handling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          handleNextArticle();
        } else {
          handlePrevArticle();
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [handleNextArticle, handlePrevArticle]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <p className="text-white/60">Loading articles...</p>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <p className="text-white/60">No articles available</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "calc(100vh - 66px)" }}
    >
      {/* Article Container */}
      <div className="h-full w-full flex flex-col items-center justify-center p-4 md:p-8">
        {/* Main Content */}
        <div className="w-full max-w-xl flex items-center justify-center relative h-full">
          {/* Post Card with Background */}
          <div className="w-full h-full rounded-2xl bg-gray-500/10 p-6 flex flex-col">
            {/* Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-4">
              <Image
                src={currentArticle.imageCover || placeHolderNewsImage}
                alt={currentArticle.title}
                className="w-full h-full object-cover"
                height={600}
                width={900}
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Save button */}
              <div className="absolute top-4 right-4 z-10">
                <SaveButton
                  articleId={currentArticle.id}
                  initialSaved={currentArticle.isSaved}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col space-y-4 flex-1">
              <div className="mt-3 flex items-center gap-3">
                {currentArticle.category && (
                  <span className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors border border-white/10 hover:border-white/30">
                    #{currentArticle.category}
                  </span>
                )}
                <Link
                  href={`/feed/sentimental-analysis?url=${encodeURIComponent(
                    `https://24hr-news-updates-using-ai.vercel.app/feed/news/${currentArticle.slug}`
                  )}`}
                  className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 hover:opacity-90 text-black px-3 py-1 rounded-full text-xs transition-opacity flex items-center gap-1.5 font-bold"
                  title="Analyze sentiment"
                >
                  <IconChartDonut size={14} />
                  Analyze Sentiment
                </Link>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {currentArticle.title}
                </h1>
              </div>
            </div>
            <div>
              <Link
                href={`/feed/news/${currentArticle.slug}`}
                className="text-blue-400 hover:underline text-sm flex items-center"
              >
                READ MORE
              </Link>
            </div>
          </div>

          {/* Navigation Buttons - Right Side */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            <button
              onClick={handlePrevArticle}
              disabled={currentIndex === 0}
              className="p-3 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 cursor-pointer border border-gray-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-white shadow-lg"
              title="Previous article"
            >
              ↑
            </button>
            <button
              onClick={handleNextArticle}
              disabled={currentIndex === articles.length - 1}
              className="p-3 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 cursor-pointer border border-gray-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-white shadow-lg"
              title="Next article"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
