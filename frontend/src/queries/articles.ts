import axios from "axios";
import { Article } from "@/types";

// query function for news
export async function fetchFeedByCategory(
  category: string
): Promise<Article[]> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?category=${category}`,
    { withCredentials: true }
  );
  return res.data.data;
}

export async function fetchTopStories(): Promise<Article[]> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/top-stories`,
    { withCredentials: true }
  );
  return res.data.data;
}
