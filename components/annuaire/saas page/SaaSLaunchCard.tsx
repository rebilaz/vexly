"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Rocket, Eye, CreditCard } from "lucide-react";
import type { Listing } from "@/lib/marketplace";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function fmtInt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
}

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

// Plage implicite type "estimation" (sans afficher conversion)
const CONV_LOW = 0.003; // 0.3%
const CONV_HIGH = 0.02; // 2%

type SaasLaunchCardProps = {
  listing?: Listing; // ✅ optionnel pour éviter le crash runtime
  compact?: boolean;
};

export default function SaasLaunchCard({
  listing,
  compact = false,
}: SaasLaunchCardProps) {
  // ✅ évite "Cannot read properties of undefined (reading 'slug')"
  if (!listing) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">
          Sidebar indisponible (listing manquant)
        </div>
      </section>
    );
  }

  const [visits, setVisits] = useState(5000);
  const [price, setPrice] = useState(49);

  const safe = useMemo(() => {
    return {
      visits: clamp(Number.isFinite(visits) ? visits : 0, 0, 150000),
      price: clamp(Number.isFinite(price) ? price : 0, 0, 200),
    };
  }, [visits, price]);

  const range = useMemo(() => {
    const clientsLow = safe.visits * CONV_LOW;
    const clientsHigh = safe.visits * CONV_HIGH;
    const mrrLow = clientsLow * safe.price;
    const mrrHigh = clientsHigh * safe.price;
    return { clientsLow, clientsHigh, mrrLow, mrrHigh };
  }, [safe]);

  const primaryHref = `/form?ref=marketplace&slug=${encodeURIComponent(
    listing.slug,
  )}&name=${encodeURIComponent(listing.name)}`;

  const originalHref = listing.url || (listing as any).demo_url || "";

  // Sizing (plus compact pour rentrer dans la page)
  const pad = compact ? "p-5" : "p-6";
  const title = compact ? "text-5xl" : "text-6xl";
  const sliderGap = compact ? "mt-5" : "mt-6";
  const mrrPad = compact ? "p-4" : "p-5";
  const btnText = compact ? "text-sm" : "text-base";

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className={pad}>
        {/* Badge */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-violet-700">
            <Rocket className="h-4 w-4" />
            Simulateur
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h3
            className={[
              "font-geist font-extrabold tracking-tight text-slate-900",
              title,
            ].join(" ")}
          >
            SaaS
          </h3>

          {/* Moins de texte */}
          <p className="mt-2 text-sm font-medium text-slate-600">
            Estime ton MRR en 10s.
          </p>
        </div>

        {/* Slider: Visits */}
        <div className={sliderGap}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Eye className="h-4 w-4" />
              </span>
              Visites / mois
            </div>

            <div className="rounded-xl bg-violet-50 px-3 py-1 text-sm font-extrabold text-violet-600">
              {fmtInt(safe.visits)}
            </div>
          </div>

          <input
            aria-label="Visites par mois"
            type="range"
            min={0}
            max={150000}
            step={100}
            value={safe.visits}
            onChange={(e) => setVisits(Number(e.target.value))}
            className="
              mt-3 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-100 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(124,58,237,0.14)]
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-violet-600
            "
          />

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Démarrage</span>
            <span>Traction</span>
            <span>Scale</span>
          </div>
        </div>

        {/* Slider: Price */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <CreditCard className="h-4 w-4" />
              </span>
              Prix / mois
            </div>

            <div className="rounded-xl bg-violet-50 px-3 py-1 text-sm font-extrabold text-violet-600">
              {fmtInt(safe.price)} €
            </div>
          </div>

          <input
            aria-label="Prix mensuel"
            type="range"
            min={0}
            max={200}
            step={1}
            value={safe.price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="
              mt-3 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-100 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(124,58,237,0.14)]
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-violet-600
            "
          />

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Micro</span>
            <span>B2B</span>
            <span>Premium</span>
          </div>
        </div>

        {/* MRR */}
        <div className="mt-6 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
          <div className={mrrPad}>
            <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              MRR estimé
            </div>

            {/* Layout compact + gros chiffres */}
            <div className="mt-3">
              <div className="flex items-baseline gap-3">
                <div className="font-geist text-3xl font-extrabold tracking-tight text-slate-900">
                  {fmtEUR(range.mrrLow)}
                </div>
                <div className="text-slate-300">—</div>
                <div className="font-geist text-3xl font-extrabold tracking-tight text-slate-900">
                  {fmtEUR(range.mrrHigh)}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-400 whitespace-nowrap">
                  / mois
                </div>
                <div className="text-sm font-extrabold text-violet-600">
                  {fmtInt(range.clientsLow)}–{fmtInt(range.clientsHigh)} clients
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5">
          <Link href={primaryHref} className="block w-full">
            <button
              className={[
                "group relative isolate inline-flex h-12 w-full items-center justify-between rounded-full px-7",
                "font-semibold text-white",
                "bg-[#6D5EF8] transition-colors duration-200 hover:bg-[#6456F3]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200",
                btnText,
              ].join(" ")}
            >
              <span>Lancer mon projet</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition group-hover:bg-white/20">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </Link>

          {originalHref ? (
            <a
              href={originalHref}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-slate-600"
            >
              Voir le site
              <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
