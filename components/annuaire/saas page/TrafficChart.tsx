"use client";

import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
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
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#4285F4]" />
                    <p className="text-sm font-bold text-[#202124]">
                        {Number(payload[0].value).toLocaleString()} vues
                    </p>
                </div>
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


    // si pas de data, petit placeholder propre
    if (!chartData.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-2">
                    <h3 className="text-base font-bold text-[#202124]">Popularité du produit</h3>
                    <p className="mt-1 text-xs text-[#5f6368]">Vues uniques (30 derniers jours)</p>
                </div>
                <p className="text-sm text-slate-500">Pas encore de données de trafic.</p>
            </div>
        );
    }

    const growthValue = typeof growth === "number" ? growth : 0;
    const growthLabel = `${growthValue > 0 ? "+" : ""}${growthValue.toFixed(1)}%`;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h3 className="text-base font-bold text-[#202124]">Popularité du produit</h3>
                    <p className="mt-1 text-xs text-[#5f6368]">Vues uniques (30 derniers jours)</p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-bold text-[#137333]">
                    {growthLabel}
                    <ArrowUpRight size={14} />
                </div>
            </div>

            {/* Chart */}
            <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4285F4" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F3F4" />

                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9AA0A6", fontSize: 12 }}
                            tickMargin={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9AA0A6", fontSize: 12 }}
                            tickFormatter={(value) =>
                                value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                            }
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#dadce0", strokeDasharray: "4 4" }} />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4285F4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: "#4285F4" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
