// components/landing/PartnerFitSection.tsx
import React from "react";
import { Check, X } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;

  leftLabel?: string;
  leftItems: string[];

  rightLabel?: string;
  rightItems: string[];
};

export default function PartnerFitSection({
  title = "Alignment mutuel.",
  subtitle = "Nous ne sommes pas une agence pour tous. Vérifiez si notre modèle correspond à votre phase.",
  leftLabel = "PROFIL PARTENAIRE",
  leftItems,
  rightLabel = "INCOMPATIBLE",
  rightItems,
}: Props) {
  return (
    <section className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {subtitle}
        </p>
      </div>

      {/* Divider */}
      <div className="mt-8 h-px w-full bg-slate-200" />

      {/* Two columns */}
      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        {/* Left */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-slate-900">
            <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
            {leftLabel}
          </div>

          <ul className="space-y-4">
            {leftItems.map((txt) => (
              <li key={txt} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="size-4" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-900 sm:text-[15px]">
                  {txt}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-slate-400">
            <span className="inline-block size-1.5 rounded-full bg-slate-200" />
            {rightLabel}
          </div>

          <ul className="space-y-4">
            {rightItems.map((txt) => (
              <li key={txt} className="flex items-start gap-3 opacity-85">
                <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <X className="size-4" />
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-400 sm:text-[15px]">
                  {txt}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
