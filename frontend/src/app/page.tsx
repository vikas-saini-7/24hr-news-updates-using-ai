"use client";
import Hero from "@/components/landing/HeroSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";
import QualitiesSection from "@/components/landing/QualitiesSection";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <div className="min-h-screen overflow-hidden relative z-10">
        <LandingHeader />
        <Hero />

        {/* Smoke layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="smoke"></div>
          <div className="smoke delay-1"></div>
          <div className="smoke delay-2"></div>
        </div>
      </div>
      <QualitiesSection />
      <LandingFooter />
    </div>
  );
}
