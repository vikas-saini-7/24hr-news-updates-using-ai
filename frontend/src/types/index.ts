export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  imageCover?: string;
  content?: string;
  sources?: { name: string; url: string }[];
  isSaved?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  plan: "FREE" | "PREMIUM";
  createdAt: string;
  updatedAt: string;
}
