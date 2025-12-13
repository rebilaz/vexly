// components/landing/HeroSection.tsx
import React from "react";
import { ArrowRight, Rocket, Zap, Check } from "lucide-react";

type HeroSectionProps = {
  niche: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
};

const Badge = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
    <Zap className="size-4" />
    {label}
  </div>
);

const TrustIndicator = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex size-5 items-center justify-center rounded-full bg-green-500">
      <Check className="size-3 text-white" />
    </div>
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </div>
);

const StepItem = ({ step, text, time }: { step: string; text: string; time: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-sm font-bold text-slate-800">
      {step}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-800">{text}</p>
      <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">
        {time}
      </span>
    </div>
  </div>
);

export default function HeroSection({
  niche,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
}: HeroSectionProps) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:gap-16">
      {/* Colonne gauche */}
      <div className="space-y-8">
        <Badge label="Développement rapide" />

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {heroTitle}
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          {heroSubtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {/* CTA sans JS : ancre + smooth scroll via CSS */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:scale-[1.03] active:scale-[0.97]"
          >
            {primaryCtaLabel}
            <ArrowRight className="size-4" />
          </a>

          <a
            href="#process"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
          >
            Voir le process
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm">
          <TrustIndicator label="Code livré" />
          <TrustIndicator label="Livraison garantie" />
          <TrustIndicator label="Support inclus" />
        </div>
      </div>

      {/* Colonne droite : carte process */}
      <div
        id="process"
        className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40">
            <Rocket className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Comment ça se passe ?
          </h3>
        </div>

        <div className="space-y-6 text-sm">
          <StepItem step="1" text="Appel rapide pour comprendre ton idée" time="30 min" />
          <StepItem step="2" text="Maquette + scope clair" time="2–3 jours" />
          <StepItem step="3" text="Développement avec retours réguliers" time="2–4 semaines" />
          <StepItem step="4" text="Livraison, déploiement et support" time="Inclus" />
        </div>
      </div>
    </section>
  );
}
