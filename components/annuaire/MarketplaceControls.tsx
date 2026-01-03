"use client";

import { Search } from "lucide-react";

export type CategoryTab = "All" | "Templates" | "MVP" | "Modules";

export default function MarketplaceControls({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeTab: CategoryTab;
  setActiveTab: (t: CategoryTab) => void;
}) {
  const tabs: { key: CategoryTab; label: string }[] = [
    { key: "All", label: "Tous" },
    { key: "Templates", label: "Templates" },
    { key: "MVP", label: "MVP" },
    { key: "Modules", label: "Modules" },
  ];

  return (
    // ✅ Pas de mx-auto/max-w/px ici : le parent gère la largeur
    <div className="mt-10">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (nom, niche, stack...)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Tabs */}
        <div className="flex w-full justify-end md:w-auto">
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === t.key
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
