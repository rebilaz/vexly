// components/landing/LandingLayout.tsx
import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PartnerFitSection from "./PartnerFitSection";
import FinalCTASection from "./FinalCTASection";
import RevenueProjectionSection from "./RevenueProjectionSection";
import ExecutionMethodSection from "./ExecutionMethodSection";

type LandingLayoutProps = {
  finalTitle: string;
  finalSubtitle: string;
  primaryCtaLabel: string;
};

export default function LandingLayout(props: LandingLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* HERO */}
        <HeroSection
          eyebrow="Ne lancez pas juste un produit."
          titleLine1="Construisez un"
          titleHighlight="actif rentable."
          primaryCtaLabel="Vérifier la faisabilité →"
          secondaryCtaLabel="Comprendre le modèle"
        />
    

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-16 space-y-16 sm:py-24 sm:space-y-24 lg:px-8 lg:space-y-32">
        <RevenueProjectionSection
          clients={100}
          pricePerMonth={49}
          mrr={4900}
          ctaLabel="Vérifier la faisabilité de mon idée"
        />

        <FeaturesSection />

        <ExecutionMethodSection />

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

        <FinalCTASection
          title={props.finalTitle}
          subtitle={props.finalSubtitle}
          primaryCtaLabel={props.primaryCtaLabel}
        />
      </div>
    </div>
  );
}