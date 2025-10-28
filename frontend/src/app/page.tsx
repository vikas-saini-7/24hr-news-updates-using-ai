"use client";
import CTASection from "@/components/landing/CTASection";
import Hero from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingHeader from "@/components/landing/LandingHeader";
import QualitiesSection from "@/components/landing/QualitiesSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

export default function Home() {
  return (
    <div className="bg-black/50 text-white">
      <div className="min-h-screen overflow-hidden relative z-10">
        <LandingHeader />
        <Hero />
      </div>

      {/* <HowItWorksSection /> */}
      <QualitiesSection />
      <TestimonialSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
