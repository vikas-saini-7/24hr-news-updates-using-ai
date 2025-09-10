import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import GlobalProvider from "@/contexts/GlobalProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "What happened in last 24hrs?",
  description:
    "Stay updated with the latest news and events from the past 24 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased dark`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
