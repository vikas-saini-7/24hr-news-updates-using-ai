import type { Metadata } from "next";
import { Onest, DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/contexts/GlobalProvider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "News.AI",
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
      <body className={`${onest.variable} ${dmSans.variable} antialiased dark`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
