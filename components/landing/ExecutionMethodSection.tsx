// components/landing/ExecutionMethodSection.tsx
"use client";

import React from "react";
import { Check } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
};

type Props = {
  cycleLabel?: string;
  steps?: Step[];
};

export default function ExecutionMethodSection({
  cycleLabel = "Cycle type : 6 à 8 semaines",
  steps = [
    {
      number: "01",
      title: "Cadrage & périmètre",
      description: "On verrouille le scope. Budget et planning deviennent prédictibles.",
      bullets: ["Audit & architecture", "User flows validés", "Backlog priorisé"],
    },
    {
      number: "02",
      title: "Développement agile",
      description: "Cycles courts. Validation continue. Zéro dérive silencieuse.",
      bullets: ["Stack moderne & scalable", "Sprints hebdomadaires", "QA continue"],
    },
    {
      number: "03",
      title: "Livraison & propriété",
      description: "Mise en prod + transfert complet. Vous possédez 100% du code.",
      bullets: ["Déploiement cloud", "Transfert IP", "Documentation technique"],
    },
  ],
}: Props) {
  return (
    <section className="mx-auto max-w-7xl">
      {/* Divider */}
      <div className="h-px w-full bg-slate-200" />

      {/* Header minimal */}
      <div className="mt-10 flex items-center justify-end">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600">
          {cycleLabel}
        </span>
      </div>

      {/* Steps */}
      <div className="mt-10 grid gap-14 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="space-y-5">
            {/* Number (discret) */}
            <div className="text-[11px] font-semibold tracking-[0.16em] text-slate-300">
              {step.number}
            </div>

            {/* Title + desc */}
            <div className="space-y-2">
              <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">
                {step.title}
              </h3>

              <p className="max-w-sm text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>

            {/* Bullets (fins, plus “premium”) */}
            <ul className="space-y-2.5 pt-1">
              {step.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900">
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  <span className="text-sm font-medium text-slate-800">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
