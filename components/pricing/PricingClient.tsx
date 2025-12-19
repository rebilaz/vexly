"use client";

import { useState } from "react";
import { PricingHero } from "./PricingHero";
import { PricingPlans } from "./PricingPlans";
import { PricingSocialProof } from "./PricingSocialProof";
import { PricingFaq } from "./PricingFaq";
import { PricingComparison } from "./PricingComparison";


export type PricingPlan = {
  name: string;
  highlight: string;
  basePrice: number | null; // null => Sur devis
  maintenanceMonthly?: number;
  featured?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
};

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    highlight: "Pour lancer ton 1er SaaS rapidement.",
    basePrice: 490,
    maintenanceMonthly: 49,
    description: "Pour lancer ton 1er SaaS rapidement.",
    features: [
      "1 template SaaS clé en main",
      "Design moderne & responsive",
      "Intégration auth & paiement",
      "Livraison en quelques jours",
      "Documentation de prise en main",
    ],
    ctaLabel: "Lancer mon 1er SaaS",
  },
  {
    name: "Growth",
    highlight: "Pour créateurs & freelances sérieux.",
    basePrice: 990,
    maintenanceMonthly: 99,
    featured: true,
    description: "Pour créateurs & freelances sérieux.",
    features: [
      "Tout le plan Starter",
      "Personnalisation Branding complète",
      "Pages Marketing (Landing, Pricing)",
      "Configuration Emails transactionnels",
      "Support prioritaire 24/7",
    ],
    ctaLabel: "Créer un SaaS rentable",
  },
  {
    name: "Custom",
    highlight: "Pour agences & scale-ups.",
    basePrice: null,
    description: "Pour agences & scale-ups.",
    features: [
      "Audit & Spécifications sur mesure",
      "Architecture Scalable & Custom",
      "Intégrations API complexes",
      "Transfert de propriété intellectuelle",
    ],
    ctaLabel: "Parler à un expert",
    ctaHref: "/contact",
  },
];

export default function PricingClient() {
  const [withMaintenance, setWithMaintenance] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050B1A] text-white">
      {/* Background: halo + grain (propre, pas de grille visible) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.72)_70%)]" />

        <div className="absolute -left-56 -top-64 h-[680px] w-[680px] rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute -right-64 -top-72 h-[720px] w-[720px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-[420px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* grain léger */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 lg:px-8 lg:pt-16">
        <PricingHero withMaintenance={withMaintenance} onToggleMaintenance={setWithMaintenance} />


        <PricingPlans
          plans={PLANS}
          withMaintenance={withMaintenance}
          onToggleMaintenance={setWithMaintenance}
        />

        <PricingSocialProof />

        <PricingComparison />

        <PricingFaq />
      </main>
    </div>
  );
}
