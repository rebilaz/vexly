"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, ChevronDown } from "lucide-react";

export type UiCluster = { id: string; label: string; count: number };

function buildUrl(q: string, c: string) {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (c && c !== "all") sp.set("c", c);
  const s = sp.toString();
  return `/articles${s ? `?${s}` : ""}`;
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const TOP_COUNT = 4;

  const { top, more, selectedInMore } = useMemo(() => {
    const top = clusters.slice(0, TOP_COUNT);
    const more = clusters.slice(TOP_COUNT);
    const selectedInMore = selected !== "all" && more.some((c) => c.id === selected);
    return { top, more, selectedInMore };
  }, [clusters, selected]);

  const go = (id: string) => {
    router.push(buildUrl(query, id));
    // ✅ assure que la partie server (ArticlesIndex) re-rend tout de suite
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Catégories</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => go("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              selected === "all" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Vue d&apos;ensemble
          </button>

          {top.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                selected === c.id
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10"
                  : "bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200/70"
              }`}
            >
              {c.label}
              <span className="ml-2 text-[10px] opacity-50">{c.count}</span>
            </button>
          ))}

          {more.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  open || selectedInMore ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                + Plus
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500">
                    Autres catégories
                  </div>
                  <div className="max-h-[320px] overflow-auto p-2">
                    {more.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          go(c.id);
                          setOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition flex items-center justify-between ${
                          selected === c.id ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="truncate">{c.label}</span>
                        <span className="ml-3 text-xs text-slate-400">{c.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
