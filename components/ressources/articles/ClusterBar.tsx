// components/ressources/articles/ClusterBar.tsx
import { Filter } from "lucide-react";

export type UiCluster = { id: string; label: string; count: number };

function q(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v && v.trim()) sp.set(k, v.trim());
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default function ClusterBar({
  clusters,
  selected,
  query,
}: {
  clusters: UiCluster[];
  selected: string;
  query: string;
}) {
  const TOP_COUNT = 6;
  const top = clusters.slice(0, TOP_COUNT);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Catégories</span>
          </div>

          {selected !== "all" && (
            <a
              href={`/articles${q({ q: query, c: "all" })}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
            >
              Réinitialiser
            </a>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href={`/articles${q({ q: query, c: "all" })}`}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selected === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Vue d&apos;ensemble
          </a>

          {top.map((c) => (
            <a
              key={c.id}
              href={`/articles${q({ q: query, c: c.id })}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selected === c.id
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                  : "bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200/70"
              }`}
            >
              {c.label}
              <span className="ml-2 opacity-50 text-[10px]">{c.count}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
