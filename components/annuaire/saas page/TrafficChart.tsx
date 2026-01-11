"use client";

import React, { useMemo, useRef, useState } from "react";

type Point = { label: string; value: number; fullLabel?: string };

function computeGrowth(data: Point[], providedGrowth?: number): number {
    if (typeof providedGrowth === "number") return providedGrowth;

    const n = data.length;
    if (n < 2) return 0;

    const prev = data[n - 2]?.value ?? 0;
    const last = data[n - 1]?.value ?? 0;
    if (prev <= 0) return 0;

    return ((last - prev) / prev) * 100;
}

function fmtInt(n: number) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
        Math.round(n)
    );
}

export function TrafficChart({
    data,
    growth,
}: {
    data?: Point[];
    growth?: number;
}) {
    const chartData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const computedGrowth = useMemo(
        () => computeGrowth(chartData, growth),
        [chartData, growth]
    );

    const growthLabel = `${computedGrowth > 0 ? "+" : ""}${computedGrowth.toFixed(
        1
    )}%`;

    // Placeholder si pas de data
    if (!chartData.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-extrabold tracking-tight text-[#202124]">
                    Traffic
                </h3>
                <p className="mt-2 text-sm text-slate-500">Pas encore de données de trafic.</p>
            </div>
        );
    }

    // ====== SVG layout (match recharts sizing) ======
    // On garde le même bloc: h-[240px] w-full
    // On fait un viewBox "large" qui scale.
    const W = 900;
    const H = 240;

    // Margins similaires à l’ancien BarChart + XAxis height 46 + angle -35
    const marginTop = 8;
    const marginRight = 0;
    const marginLeft = 0;
    const marginBottom = 46; // XAxis height

    const innerW = W - marginLeft - marginRight;
    const innerH = H - marginTop - marginBottom;

    const maxValue = Math.max(...chartData.map((d) => d.value), 1);

    // bar sizing: recharts maxBarSize=38
    const n = chartData.length;
    const slotW = innerW / n;
    const maxBarW = 38;
    const barW = Math.min(maxBarW, slotW * 0.7); // proche du rendu recharts
    const gap = slotW - barW;

    // Tooltip state (interactivité identique)
    const wrapRef = useRef<HTMLDivElement>(null);
    const [tip, setTip] = useState<{
        x: number;
        y: number;
        label: string;
        value: number;
        open: boolean;
    }>({ x: 0, y: 0, label: "", value: 0, open: false });

    function openTip(
        e: React.MouseEvent,
        p: Point
    ) {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        setTip({
            x: mx,
            y: my,
            label: p.fullLabel || p.label || "—",
            value: p.value,
            open: true,
        });
    }

    function moveTip(e: React.MouseEvent) {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        setTip((t) => (t.open ? { ...t, x: mx, y: my } : t));
    }

    function closeTip() {
        setTip((t) => ({ ...t, open: false }));
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-extrabold tracking-tight text-[#202124]">
                    Traffic
                </h3>

                <div
                    className={
                        "text-sm font-extrabold " +
                        (computedGrowth >= 0 ? "text-[#137333]" : "text-[#B3261E]")
                    }
                >
                    {growthLabel}
                </div>
            </div>

            {/* Chart + tooltip wrapper */}
            <div ref={wrapRef} className="relative h-[240px] w-full" onMouseMove={moveTip}>
                {/* Tooltip (visuel identique à ton CustomTooltip) */}
                {tip.open ? (
                    <div
                        className="pointer-events-none absolute z-10 rounded-xl border border-slate-100 bg-white p-3 shadow-md"
                        style={{
                            // on évite de sortir du cadre
                            left: Math.min(tip.x + 12, (wrapRef.current?.clientWidth || 0) - 180),
                            top: Math.max(8, tip.y - 48),
                            width: 180,
                        }}
                    >
                        <p className="mb-1 text-xs text-slate-500">{tip.label}</p>
                        <p className="text-sm font-bold text-[#202124]">
                            {fmtInt(tip.value)} vues
                        </p>
                    </div>
                ) : null}

                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="h-full w-full"
                    role="img"
                    aria-label="Graphique de trafic mensuel"
                >
                    {/* Grid horizontal (même feeling que recharts: strokeDasharray 3 3 + F1F3F4) */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const y = marginTop + innerH * (1 - ratio);
                        return (
                            <line
                                key={ratio}
                                x1={marginLeft}
                                y1={y}
                                x2={marginLeft + innerW}
                                y2={y}
                                stroke="#F1F3F4"
                                strokeDasharray="3 3"
                            />
                        );
                    })}

                    {/* Bars */}
                    {chartData.map((p, i) => {
                        const h = (p.value / maxValue) * innerH;
                        const x = marginLeft + i * slotW + gap / 2;
                        const y = marginTop + innerH - h;

                        // radius comme recharts: [10,10,2,2] => on simule avec rx/ry
                        const rx = 10;

                        return (
                            <rect
                                key={i}
                                x={x}
                                y={y}
                                width={barW}
                                height={h}
                                rx={rx}
                                ry={rx}
                                fill="#4285F4"
                                onMouseEnter={(e) => openTip(e, p)}
                                onMouseLeave={closeTip}
                            />
                        );
                    })}

                    {/* X labels (rotation -35° comme avant) */}
                    {chartData.map((p, i) => {
                        const x = marginLeft + i * slotW + slotW / 2;
                        const y = marginTop + innerH + 34; // place similaire au tickMargin/height
                        return (
                            <text
                                key={i}
                                x={x}
                                y={y}
                                fill="#9AA0A6"
                                fontSize="12"
                                textAnchor="end"
                                transform={`rotate(-35, ${x}, ${y})`}
                            >
                                {p.label}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
