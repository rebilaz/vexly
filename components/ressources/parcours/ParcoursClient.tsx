"use client";

import React from "react";
import { ParcoursHero } from "./ParcoursHero";
import { ParcoursCard } from "./ParcoursCard";

const PARCOURS = [
  {
    slug: "valider-une-idee",
    level: "Débutant → Intermédiaire",
    duration: "~2–3h",
    title: "Valider une idée de business",
    description:
      "Identifier un vrai problème, tester la demande et obtenir des signaux concrets avant de coder.",
    steps: "6 étapes",
    bullets: [
      "Définir le problème et le persona",
      "Trouver des signaux de demande",
      "Éviter les faux positifs",
    ],
    comingSoon: false,
  },
  {
    slug: "construire-un-mvp",
    level: "Intermédiaire",
    duration: "~3–4h",
    title: "Construire un MVP qui vend",
    description: "Cadrer, prioriser et livrer vite un MVP utile et mesurable.",
    steps: "7 étapes",
    bullets: ["Scope minimal", "Wireframe + stack", "Livraison et itération"],
    comingSoon: true,
  },
  {
    slug: "trouver-une-traction",
    level: "Intermédiaire",
    duration: "~2h",
    title: "Trouver de la traction",
    description: "Choisir un canal et obtenir les premiers leads sans spam.",
    steps: "5 étapes",
    bullets: ["Canal unique", "Angle + offre", "Itération weekly"],
    comingSoon: true,
  },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
    </div>
  );
}

export default function ParcoursClient() {
  const available = PARCOURS.filter((p) => !p.comingSoon);
  const comingSoon = PARCOURS.filter((p) => p.comingSoon);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Hero (sans props) */}
      <ParcoursHero />

      {/* Parcours disponibles */}
      <section>
        <SectionHeader title="Parcours disponibles" />

        <div className="grid gap-8 md:grid-cols-2">
          {available.map((p) => (
            <ParcoursCard key={p.slug} {...p} />
          ))}
        </div>
      </section>

      {/* À venir */}
      {comingSoon.length > 0 && (
        <section className="mt-16">
          <SectionHeader title="À venir" />

          <div className="grid gap-8 md:grid-cols-2 opacity-[0.85]">
            {comingSoon.map((p) => (
              <ParcoursCard key={p.slug} {...p} comingSoon />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
