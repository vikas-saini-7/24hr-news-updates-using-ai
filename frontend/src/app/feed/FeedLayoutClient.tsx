"use client";

import React from "react";
import Sidebar from "@/components/feed/Sidebar";
import FeedHeader from "@/components/feed/FeedHeader";
import SidebarContextProvider from "@/contexts/SidebarContextProvider";

export default function FeedLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarContextProvider>
      <div className="flex min-h-screen w-full flex-row">
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-screen">
          <FeedHeader />
          {children}
        </main>
      </div>
    </SidebarContextProvider>
  );
}
