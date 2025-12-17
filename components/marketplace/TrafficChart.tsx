import React from "react";
import { TrendingUp } from "lucide-react";

type Point = { label: string; value: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function TrafficChart({
  data,
  growth,
}: {
  data?: Point[];
  growth?: number;
}) {
  if (!data || !Array.isArray(data) || data.length < 2) return null;

  const values = data.map((d) => Number(d.value) || 0);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const safeRange = maxV - minV || 1;

  const W = 720;
  const H = 220;
  const padX = 36;
  const padY = 24;

  const xStep = (W - padX * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padX + i * xStep;
    const t = (Number(d.value) - minV) / safeRange;
    const y = padY + (1 - clamp(t, 0, 1)) * (H - padY * 2);
    return { x, y, label: d.label, value: d.value };
  });

  const lineD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaD =
    `${lineD} L ${(padX + (data.length - 1) * xStep).toFixed(2)} ${(H - padY).toFixed(2)}` +
    ` L ${padX.toFixed(2)} ${(H - padY).toFixed(2)} Z`;

  const growthLabel =
    typeof growth === "number"
      ? `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`
      : "+18.4%";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Popularité du Produit</h3>
          <p className="text-xs text-slate-500">
            Visites sur la page produit (3 derniers mois)
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
          <TrendingUp size={12} />
          {growthLabel}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[220px] w-full">
          {/* grid lines */}
          {[0.25, 0.5, 0.75].map((t, i) => {
            const y = padY + t * (H - padY * 2);
            return (
              <line
                key={i}
                x1={padX}
                y1={y}
                x2={W - padX}
                y2={y}
                stroke="currentColor"
                className="text-slate-100"
                strokeWidth="2"
              />
            );
          })}

          <defs>
            <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" className="text-indigo-500" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" className="text-indigo-500" />
            </linearGradient>
          </defs>

          {/* area */}
          <path d={areaD} fill="url(#areaFill)" />

          {/* line */}
          <path
            d={lineD}
            fill="none"
            stroke="currentColor"
            className="text-indigo-500"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* dots */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="white"
                stroke="currentColor"
                className="text-indigo-500"
                strokeWidth="3"
              />
            </g>
          ))}

          {/* x labels (first / middle / last for clean look) */}
          {points.map((p, i) => {
            const show = i === 0 || i === points.length - 1 || i === Math.floor(points.length / 2);
            if (!show) return null;
            return (
              <text
                key={`t-${i}`}
                x={p.x}
                y={H - 6}
                textAnchor="middle"
                className="fill-slate-400"
                fontSize="14"
                fontWeight="600"
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
