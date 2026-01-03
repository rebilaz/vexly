"use client";

import { TrendingUp, Layers, Boxes } from "lucide-react";

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
      <span className="text-indigo-500">{icon}</span>
      {children}
    </span>
  );
}

export default function MarketplaceHero({
  total,
  niches,
  stacks,
}: {
  total: number;
  niches: number;
  stacks: number;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_60%,rgba(255,255,255,1)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center pt-20 pb-14 md:pt-24 md:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-4 py-1.5 text-[11px] font-bold tracking-wide text-indigo-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            MARKETPLACE SEO-FIRST
          </div>

          <h1 className="mt-7 text-center text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            Découvrez les meilleurs{" "}
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              Micro-SaaS
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-600 md:text-lg">
            Une sélection curée de produits, templates et MVPs prêts à l&apos;emploi.
            <br className="hidden md:block" />
            Gagnez du temps et lancez votre projet plus rapidement.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Pill icon={<TrendingUp className="h-4 w-4" />}>{total} produits</Pill>
            <Pill icon={<Layers className="h-4 w-4" />}>{niches} niches</Pill>
            <Pill icon={<Boxes className="h-4 w-4" />}>{stacks} stacks</Pill>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/60" />
    </section>
  );
}
