// components/landing/LandingLayout.tsx
import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PartnerFitSection from "./PartnerFitSection";
import FinalCTASection from "./FinalCTASection";
import RevenueProjectionSection from "./RevenueProjectionSection";
import ExecutionMethodSection from "./ExecutionMethodSection";
import LandingTracking from "./LandingTracking";

export type LandingSection = {
  id?: string;
  title: string;
  text?: string;
  bullets?: string[];
};

type LandingLayoutProps = {
  // CONTENT
  sections: LandingSection[];

  // FINAL CTA
  finalTitle: string;
  finalSubtitle: string;
  primaryCtaLabel: string;
};

export default function LandingLayout(props: LandingLayoutProps) {
  return (
    // ✅ IMPORTANT: block horizontal page scroll WITHOUT cutting the hero visual
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Tracking isolé */}
      <LandingTracking />

      {/* =========================
          HERO — GRAND / GAUCHE / CENTRÉ VERTICALEMENT
      ========================== */}
      <section className="min-h-[calc(100vh-96px)] flex items-center">
        <div className="w-full mx-auto max-w-[1600px] px-10 lg:px-20">
          <HeroSection
            eyebrow="Ne lancez pas juste un produit."
            titleLine1="Construisez un"
            titleHighlight="actif rentable."
            primaryCtaLabel="Vérifier la faisabilité →"
            secondaryCtaLabel="Comprendre le modèle"
          />
        </div>
      </section>

      {/* =========================
          CONTENU — CADRÉ / RYTHMÉ
      ========================== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 space-y-28 lg:space-y-32">
        {/* Revenue */}
        <RevenueProjectionSection
          clients={100}
          pricePerMonth={49}
          mrr={4900}
          ctaLabel="Vérifier la faisabilité de mon idée"
        />

        {/* Features */}
        <FeaturesSection />

        {/* Méthode */}
        <ExecutionMethodSection />

        {/* Alignment */}
        <PartnerFitSection
          leftItems={[
            "Expertise sectorielle prouvée.",
            "Ambition de construire un actif valorisable.",
            "Recherche d’un CTO challenger, pas d’un exécutant.",
          ]}
          rightItems={[
            "Recherche de revenus passifs ou automatiques.",
            "Obsession des fonctionnalités avant la vente.",
            'Projet "side-business" sans temps dédié.',
          ]}
        />

        {/* CTA final */}
        <FinalCTASection
          title={props.finalTitle}
          subtitle={props.finalSubtitle}
          primaryCtaLabel={props.primaryCtaLabel}
        />
      </div>
    </div>
  );
}
