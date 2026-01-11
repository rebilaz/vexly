"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, CreditCard } from "lucide-react";

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

function fmtInt(n: number) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
        Math.round(n)
    );
}

function fmtEUR(n: number) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(Math.round(n));
}

// Plage implicite type SocialBlade (sans afficher conversion)
const CONV_LOW = 0.003; // 0.3%
const CONV_HIGH = 0.02; // 2%

export default function EstimatedMRRCard({ compact = false }: { compact?: boolean }) {
    const [visits, setVisits] = useState(5000);
    const [price, setPrice] = useState(49);

    const safeVisits = clamp(Number.isFinite(visits) ? visits : 0, 0, 200000);
    const safePrice = clamp(Number.isFinite(price) ? price : 0, 0, 499);

    const clientsLow = safeVisits * CONV_LOW;
    const clientsHigh = safeVisits * CONV_HIGH;
    const mrrLow = clientsLow * safePrice;
    const mrrHigh = clientsHigh * safePrice;

    const pad = compact ? "p-6" : "p-7";
    const titleSize = compact ? "text-3xl" : "text-4xl";
    const subtitleSize = compact ? "text-sm" : "text-base";

    return (
        <div
            className={[
                "w-full rounded-[28px] border border-slate-200 bg-white shadow-sm",
                "relative overflow-hidden",
                pad,
            ].join(" ")}
        >
            {/* soft bg glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

            {/* Header */}
            <div className="relative">
                <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-violet-600">
                    <span className="text-[12px]">🚀</span>
                    Simulateur de revenus
                </div>

                <div className="text-center">
                    <div
                        className={`font-geist font-extrabold tracking-tight text-slate-900 ${titleSize}`}
                    >
                        <span className="mr-2 text-slate-900/90">Crée ton</span>
                        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                            SaaS
                        </span>
                    </div>

                    <p className={`mt-3 ${subtitleSize} leading-relaxed text-slate-500`}>
                        De l’idée au produit prêt à vendre.
                        <br />
                        Estime ton potentiel dès maintenant.
                    </p>
                </div>
            </div>

            {/* Sliders */}
            <div className="relative mt-6 space-y-7">
                {/* VISITS */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                            <Eye size={14} className="text-slate-400" />
                            VISITES / MOIS
                        </div>

                        <div className="rounded-xl bg-violet-50 px-3 py-1.5 text-base font-extrabold text-violet-600">
                            {fmtInt(safeVisits)}
                        </div>
                    </div>

                    <input
                        aria-label="Visites par mois"
                        type="range"
                        min={0}
                        max={150000}
                        step={100}
                        value={safeVisits}
                        onChange={(e) => setVisits(Number(e.target.value))}
                        className="
              mt-3 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-200/70 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(124,58,237,0.18)]
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

                {/* PRICE */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                            <CreditCard size={14} className="text-slate-400" />
                            PRIX / MOIS
                        </div>

                        <div className="rounded-xl bg-violet-50 px-3 py-1.5 text-base font-extrabold text-violet-600">
                            {fmtInt(safePrice)} €
                        </div>
                    </div>

                    <input
                        aria-label="Prix mensuel"
                        type="range"
                        min={0}
                        max={200}
                        step={1}
                        value={safePrice}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="
              mt-3 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-200/70 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(124,58,237,0.18)]
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-violet-600
            "
                    />

                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span>Micro-SaaS</span>
                        <span>B2B</span>
                        <span>Premium</span>
                    </div>
                </div>

                {/* MRR ESTIMÉ */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-[12px] font-extrabold uppercase tracking-widest text-slate-400">
                        MRR estimé
                    </div>

                    <div className="mt-3 flex items-baseline justify-between gap-4">
                        <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                            <div className="truncate text-3xl font-extrabold tracking-tight text-slate-900">
                                {fmtEUR(mrrLow)}
                            </div>

                            <div className="flex-shrink-0 text-slate-300">—</div>

                            <div className="truncate text-3xl font-extrabold tracking-tight text-slate-900">
                                {fmtEUR(mrrHigh)}
                            </div>
                        </div>

                        <div className="flex-shrink-0 whitespace-nowrap text-sm font-bold text-slate-400">
                            / mois
                        </div>
                    </div>
                </div>

                {/* CTA ACTION */}
                <div className="pt-1">
                    <Link href="/form" className="block w-full">
                        <button
                            type="button"
                            className="
                group relative w-full overflow-hidden rounded-full
                bg-gradient-to-r from-violet-500 to-fuchsia-500
                px-6 py-4
                text-base font-extrabold text-white
                shadow-lg shadow-violet-500/25
                transition-all
                hover:scale-[1.02]
                hover:shadow-xl
                active:scale-[0.98]
              "
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Lancer mon projet <span className="text-lg">🚀</span>
                            </span>

                            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <span className="absolute -left-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/15 blur-2xl" />
                            </span>
                        </button>
                    </Link>

                    <p className="mt-2 text-center text-xs text-slate-400">
                        Estimation indicative — sans engagement
                    </p>
                </div>
            </div>
        </div>
    );
}
