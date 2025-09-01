export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  image_cover?: string;
  content?: string;
  sources?: { name: string; url: string }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}
