// components/landing/LandingLayout.tsx
import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ContentSections from "./ContentSections";
import FinalCTASection from "./FinalCTASection";
import LandingTracking from "./LandingTracking";

// 🔹 Type exporté pour ContentSections
export type LandingSection = {
  id?: string;
  title: string;
  text?: string;
  bullets?: string[];
};

type LandingLayoutProps = {
  niche: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  sections: LandingSection[];
};

export default function LandingLayout({
  niche,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
  sections,
}: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* tracking isolé (petit JS) */}
      <LandingTracking />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-28 lg:space-y-32">
        <HeroSection
          niche={niche}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          primaryCtaLabel={primaryCtaLabel}
        />

        <FeaturesSection />
        <ContentSections sections={sections} />

        <FinalCTASection niche={niche} primaryCtaLabel={primaryCtaLabel} />
      </div>
    </div>
  );
}
