"use client";

import React from "react";
import { ParcoursHero } from "./ParcoursHero";
import { ParcoursCard } from "./ParcoursCard";
import { ParcoursFAQ } from "./ParcoursFAQ";

const PARCOURS = [
  {
    slug: "youtube-revenus-instables",
    level: "YouTubeurs monétisés",
    duration: "~10–15 min",
    title: "YouTubeur : sortir de l’instabilité des revenus",
    description:
      "Diagnostiquer la dépendance à AdSense/sponsors, construire un plan B, et décider si un revenu récurrent (abonnement, communauté, outil) est pertinent.",
    steps: "Parcours décisionnel",
    bullets: [
      "Comprendre pourquoi tes revenus varient",
      "Mesurer ton risque (plateforme + sponsors)",
      "Choisir un plan B / revenu récurrent",
    ],
    comingSoon: false,
    imageSrc: "/ressources/parcours/Parcour1.png",
  },
  {
    slug: "youtube-plan-b-produit",
    level: "YouTubeurs monétisés",
    duration: "~15–25 min",
    title: "Plan B : lancer un produit sans casser ta chaîne",
    description:
      "Passer de “je subis” à “je contrôle” : produit one-shot vs abonnement, et comment choisir sans te disperser.",
    steps: "Parcours décisionnel",
    bullets: [
      "One-shot vs récurrent : quand choisir quoi",
      "Vendre sur plateforme vs vendre chez toi",
      "Éviter les fausses bonnes idées",
    ],
    comingSoon: true,
    // ✅ optionnel : mets une image générique si tu veux éviter le “vide”
    // imageSrc: "/ressources/parcours/Hero.webp",
  },
  {
    slug: "youtube-outil-saas-ou-communaute",
    level: "YouTubeurs monétisés",
    duration: "~15–25 min",
    title: "Communauté payante ou outil : choisir la bonne voie",
    description:
      "Décider si ton audience a besoin d’une communauté, d’un outil/SaaS, ou des deux — et éviter le piège du no-code bricolé.",
    steps: "Parcours décisionnel",
    bullets: [
      "Communauté : plateformes existantes vs sur-mesure",
      "Outil/SaaS : no-code vs dev pro",
      "Décider selon ton contenu et ta niche",
    ],
    comingSoon: true,
    // imageSrc: "/ressources/parcours/Hero.webp",
  },
];

function SectionHeader({
  title,
  subtitle,
  center = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mb-10 text-center" : "mb-8"}>
      <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-base text-slate-600">{subtitle}</p>}
    </div>
  );
}

export default function ParcoursClient() {
  return (
    <>
      {/* ✅ HERO FULL WIDTH */}
      <ParcoursHero />

      {/* ✅ CONTENU SEULEMENT */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Parcours */}
        <section>
          <SectionHeader
            title="Parcours disponibles"
            subtitle="Chaque parcours répond à un problème précis. Tu avances, tu décides, tu passes à l’action."
          />

          {/* ✅ grid plus dense + 3 colonnes sur grand écran */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PARCOURS.map((p) => (
              <ParcoursCard key={p.slug} {...p} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <SectionHeader
            center
            title="Questions fréquentes"
            subtitle="Pour comprendre comment utiliser les parcours et à quoi ils servent."
          />

          <ParcoursFAQ />
        </section>
      </div>
    </>
  );
}
