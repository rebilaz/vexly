"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Search } from "lucide-react";
import type { Article } from "@/lib/articles";

export type EnrichedArticle = Article & {
  _clusterId: string;
  _clusterLabel: string;
};

function formatDateFr(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function FeaturedArticle({ article }: { article: EnrichedArticle }) {
  const fm = article.frontmatter as any;

  return (
    <div className="mb-10">
      <Link
        href={`/articles/${article.slug}`}
        className="group block relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl transition-transform hover:scale-[1.005] duration-500"
      >
        <div className="absolute top-0 right-0 -mt-28 -mr-28 h-80 w-80 rounded-full bg-indigo-500 blur-3xl opacity-15 group-hover:opacity-25 transition-opacity" />
        <div className="absolute bottom-0 left-0 -mb-28 -ml-28 h-80 w-80 rounded-full bg-purple-500 blur-3xl opacity-15 group-hover:opacity-25 transition-opacity" />

        <div className="relative z-10 px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                {fm.title}
              </h2>

              {fm.description && (
                <p className="mt-5 text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  {fm.description}
                </p>
              )}

              <div className="mt-8 flex items-center gap-4 text-sm font-medium text-slate-400">
                {fm.date && <span className="text-white/90">{formatDateFr(fm.date)}</span>}
                {fm.readingTime && <span>• {fm.readingTime}</span>}
              </div>
            </div>

            <div className="flex lg:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-2.5 text-sm font-semibold transition group-hover:bg-indigo-50">
                Lire l&apos;article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ArticleCard({ article }: { article: EnrichedArticle }) {
  const fm = article.frontmatter as any;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block h-full rounded-2xl bg-white ring-1 ring-slate-200/70 transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:ring-slate-300"
    >
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {article._clusterLabel}
          </span>
          {fm.date && <span className="text-xs text-slate-400">{formatDateFr(fm.date)}</span>}
        </div>

        <h3 className="text-xl font-extrabold leading-tight text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
          {fm.title}
        </h3>

        {fm.description && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-1">
            {fm.description}
          </p>
        )}

        <div className="mt-6 flex items-center gap-2 border-t border-slate-200/60 pt-4 text-xs font-medium text-slate-500">
          {fm.readingTime ? (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {fm.readingTime}
            </span>
          ) : (
            <span>Lire</span>
          )}

          <ArrowRight className="ml-auto h-4 h-4 text-slate-300" />
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesGrid({
  articles,
  showLatest = false,
  query,
}: {
  articles: EnrichedArticle[];
  showLatest?: boolean;
  query: string;
  selectedCluster: string; // gardé pour compat (pas utilisé)
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const { featured, rest } = useMemo(() => {
    const featured = showLatest ? articles[0] : null;
    const rest = showLatest ? articles.slice(1) : articles;
    return { featured, rest };
  }, [articles, showLatest]);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.92;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-slate-50 p-4 mb-4">
          <Search className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Aucun résultat</h3>
        <p className="text-slate-500">Essayez de reformuler votre recherche.</p>
        {!!query && (
          <a href="/articles" className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Revenir à la liste
          </a>
        )}
      </div>
    );
  }

  return (
    <>
      {featured && <FeaturedArticle article={featured} />}

      <section className="relative mt-6">
        <button
          onClick={() => scroll("left")}
          aria-label="Articles précédents"
          className="group absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-6 w-6 text-slate-400 transition-colors group-hover:text-indigo-600 group-active:text-indigo-700" />
          <span className="absolute inset-0 rounded-full ring-0 group-active:ring-4 ring-indigo-500/20 transition" />
        </button>

        <button
          onClick={() => scroll("right")}
          aria-label="Articles suivants"
          className="group absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowRight className="h-6 w-6 text-slate-400 transition-colors group-hover:text-indigo-600 group-active:text-indigo-700" />
          <span className="absolute inset-0 rounded-full ring-0 group-active:ring-4 ring-indigo-500/20 transition" />
        </button>

        <div ref={carouselRef} className="flex gap-6 overflow-x-hidden scroll-smooth px-2">
          {rest.map((a) => (
            <div key={a.slug} className="min-w-[85%] sm:min-w-[48%] lg:min-w-[32%]">
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
