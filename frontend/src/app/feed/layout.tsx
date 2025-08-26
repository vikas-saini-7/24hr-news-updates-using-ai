"use client";
import React from "react";
import Header from "@/components/common/Header";
import Hero from "@/components/home/Hero";
import Sidebar from "@/components/feed/Sidebar";
import FeedHeader from "@/components/feed/FeedHeader";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [classicView, setClassicView] = React.useState(false);

  const toggleView = () => {
    setClassicView((prev) => !prev);
  };
  return (
    <div
      className={`flex min-h-screen w-full ${
        classicView ? "flex-col" : "flex-row"
      }`}
    >
      {classicView ? (
        <>
          <Header onToggleView={toggleView} />
          <Hero />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}
      <main className="flex-1 overflow-y-auto h-screen">
        {!classicView && <FeedHeader onToggleView={toggleView} />}
        {children}
      </main>
    </div>
  );
}
