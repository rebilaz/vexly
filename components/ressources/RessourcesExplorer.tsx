"use client";

import React from "react";
import Link from "next/link";
import { Search, ArrowDown } from "lucide-react";

type Article = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  category?: string;
};

type Props = {
  title?: string;
  articles: Article[];
  externalQuery?: string;
  onQueryChange?: (v: string) => void;
};

const DEFAULT_PAGE_SIZE = 9;

// ✅ type guard : transforme (string | undefined)[] -> string[]
function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function normalize(s: string) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function formatDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getAllTopics(articles: Article[]): string[] {
  const set = new Set<string>();

  for (const a of articles) {
    (a.tags ?? []).filter(isNonEmptyString).forEach((t) => set.add(t));
    if (isNonEmptyString(a.niche)) set.add(a.niche);
    if (isNonEmptyString(a.category)) set.add(a.category);
  }

  return Array.from(set).slice(0, 12);
}

function matchesArticle(a: Article, q: string) {
  const hay = [
    a.title,
    a.description,
    a.niche,
    a.category,
    ...(a.tags ?? []),
  ]
    .filter(isNonEmptyString)
    .map(normalize)
    .join(" · ");

  return hay.includes(normalize(q));
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SideLink({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-xl px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className="group block rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm hover:shadow-md hover:shadow-slate-900/5 transition"
    >
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {a.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.coverImageUrl}
            alt={a.title}
            className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center text-slate-300">
            <span className="text-sm font-medium">No image</span>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-slate-900 line-clamp-2">
        {a.title}
      </h3>

      {a.description && (
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600 line-clamp-3">
          {a.description}
        </p>
      )}

      <div className="mt-5 text-sm text-slate-500">
        <span>{formatDate(a.date)}</span>
        {a.readingTime && <span> • {a.readingTime}</span>}
      </div>
    </Link>
  );
}

export default function RessourcesExplorer({
  title = "Explorer par sujet",
  articles,
  externalQuery,
  onQueryChange,
}: Props) {
  const topics = React.useMemo(() => getAllTopics(articles), [articles]);

  const [query, setQuery] = React.useState<string>(externalQuery ?? "");
  const [activeTopic, setActiveTopic] = React.useState<string>("Tout voir");
  const [visible, setVisible] = React.useState(DEFAULT_PAGE_SIZE);

  // ✅ un SEUL useEffect (pas doublon)
  React.useEffect(() => {
    setQuery(externalQuery ?? "");
  }, [externalQuery]);

  const effectiveSetQuery = (v: string) => {
    const next = String(v ?? "");
    setQuery(next);
    onQueryChange?.(next);
    setVisible(DEFAULT_PAGE_SIZE);
  };

  const filtered = React.useMemo(() => {
    let list = [...articles];

    if (activeTopic !== "Tout voir") {
      const t = normalize(activeTopic);

      list = list.filter((a) => {
        const pool = [
          ...(a.tags ?? []),
          a.niche,
          a.category,
        ]
          .filter(isNonEmptyString)
          .map(normalize);

        return pool.includes(t);
      });
    }

    if (query.trim()) {
      list = list.filter((a) => matchesArticle(a, query));
    }

    list.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

    return list;
  }, [articles, activeTopic, query]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-8 py-12 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {title}
              </p>

              <div className="mt-4 space-y-2">
                <SideLink
                  active={activeTopic === "Tout voir"}
                  onClick={() => {
                    setActiveTopic("Tout voir");
                    setVisible(DEFAULT_PAGE_SIZE);
                  }}
                >
                  Tout voir
                </SideLink>

                {topics.slice(0, 6).map((t) => (
                  <SideLink
                    key={t}
                    active={activeTopic === t}
                    onClick={() => {
                      setActiveTopic(t);
                      setVisible(DEFAULT_PAGE_SIZE);
                    }}
                  >
                    {t}
                  </SideLink>
                ))}
              </div>
            </div>

            {/* (optionnel) newsletter ici si tu veux */}
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                {filtered.length}
              </span>{" "}
              articles disponibles
              {activeTopic !== "Tout voir" && (
                <>
                  <span className="text-slate-400"> • </span>
                  <span className="font-medium text-slate-700">
                    {activeTopic}
                  </span>
                </>
              )}
            </div>

            <div className="relative w-full sm:max-w-md">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="size-4" />
              </div>
              <input
                value={query}
                onChange={(e) => effectiveSetQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Chip
              active={activeTopic === "Tout voir"}
              onClick={() => {
                setActiveTopic("Tout voir");
                setVisible(DEFAULT_PAGE_SIZE);
              }}
            >
              Tout voir
            </Chip>

            {topics.slice(0, 6).map((t) => (
              <Chip
                key={t}
                active={activeTopic === t}
                onClick={() => {
                  setActiveTopic(t);
                  setVisible(DEFAULT_PAGE_SIZE);
                }}
              >
                {t}
              </Chip>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Aucun résultat
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Essayez un autre mot-clé ou retirez les filtres.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTopic("Tout voir");
                  effectiveSetQuery("");
                }}
                className="mt-5 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Réinitialiser
              </button>
            </div>
          )}

          {canLoadMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + DEFAULT_PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Charger plus d&apos;articles
                <ArrowDown className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
