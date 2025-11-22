"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Article } from "@/types";
import placeHolderNewsImage from "@/assets/placeholder-news.png";
import SaveButton from "./SaveButton";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="p-4 rounded-2xl bg-gray-500/10 transition shadow-lg hover:shadow-xl flex flex-col max-w-sm">
      {/* Cover Image */}
      <div className="w-full relative mb-3 aspect-[16/10]">
        <Image
          src={article.imageCover || placeHolderNewsImage}
          alt={article.title}
          className="object-cover rounded-xl w-full h-full"
          height={400}
          width={640}
          priority
        />
        {/* Save button overlay */}
        <SaveButton articleId={article.id} initialSaved={article.isSaved} />
      </div>

      {/* Title + Summary (flex-1 pushes footer down) */}
      <div className="flex-1 mt-2">
        <h3 className="text-lg font-semibold text-white">
          {article.title.slice(0, 50)}...
        </h3>
        {/* <p className="text-sm text-white/60 mt-2">{article.summary}</p> */}
      </div>

      {/* Footer (pinned at bottom) */}
      <div className="mt-3 text-sm flex justify-between w-full articles-center">
        <div>
          {/* <span className="font-medium text-white/70">Category:</span>{" "} */}
          {article.category && (
            <span className="text-white/60 text-xs">#{article.category}</span>
          )}
        </div>
        <Link href={`/feed/news/${article.slug}`}>
          <div className="text-blue-400 hover:underline">Read Article</div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
