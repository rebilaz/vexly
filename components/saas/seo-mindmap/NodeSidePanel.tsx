"use client";

import React from "react";
import type { MindMapNode } from "./mindmap.types";

type Props = {
    open: boolean;
    node: MindMapNode | null;
    onClose: () => void;
};

function typeLabel(t: MindMapNode["type"]) {
    if (t === "strategic") return "ROOT";
    if (t === "pillar") return "PILIER";
    if (t === "content") return "CLUSTER";
    return "LONGUE TRAÎNE";
}

function typeDot(t: MindMapNode["type"]) {
    if (t === "strategic") return "bg-slate-900";
    if (t === "pillar") return "bg-emerald-500";
    if (t === "content") return "bg-blue-500";
    return "bg-slate-400";
}

function extractNumber(s?: string) {
    if (!s) return "—";
    const m = s.match(/\d+/);
    return m ? m[0] : s;
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="text-[11px] font-extrabold tracking-[0.14em] text-slate-300">
                {title}
            </div>
            <div className="mt-2 text-3xl font-extrabold text-slate-900">{value}</div>
        </div>
    );
}

export default function NodeSidePanel({ open, node, onClose }: Props) {
    // ESC to close
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={[
                    "fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity",
                    open ? "opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
                onClick={onClose}
            />

            {/* Panel (overlay, does NOT resize the map) */}
            <aside
                className={[
                    "fixed right-0 top-0 z-50 h-full w-[420px] max-w-[92vw]",
                    "bg-white shadow-2xl border-l border-slate-200",
                    "transition-transform duration-300 ease-out",
                    open ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
                aria-hidden={!open}
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div className="min-w-0">
                        <div className="text-xs font-extrabold tracking-[0.18em] text-indigo-500">
                            DÉTAILS DU NOEUD
                        </div>
                        <div className="mt-1 truncate text-2xl font-bold text-slate-900">
                            {node?.label ?? "—"}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <span className={`h-2.5 w-2.5 rounded-full ${typeDot(node?.type ?? "longtail")}`} />
                            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                                {node ? typeLabel(node.type) : "—"}
                            </span>
                            {node?.parent ? (
                                <span className="truncate text-xs font-semibold text-slate-400">
                                    Parent: {node.parent}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-500 hover:bg-slate-50"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="h-[calc(100%-86px)] overflow-auto px-6 py-5">
                    {!node ? (
                        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                            <div className="text-base font-bold text-slate-800">
                                Clique une carte dans la map
                            </div>
                            <div className="mt-1 text-sm font-medium text-slate-400">
                                Les métriques et détails apparaîtront ici.
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Hero visual (placeholder clean) */}
                            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-3">
                                <div className="h-40 w-full rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100" />
                            </div>

                            {/* Stats */}
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <StatCard title="Autorité (PA)" value={extractNumber(node.metaLeft)} />
                                <StatCard title="Pages indexées" value={extractNumber(node.metaRight)} />
                            </div>

                            {/* Status */}
                            <div className="mt-5">
                                <div className="text-sm font-semibold text-slate-700">Statut</div>
                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                    <span className={`h-2.5 w-2.5 rounded-full ${typeDot(node.type)}`} />
                                    {node.type === "pillar"
                                        ? "Actif & optimisé"
                                        : node.type === "content"
                                            ? "En cours de structuration"
                                            : node.type === "longtail"
                                                ? "À pousser (long-tail)"
                                                : "Central / entry point"}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <div className="text-sm font-semibold text-slate-700">Description stratégique</div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    Ici tu pourras afficher une description venant de ton crawler :
                                    intention, rôle dans le cocon, liens internes, pages enfants, etc.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                    Voir pages
                                </button>
                                <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                                    Auditer
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}
