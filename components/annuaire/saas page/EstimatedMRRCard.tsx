"use client";

import { useMemo, useState } from "react";

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

export default function EstimatedMRRCard({
    compact = false,
}: {
    compact?: boolean;
}) {
    const [visits, setVisits] = useState(5000);
    const [price, setPrice] = useState(49);

    const safe = useMemo(() => {
        return {
            visits: clamp(Number.isFinite(visits) ? visits : 0, 0, 200000),
            price: clamp(Number.isFinite(price) ? price : 0, 0, 499),
        };
    }, [visits, price]);

    const range = useMemo(() => {
        const clientsLow = safe.visits * CONV_LOW;
        const clientsHigh = safe.visits * CONV_HIGH;
        const mrrLow = clientsLow * safe.price;
        const mrrHigh = clientsHigh * safe.price;

        return { clientsLow, clientsHigh, mrrLow, mrrHigh };
    }, [safe]);

    // tailles compactes
    const pad = compact ? "p-5" : "p-6";
    const top = compact ? "text-lg" : "text-xl";
    const big = compact ? "text-2xl" : "text-3xl";

    return (
        <div className={`w-full rounded-2xl border border-slate-200 bg-white shadow-sm ${pad}`}>
            {/* Ligne formule */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className={`font-semibold tracking-tight text-violet-600 ${top}`}>
                    {fmtInt(range.clientsLow)}–{fmtInt(range.clientsHigh)} clients
                </div>

                <div className="font-semibold text-slate-300">×</div>

                <div className={`font-semibold tracking-tight text-violet-600 ${top}`}>
                    {fmtInt(safe.price)}€
                    <span className="ml-1 text-base font-semibold text-slate-400">/ mois</span>
                </div>

                <div className="font-semibold text-slate-300">=</div>

                <div className="rounded-2xl bg-slate-50 px-4 py-2 ring-1 ring-slate-100">
                    <span className={`font-bold tracking-tight text-slate-900 ${big}`}>
                        {fmtEUR(range.mrrLow)}–{fmtEUR(range.mrrHigh)}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-slate-400">MRR</span>
                </div>
            </div>

            {/* Sliders */}
            <div className="mt-5 space-y-4">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Visites / mois
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
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
              mt-2 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-100 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(124,58,237,0.16)]
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-violet-600
            "
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Prix / mois
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                            {fmtInt(safe.price)}€
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
              mt-2 h-2 w-full cursor-pointer appearance-none rounded-full
              bg-slate-100 outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-violet-600
              [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(124,58,237,0.16)]
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-violet-600
            "
                    />
                </div>
            </div>
        </div>
    );
}
