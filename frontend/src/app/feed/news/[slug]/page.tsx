"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import ArticleCard from "@/components/feed/ArticleCard";
import { Article } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";

import placeHolderNewsImage from "@/assets/placeholder-news.png";

// const relatedArticles = [
//   {
//     id: 1,
//     title: "New AI Model Released",
//     slug: "new-ai-model-released",
//     category: "Technology",
//     summary:
//       "A new AI model has been released that outperforms previous models.",
//     image:
//       "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
//   },
//   {
//     id: 2,
//     title: "Health Benefits of Meditation",
//     slug: "health-benefits-of-meditation",
//     category: "Health",
//     summary:
//       "Studies show that meditation can significantly improve mental health.",
//     image:
//       "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
//   },
//   {
//     id: 3,
//     title: "Stock Market Hits Record Highs",
//     slug: "stock-market-hits-record-highs",
//     category: "Business",
//     summary:
//       "The stock market reached new record highs amid economic optimism.",
//     image:
//       "https://i.pinimg.com/736x/ae/06/54/ae0654dfb0d0157d6c8c6c25063d0a19.jpg",
//   },
// ];

export default function NewsDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async (slug: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${slug}`
        );
        setArticle(res.data.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      if (!article) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${article.id}/related`
        );
        setRelatedArticles(res.data.data);
      } catch (err) {
        console.error("Error fetching related articles:", err);
      }
    };

    fetchRelatedArticles();
  }, [article]);

  if (loading) {
    return (
      <div className="p-6 text-center text-white/70 min-h-72 flex items-center justify-center">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="p-6 text-center text-white/70">
        <p>{error || "Article not found."}</p>
        <Link
          href="/feed"
          className="mt-4 inline-block text-blue-400 hover:underline"
        >
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100vh-72px)]">
      <div className="p-6">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto">
          <Link
            href="/feed"
            className="text-blue-400 hover:underline text-sm flex items-center"
          >
            <IconChevronLeft className="mr-1" size={20} /> Back to News
          </Link>
        </div>

        {/* Article Card */}
        <div className="max-w-3xl mx-auto mt-5 p-6 rounded-2xl bg-gray-500/10 flex flex-col">
          {/* Cover Image */}
          <div className="w-full h-72 relative mb-6">
            <Image
              src={article.imageCover || placeHolderNewsImage}
              alt={article.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white">{article.title}</h1>

          {/* Category */}
          {article.category && (
            <span className="mt-2 text-xs text-white/60">
              #{article.category}
            </span>
          )}

          {/* Summary */}
          <p className="mt-4 text-base text-white/70">{article.summary}</p>

          {/* Full Content */}
          <p className="mt-4 text-white/80 leading-relaxed whitespace-pre-line">
            {article.content}
          </p>

          {/* Sources Section */}
          {article.sources && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Sources</h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {article.sources.slice(0, 2).map((src, idx) => (
                  <li key={idx}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {src.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related Articles */}
        <div className="mt-10 max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold text-white">Related Articles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {relatedArticles.map((item, idx) => (
              <ArticleCard key={idx} article={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
