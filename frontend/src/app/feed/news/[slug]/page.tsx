import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconChartDonut, IconChevronLeft } from "@tabler/icons-react";
import ArticleCard from "@/components/feed/ArticleCard";
import { Article } from "@/types";
import axios from "axios";
import placeHolderNewsImage from "@/assets/placeholder-news.png";
import SaveButton from "@/components/feed/SaveButton";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${params.slug}`
    );
    const article = res.data.data;

    return {
      title: `${article.title} | News.AI`,
      description: article.summary,
    };
  } catch {
    return {
      title: "Article Not Found | News.AI",
      description: "The article you’re looking for could not be found.",
    };
  }
}

export default async function NewsDetailsPage({ params }: Props) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${params.slug}`
  );
  const article: Article = res.data.data;

  const relatedRes = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${article.id}/related`
  );
  const relatedArticles: Article[] = relatedRes.data.data;

  return (
    <div className="overflow-y-auto h-[calc(100vh-72px)] p-6">
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
        <div className="w-full h-auto relative mb-3 aspect-video">
          <Image
            src={article.imageCover || placeHolderNewsImage}
            alt={article.title}
            className="object-cover rounded-xl w-full"
            height={500}
            width={500}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Link
              href={`/feed/sentimental-analysis?url=${encodeURIComponent(
                `https://24hr-news-updates-using-ai.vercel.app/feed/news/${article.slug}`
              )}`}
              className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 hover:opacity-90 p-1.5 rounded-full transition-opacity shadow-lg"
              title="Analyze sentiment"
            >
              <IconChartDonut size={14} className="text-black" />
            </Link>
            <SaveButton articleId={article.id} initialSaved={article.isSaved} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white">{article.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          {article.category && (
            <span className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors border border-white/10 hover:border-white/30">
              #{article.category}
            </span>
          )}
          <Link
            href={`/feed/sentimental-analysis?url=${encodeURIComponent(
              `https://24hr-news-updates-using-ai.vercel.app/feed/news/${article.slug}`
            )}`}
            className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 hover:opacity-90 text-black px-3 py-1 rounded-full text-xs font-medium transition-opacity flex items-center gap-1.5 font-bold"
            title="Analyze sentiment"
          >
            <IconChartDonut size={14} />
            Analyze Sentiment
          </Link>
        </div>
        <p className="mt-4 text-base text-white/70">{article.summary}</p>

        <p className="mt-4 text-white/80 leading-relaxed whitespace-pre-line">
          {article.content}
        </p>
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
  );
}
