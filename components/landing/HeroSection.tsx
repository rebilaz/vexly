import React from "react";
import SaasPreview from "./SaasPreview";

type HeroSectionProps = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
};

export default function HeroSection({
  eyebrow,
  titleLine1,
  titleHighlight,
  primaryCtaLabel,
  secondaryCtaLabel,
}: HeroSectionProps) {
  return (
    <section className="w-full">

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <p className="mb-6 text-sm font-medium text-slate-500">{eyebrow}</p>

            {/* Title */}
            <h1 className="leading-[1.05] tracking-tight font-bold">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-slate-900">
                {titleLine1}
              </span>

              <span className="block text-6xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            </h1>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] active:scale-[0.98]"
              >
                {primaryCtaLabel}
              </a>

              {secondaryCtaLabel && (
                <a
                  href="#model"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
          </div>

          {/* RIGHT (SaaS preview — overflow 1/4 + cropped height, NO SCALE) */}
          <div className="relative z-0 lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[720px]">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-12 rounded-[40px] bg-gradient-to-tr from-indigo-300/25 via-sky-200/15 to-violet-300/20 blur-2xl" />

              {/* Tilt wrapper */}
              <div className="relative transform-gpu rotate-[-6deg] [transform:rotate(-6deg)_rotateY(-10deg)]">
                <div className="relative transform-gpu rotate-[-6deg] [transform:rotate(-6deg)_rotateY(-10deg)]">
                  <div
                    className="
      relative
      w-[820px] max-w-none
      h-[440px] lg:h-[480px]
      -mr-[220px] lg:-mr-[260px]
      rounded-[28px]
      overflow-hidden
      border border-slate-200
      bg-white
      shadow-2xl
    "
                  >
                    <div className="relative -translate-y-[46px] lg:-translate-y-[60px]">
                      <SaasPreview />
                    </div>
                  </div>
                </div>


                {/* Ombre douce côté débordement (optionnel) */}
                <div className="pointer-events-none absolute right-[-220px] top-[60px] h-[420px] w-[220px] rounded-[28px] bg-slate-900/5 blur-2xl" />
              </div>

              {/* Shine subtil */}
              <div className="pointer-events-none absolute left-10 top-8 h-20 w-56 rotate-[-12deg] rounded-full bg-white/45 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
