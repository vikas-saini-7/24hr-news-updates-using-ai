import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
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
          <SaveButton articleId={article.id} initialSaved={article.isSaved} />
        </div>

        <h1 className="text-2xl font-bold text-white">{article.title}</h1>
        {article.category && (
          <span className="mt-2 text-xs text-white/60">
            #{article.category}
          </span>
        )}
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
