import React from "react";

export const metadata = {
  title: "Profile | News.AI",
  description: "Browse the latest curated news feed from News.AI.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
