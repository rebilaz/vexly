"use client";

import React from "react";
import type { MindMapNode } from "./mindmap.types";

type Props = {
    open: boolean;
    node: MindMapNode | null;
    onClose: () => void;
};

// ---------- helpers ----------
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

function riskChip(risk?: MindMapNode["risk"]) {
    if (risk === "danger")
        return { text: "RISK", cls: "bg-red-50 text-red-700 border-red-200" };
    if (risk === "warn")
        return { text: "WARN", cls: "bg-amber-50 text-amber-800 border-amber-200" };
    return { text: "OK", cls: "bg-emerald-50 text-emerald-800 border-emerald-200" };
}

function fmtBytes(bytes?: number | null) {
    if (!bytes || !Number.isFinite(bytes)) return "—";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
}

function fmtMs(ms?: number | null) {
    if (ms == null || !Number.isFinite(ms)) return "—";
    if (ms < 1000) return `${Math.round(ms)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
}

function fmtDepth(d?: number | null) {
    if (d == null) return "∞";
    if (!Number.isFinite(d)) return "—";
    return String(d);
}

function guessUrl(node: MindMapNode | null): string | null {
    if (!node) return null;
    const anyN = node as any;
    const u =
        (typeof anyN.url === "string" && anyN.url) ||
        (typeof anyN.canonical_url === "string" && anyN.canonical_url) ||
        (typeof anyN.final_url === "string" && anyN.final_url) ||
        (typeof anyN.path === "string" && anyN.path) ||
        null;

    if (!u) return null;

    // if it's a path like "/contact"
    if (u.startsWith("/")) {
        // try base_url on node
        const base =
            (typeof (anyN.base_url as any) === "string" && anyN.base_url) ||
            (typeof (anyN.site as any) === "string" && anyN.site) ||
            "";
        if (base && base.startsWith("http")) return base.replace(/\/$/, "") + u;
        // fallback (still useful)
        return u;
    }

    return u;
}

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-extrabold tracking-[0.14em] text-slate-300">
                {title}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
        </div>
    );
}

function Row({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-start justify-between gap-3 py-2">
            <div className="text-xs font-semibold text-slate-500">{label}</div>
            <div className="text-right text-xs font-semibold text-slate-800">
                {value}
            </div>
        </div>
    );
}

// ---------- component ----------
export default function NodeSidePanel({ open, node, onClose }: Props) {
    const url = guessUrl(node);

    const [copied, setCopied] = React.useState<null | "url">(null);

    // ESC to close
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    React.useEffect(() => {
        if (!open) setCopied(null);
    }, [open]);

    const r = riskChip(node?.risk);

    // GSC inspect URL (works if site is verified)
    const gscInspect = url && url.startsWith("http")
        ? `https://search.google.com/search-console/inspect?resource_id=sc-domain:${new URL(url).hostname}&id=${encodeURIComponent(url)}`
        : null;

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

            {/* Panel */}
            <aside
                className={[
                    "fixed right-0 top-0 z-50 h-full w-[440px] max-w-[92vw]",
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

                        <div className="mt-1 truncate text-2xl font-extrabold text-slate-900">
                            {node?.label ?? "—"}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
                            <span
                                className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-700`}
                            >
                                <span className={`h-2.5 w-2.5 rounded-full ${typeDot(node?.type ?? "longtail")}`} />
                                {node ? typeLabel(node.type) : "—"}
                            </span>

                            <span
                                className={[
                                    "rounded-full border px-3 py-1 text-xs font-extrabold",
                                    r.cls,
                                ].join(" ")}
                            >
                                {r.text}
                            </span>

                            {node?._groupLabel ? (
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-600">
                                    {node._groupLabel.toUpperCase()}
                                </span>
                            ) : null}
                        </div>

                        {/* URL */}
                        <div className="mt-3">
                            {url ? (
                                <a
                                    href={url.startsWith("http") ? url : undefined}
                                    target={url.startsWith("http") ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="block truncate text-xs font-semibold text-slate-500 hover:text-slate-700"
                                    title={url}
                                >
                                    {url}
                                </a>
                            ) : (
                                <div className="text-xs font-semibold text-slate-400">
                                    URL indisponible (node.url / node.path manquant)
                                </div>
                            )}
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
                <div className="h-[calc(100%-92px)] overflow-auto px-6 py-5">
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
                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={async () => {
                                        if (!url) return;
                                        const ok = await copyToClipboard(url);
                                        setCopied(ok ? "url" : null);
                                        setTimeout(() => setCopied(null), 900);
                                    }}
                                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    {copied === "url" ? "Copié ✓" : "Copier l’URL"}
                                </button>

                                {url && url.startsWith("http") ? (
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-2xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Ouvrir la page
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="rounded-2xl bg-indigo-600/40 px-4 py-3 text-sm font-semibold text-white"
                                    >
                                        Ouvrir la page
                                    </button>
                                )}
                            </div>

                            {gscInspect ? (
                                <a
                                    href={gscInspect}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Inspecter dans Search Console
                                </a>
                            ) : null}

                            {/* KPI */}
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <StatCard title="IN-DEGREE" value={String(node.in_degree ?? 0)} />
                                <StatCard title="OUT-DEGREE" value={String(node.out_degree ?? 0)} />
                                <StatCard title="DEPTH" value={fmtDepth(node.depth_bfs ?? null)} />
                                <StatCard title="STATUS" value={node.status_code ? String(node.status_code) : "—"} />
                            </div>

                            {/* Technical */}
                            <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="text-sm font-extrabold text-slate-900">
                                    Technique
                                </div>

                                <div className="mt-2 divide-y divide-slate-100">
                                    <Row
                                        label="Render mode"
                                        value={
                                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-extrabold text-slate-700">
                                                {node.render_mode ?? "—"}
                                            </span>
                                        }
                                    />
                                    <Row label="Temps réponse" value={fmtMs(node.response_ms ?? null)} />
                                    <Row label="Poids" value={fmtBytes(node.bytes ?? null)} />
                                    <Row
                                        label="Orphelin"
                                        value={
                                            node._isOrphan ? (
                                                <span className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-extrabold text-amber-800">
                                                    OUI
                                                </span>
                                            ) : (
                                                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-extrabold text-slate-700">
                                                    NON
                                                </span>
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Parent */}
                            <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="text-sm font-extrabold text-slate-900">Hiérarchie</div>
                                <div className="mt-2 text-xs font-semibold text-slate-600">
                                    Parent:{" "}
                                    <span className="font-extrabold text-slate-800">
                                        {node.parent ?? "—"}
                                    </span>
                                </div>
                                <div className="mt-2 text-[11px] font-semibold text-slate-500">
                                    (Tip: si tu veux afficher le label du parent ici, il faut passer
                                    la map des nodes au panel ou renvoyer `parent_label` depuis l’API.)
                                </div>
                            </div>

                            {/* Notes / next actions */}
                            <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                                <div className="text-sm font-extrabold text-slate-900">
                                    Actions SEO rapides
                                </div>
                                <ul className="mt-2 list-disc pl-5 text-sm font-medium text-slate-600">
                                    <li>
                                        Si <span className="font-extrabold">status ≠ 200</span> : corriger/redirect.
                                    </li>
                                    <li>
                                        Si <span className="font-extrabold">render_mode = js_heavy</span> : vérifier contenu HTML.
                                    </li>
                                    <li>
                                        Si <span className="font-extrabold">orphelin</span> : ajouter 2–5 liens depuis un hub.
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}
