import LandingHeader from "@/components/landing/LandingHeader";
import React from "react";

const page = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <LandingHeader />
      <div className="max-w-7xl mx-auto py-16">
        <div>
          <h1 className="text-2xl mb-4">About Us</h1>
          <p className="text-white/50">
            24Hrs Updates is dedicated to keeping you informed with the latest
            news and developments from around the world. In today’s fast-paced
            digital age, staying updated is more important than ever, and our
            platform is designed to deliver real-time information from trusted
            sources directly to you. Whether you’re interested in global
            headlines, technology, business, or local stories, our service
            ensures you never miss out on what matters most. We aggregate news
            using reliable RSS feeds and utilize AI-powered summaries to help
            you quickly grasp the key points of every story, saving you time and
            effort. Our commitment is to accuracy, speed, and simplicity, making
            it easy for anyone to stay ahead in a constantly changing world.
            With 24Hrs Updates, you can rely on a seamless experience that
            prioritizes your need for timely and relevant information. Join our
            community of informed readers and discover a smarter way to follow
            the news—anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
