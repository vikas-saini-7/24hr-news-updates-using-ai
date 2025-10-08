// lib/queries/articles.ts
import { Article } from "@/types";
import axios from "axios";

const API_BASE_URL = "https://two4hr-news-updates-using-ai.onrender.com";

// Fetch news by category
export async function fetchFeedByCategory(
  category: string
): Promise<Article[]> {
  const res = await axios.get(
    `${API_BASE_URL}/api/articles?category=${category}`,
    {
      withCredentials: true,
    }
  );
  return res.data.data;
}

// Fetch top stories
export async function fetchTopStories(): Promise<Article[]> {
  const res = await axios.get(`${API_BASE_URL}/api/articles/top-stories`, {
    withCredentials: true,
  });
  return res.data.data;
}

// Fetch saved articles
export async function fetchSavedArticles(): Promise<Article[]> {
  const res = await axios.get(`${API_BASE_URL}/api/articles/save`, {
    withCredentials: true,
  });
  return res.data.data;
}
