"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  LayoutTemplate,
  Box,
  Zap,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";

type CategoryTab = "All" | "Templates" | "MVP" | "Modules";
type Category = "Templates" | "MVP" | "Modules";
type SortKey = "popular" | "recent" | "alpha";

type ClientListing = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  stack: string[];
  featured?: boolean;
  category: Category;
  niche_category?: string;
  discovered_at?: string | null;
};

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 ${className}`}
    >
      {children}
    </span>
  );
}

function iconForCategory(category: Category) {
  if (category === "Templates") return <LayoutTemplate size={12} />;
  if (category === "Modules") return <Box size={12} />;
  return <Zap size={12} />;
}

function toTs(d?: string | null) {
  if (!d) return 0;
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : 0;
}

export default function MarketplaceClient({
  listings,
  metrics,
}: {
  listings: ClientListing[];
  metrics?: { total: number; niches: number; stacks: number };
}) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const featuredItem = listings.find((i) => i.featured);

  const filteredListings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const base = listings.filter((item) => {
      // on cache le featured dans la grid si aucun filtre
      if (activeTab === "All" && item.featured && q === "") return false;

      const matchesTab = activeTab === "All" || item.category === activeTab;

      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.stack.some((s) => s.toLowerCase().includes(q)) ||
        (item.niche_category ?? "").toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });

    const sorted = [...base].sort((a, b) => {
      if (sortKey === "alpha") return a.title.localeCompare(b.title);
      if (sortKey === "recent") return toTs(b.discovered_at) - toTs(a.discovered_at);

      // "popular" (fallback) : on n'a pas de vraie popularité => proxy stack+tags (faible mais stable)
      const score = (x: ClientListing) => (x.stack?.length ?? 0) * 2 + (x.tags?.length ?? 0);
      return score(b) - score(a);
    });

    return sorted;
  }, [listings, activeTab, searchQuery, sortKey]);

  const tabs: { key: CategoryTab; label: string }[] = [
    { key: "All", label: "Tous" },
    { key: "Templates", label: "Templates" },
    { key: "MVP", label: "MVP" },
    { key: "Modules", label: "Modules" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO (Gemini-like) */}
      <div className="relative border-b border-slate-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-white to-white" />
          <div className="absolute left-1/2 top-[-120px] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-200/25 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-10 pb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Marketplace SEO-first
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Découvrez les meilleurs <span className="text-indigo-600">Micro-SaaS</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Une sélection curée de produits (templates, MVP, modules) listés automatiquement.
                Simple, rapide, optimisé pour scaler.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                  {metrics?.total ?? listings.length} produits
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                  {metrics?.niches ?? "—"} niches
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                  <Zap className="h-4 w-4 text-slate-500" />
                  {metrics?.stacks ?? "—"} stacks
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/articles"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Lire les articles
              </Link>
              <Link
                href="/marketplace"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Explorer
              </Link>
            </div>
          </div>

          {/* Featured block */}
          {featuredItem && searchQuery === "" && activeTab === "All" && (
            <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="relative md:col-span-7">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/70 via-white to-white" />
                  <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
                    {featuredItem.image ? (
                      <Image
                        src={featuredItem.image}
                        alt={featuredItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        Aperçu indisponible
                      </div>
                    )}
                  </div>

                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                    ★ Featured
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-slate-500">{featuredItem.category}</span>
                  </div>
                </div>

                <div className="p-6 md:col-span-5 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">
                      Recommended
                    </Badge>
                    {featuredItem.niche_category && <Badge>{featuredItem.niche_category}</Badge>}
                  </div>

                  <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
                    {featuredItem.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {featuredItem.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                    {featuredItem.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center gap-4">
                    <Link
                      href={`/marketplace/${featuredItem.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Découvrir {featuredItem.title} <ArrowRight size={16} />
                    </Link>
                    <span className="text-xs font-mono text-slate-500">{featuredItem.slug}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="sticky top-[65px] z-30 mb-8 bg-white/90 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Rechercher (nom, niche, stack, slug...)"
              />
            </div>

            {/* Tabs + Sort */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
              <div className="flex gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      activeTab === t.key
                        ? "bg-slate-900 text-white"
                        : "bg-transparent text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                  <Clock className="h-4 w-4 text-slate-500" />
                  Trier
                </div>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="recent">Récent</option>
                  <option value="popular">Populaire</option>
                  <option value="alpha">A → Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">
              {searchQuery ? `Résultats pour “${searchQuery}”` : "Tous les produits"}
            </div>
            <div className="text-xs text-slate-500">
              {filteredListings.length} résultat{filteredListings.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((item) => (
              <Link
                key={item.slug}
                href={`/marketplace/${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                      Aperçu indisponible
                    </div>
                  )}

                  {/* subtle top-right badge */}
                  <div className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur">
                    {iconForCategory(item.category)}
                    <span className="ml-1">{item.category}</span>
                  </div>

                  {/* hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                      Voir le détail
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-mono text-slate-400">
                      {item.slug}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.niche_category && <Badge>{item.niche_category}</Badge>}
                    {item.tags.slice(0, 2).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                      {item.stack.length > 3 && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          + {item.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-20 text-center">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Aucun produit trouvé</h3>
            <p className="mt-1 max-w-xs text-sm text-slate-600">
              Essayez un autre terme ou changez de catégorie.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
                setSortKey("recent");
              }}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
