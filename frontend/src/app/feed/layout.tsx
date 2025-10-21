// app/feed/layout.tsx

import FeedLayoutClient from "./FeedLayoutClient";

export const metadata = {
  title: "Feed | News.AI",
  description: "Browse the latest curated news feed from News.AI.",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FeedLayoutClient>{children}</FeedLayoutClient>;
}
