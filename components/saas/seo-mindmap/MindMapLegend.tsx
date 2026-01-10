// components/seo-mindmap/MindMapLegend.tsx
"use client";

import React from "react";

type LegendItem = {
    key: string;
    title: string;
    subtitle: string;
    dotClass: string; // tailwind bg-*
    ringClass: string; // tailwind ring-*
    chipClass: string; // tailwind bg/text/border
};

const ITEMS: LegendItem[] = [
    {
        key: "strategic",
        title: "Page stratégique",
        subtitle: "Entry point / hub principal (ex: Accueil, /ressources)",
        dotClass: "bg-slate-900",
        ringClass: "ring-slate-900/15",
        chipClass: "bg-slate-900 text-white border-slate-900",
    },
    {
        key: "pillar",
        title: "Pilier",
        subtitle: "Section majeure qui porte un cluster (ex: Outils & SaaS)",
        dotClass: "bg-emerald-600",
        ringClass: "ring-emerald-600/20",
        chipClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
        key: "content",
        title: "Cluster / page contenu",
        subtitle: "Hub thématique (ex: Cluster: MVP, Cluster: Monétisation)",
        dotClass: "bg-blue-600",
        ringClass: "ring-blue-600/20",
        chipClass: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
        key: "longtail",
        title: "Longue traîne",
        subtitle: "Pages ciblées intention (ex: “pricing saas”, “mvp sans coder”)",
        dotClass: "bg-slate-400",
        ringClass: "ring-slate-400/25",
        chipClass: "bg-slate-50 text-slate-700 border-slate-200",
    },
];

function NodeCard({
    title,
    subtitle,
    dotClass,
    ringClass,
    chipClass,
    rightChip,
}: {
    title: string;
    subtitle: string;
    dotClass: string;
    ringClass: string;
    chipClass: string;
    rightChip: string;
}) {
    return (
        <div
            className={[
                "relative rounded-2xl border bg-white shadow-sm",
                "border-slate-200",
                "px-3 py-2.5",
                "min-w-[190px] max-w-[240px]",
            ].join(" ")}
        >
            {/* Color dot */}
            <div className="absolute -left-2 top-3">
                <span
                    className={[
                        "inline-flex h-4 w-4 items-center justify-center rounded-full",
                        "ring-4",
                        ringClass,
                    ].join(" ")}
                >
                    <span className={["h-2.5 w-2.5 rounded-full", dotClass].join(" ")} />
                </span>
            </div>

            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                        {title}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500">
                        {subtitle}
                    </div>
                </div>

                <span
                    className={[
                        "shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-semibold",
                        chipClass,
                    ].join(" ")}
                >
                    {rightChip}
                </span>
            </div>
        </div>
    );
}

function ArrowDown({ muted = false }: { muted?: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 px-1">
            <div className={muted ? "text-slate-300" : "text-slate-400"}>
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                    <path
                        d="M7 1v16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M3 15l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div
                className={[
                    "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                    muted ? "border-slate-200 text-slate-400 bg-slate-50" : "border-slate-200 text-slate-500 bg-white",
                ].join(" ")}
            >
                structure
            </div>
        </div>
    );
}

function Branch({
    label,
    hint,
}: {
    label: string;
    hint: string;
}) {
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold">
                ↳
            </span>
            <div className="leading-tight">
                <div className="text-[11px] font-semibold text-slate-700">{label}</div>
                <div className="text-[10px] text-slate-500">{hint}</div>
            </div>
        </div>
    );
}

export default function MindMapLegend() {
    return (
        <div className="hidden md:flex items-center gap-4">
            {/* Main legend card (Miro-style) */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                {/* Left: hierarchy mini-map */}
                <div className="flex items-center gap-3">
                    <NodeCard
                        title="Stratégique"
                        subtitle="Accueil / hub principal"
                        dotClass={ITEMS[0].dotClass}
                        ringClass={ITEMS[0].ringClass}
                        chipClass={ITEMS[0].chipClass}
                        rightChip="S"
                    />

                    <ArrowDown />

                    <NodeCard
                        title="Pilier"
                        subtitle="Grosse catégorie"
                        dotClass={ITEMS[1].dotClass}
                        ringClass={ITEMS[1].ringClass}
                        chipClass={ITEMS[1].chipClass}
                        rightChip="P"
                    />

                    <ArrowDown />

                    <NodeCard
                        title="Cluster"
                        subtitle="Hub thématique"
                        dotClass={ITEMS[2].dotClass}
                        ringClass={ITEMS[2].ringClass}
                        chipClass={ITEMS[2].chipClass}
                        rightChip="C"
                    />

                    <ArrowDown muted />

                    <NodeCard
                        title="Longue traîne"
                        subtitle="Pages intention"
                        dotClass={ITEMS[3].dotClass}
                        ringClass={ITEMS[3].ringClass}
                        chipClass={ITEMS[3].chipClass}
                        rightChip="LT"
                    />
                </div>

                {/* Divider */}
                <div className="h-14 w-px bg-slate-200" />

                {/* Right: quick rules (super clear) */}
                <div className="flex items-center gap-2">
                    <Branch label="1 pilier" hint="= une grosse thématique" />
                    <Branch label="clusters" hint="= sous-thèmes" />
                    <Branch label="pages" hint="= requêtes" />
                </div>
            </div>

            {/* Optional: compact legend dots (hoverable) */}
            <div className="flex items-center gap-2">
                {ITEMS.map((it) => (
                    <div
                        key={it.key}
                        className="group relative"
                        aria-label={it.title}
                    >
                        <div
                            className={[
                                "h-9 w-9 rounded-2xl border border-slate-200 bg-white shadow-sm",
                                "flex items-center justify-center",
                            ].join(" ")}
                        >
                            <span className={["h-2.5 w-2.5 rounded-full", it.dotClass].join(" ")} />
                        </div>

                        {/* Tooltip */}
                        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={[
                                            "inline-flex h-5 w-5 items-center justify-center rounded-full",
                                            "ring-4",
                                            it.ringClass,
                                        ].join(" ")}
                                    >
                                        <span className={["h-3 w-3 rounded-full", it.dotClass].join(" ")} />
                                    </span>
                                    <div className="text-sm font-semibold text-slate-900">
                                        {it.title}
                                    </div>
                                </div>
                                <div className="mt-1 text-[11px] leading-snug text-slate-500">
                                    {it.subtitle}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
