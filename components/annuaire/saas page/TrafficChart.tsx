"use client";

import React, { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Point = { label: string; value: number; fullLabel?: string };

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-md">
                <p className="mb-1 text-xs text-slate-500">
                    {payload[0].payload.fullLabel || label || "—"}
                </p>
                <p className="text-sm font-bold text-[#202124]">
                    {Number(payload[0].value).toLocaleString()} vues
                </p>
            </div>
        );
    }
    return null;
};

export function TrafficChart({
    data,
    growth,
}: {
    data?: Point[];
    growth?: number;
}) {
    const chartData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    // ⬇️ Calcul automatique du % si non fourni
    const computedGrowth = useMemo(() => {
        // Si un growth est fourni, on le respecte
        if (typeof growth === "number") return growth;

        const n = chartData.length;
        if (n < 2) return 0;

        const prev = chartData[n - 2]?.value ?? 0; // Oct
        const last = chartData[n - 1]?.value ?? 0; // Nov

        if (prev <= 0) return 0;

        return ((last - prev) / prev) * 100;
    }, [growth, chartData]);


    const growthLabel = `${computedGrowth > 0 ? "+" : ""}${computedGrowth.toFixed(1)}%`;

    // Placeholder si pas de data
    if (!chartData.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-extrabold tracking-tight text-[#202124]">
                    Traffic
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Pas encore de données de trafic.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-extrabold tracking-tight text-[#202124]">
                    Traffic
                </h3>

                {/* % seul */}
                <div
                    className={
                        "text-sm font-extrabold " +
                        (computedGrowth >= 0 ? "text-[#137333]" : "text-[#B3261E]")
                    }
                >
                    {growthLabel}
                </div>
            </div>

            {/* Chart */}
            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 22 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F3F4" />

                        {/* Mois en diagonale */}
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            height={46}
                            tick={{ fill: "#9AA0A6", fontSize: 12 }}
                            tickMargin={12}
                            angle={-35}
                            textAnchor="end"
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "rgba(218,220,224,0.35)" }}
                        />

                        <Bar
                            dataKey="value"
                            radius={[10, 10, 2, 2]}
                            fill="#4285F4"
                            maxBarSize={38}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
