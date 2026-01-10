"use client";

import React from "react";
import MindMapControls from "./MindMapControls";
import MindMapCanvas from "./MindMapCanvas";
import NodeSidePanel from "./NodeSidePanel";
import type { MindMapApi, MindMapData, MindMapNode } from "./mindmap.types";

export default function MindMapShell() {
    const apiRef = React.useRef<MindMapApi | null>(null);

    const [full, setFull] = React.useState<MindMapData>({ nodes: [], links: [] });
    const [selected, setSelected] = React.useState<MindMapNode | null>(null);

    const [runInfo, setRunInfo] = React.useState<any>(null);
    const [summary, setSummary] = React.useState<any>(null);

    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState<string | null>(null);

    const [showExtra, setShowExtra] = React.useState(false);

    const refresh = React.useCallback(async () => {
        setErr(null);

        try {
            const res = await fetch("/api/seo/crawl/latest", { cache: "no-store" });
            const out = await res.json();

            if (!out?.ok) {
                setErr(out?.error ?? "Failed to load latest crawl");
                setFull({ nodes: [], links: [] });
                setRunInfo(null);
                setSummary(null);
                return null;
            }

            setRunInfo(out.run);
            setSummary(out.summary ?? null);

            const baseLinks = out.treeLinks ?? [];
            const extra = out.extraLinks ?? [];

            setFull({
                nodes: out.nodes ?? [],
                links: showExtra ? [...baseLinks, ...extra] : baseLinks,
            });

            setTimeout(() => apiRef.current?.fit(), 120);

            return out.run?.status ?? null;
        } catch (e: any) {
            setErr(String(e?.message ?? e));
            setFull({ nodes: [], links: [] });
            setRunInfo(null);
            setSummary(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, [showExtra]);

    React.useEffect(() => {
        let alive = true;
        let t: any = null;

        const loop = async () => {
            if (!alive) return;
            const status = await refresh();
            if (status === "running") t = setTimeout(loop, 4000);
        };

        loop();
        return () => {
            alive = false;
            if (t) clearTimeout(t);
        };
    }, [refresh]);

    const onRecenter = () => apiRef.current?.fit();
    const onZoomIn = () => apiRef.current?.zoomBy(1.15);
    const onZoomOut = () => apiRef.current?.zoomBy(0.87);

    return (
        <div className="h-screen w-full bg-slate-50">
            <div className="relative h-full w-full">
                <div className="absolute left-5 top-5 z-30 space-y-3">
                    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                        <div className="text-sm font-extrabold text-slate-900">SEO MindMap</div>

                        <div className="mt-1 text-xs font-semibold text-slate-400">
                            {loading
                                ? "Chargement du dernier crawl…"
                                : err
                                    ? `Erreur: ${err}`
                                    : `Dernier run: ${runInfo?.id} • ${runInfo?.status ?? "—"}`}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    refresh();
                                }}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                                Refresh
                            </button>

                            {runInfo?.base_url ? (
                                <a
                                    href={runInfo.base_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                >
                                    Ouvrir site
                                </a>
                            ) : null}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={showExtra}
                                    onChange={(e) => setShowExtra(e.target.checked)}
                                />
                                Extra links (debug)
                            </label>
                        </div>

                        <div className="mt-2 text-[11px] font-semibold text-slate-500">
                            Sur les cartes : <span className="font-bold">RISK • In-degree • Depth</span>
                        </div>
                    </div>

                    {/* mini dashboard */}
                    {summary ? (
                        <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400">
                                        AVG DEPTH
                                    </div>
                                    <div className="mt-1 text-2xl font-extrabold text-slate-900">
                                        {summary.avg_depth}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400">
                                        JS PAGES
                                    </div>
                                    <div className="mt-1 text-2xl font-extrabold text-slate-900">
                                        {summary.js_count}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400">
                                        ORPHANS
                                    </div>
                                    <div className="mt-1 text-2xl font-extrabold text-slate-900">
                                        {summary.orphan_count}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400">
                                        DEEP & WEAK
                                    </div>
                                    <div className="mt-1 text-2xl font-extrabold text-slate-900">
                                        {summary.deep_weak_count}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                                Tip: commence par relier les <span className="font-extrabold">orphans</span> et les{" "}
                                <span className="font-extrabold">deep & weak</span>.
                            </div>
                        </div>
                    ) : null}
                </div>

                <MindMapCanvas
                    data={full}
                    onOpen={setSelected}
                    onToggle={(n) => {
                        console.log("[MindMap] toggle (V1)", n.id);
                    }}
                    apiRef={apiRef}
                />

                <MindMapControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} onRecenter={onRecenter} />
                <NodeSidePanel open={!!selected} node={selected} onClose={() => setSelected(null)} />
            </div>
        </div>
    );
}
