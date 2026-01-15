"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { EnrichedArticle } from "./ArticlesGrid";

function formatDateFr(value: string) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(d);
}

function Cover() {
    return (
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 bg-white shadow-sm">
            <div className="relative h-[260px] md:h-[320px] lg:h-[380px]">
                <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl" />
                <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/15 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/80" />

                <div className="absolute left-1/2 top-1/2 w-[78%] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-900/90 shadow-2xl ring-1 ring-black/10">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        <span className="ml-3 text-xs font-medium text-white/70">Journal</span>
                    </div>
                    <div className="p-5">
                        <div className="h-3 w-44 rounded bg-white/10" />
                        <div className="mt-4 space-y-2">
                            <div className="h-3 w-[92%] rounded bg-white/10" />
                            <div className="h-3 w-[78%] rounded bg-white/10" />
                            <div className="h-3 w-[86%] rounded bg-white/10" />
                            <div className="h-3 w-[70%] rounded bg-white/10" />
                        </div>
                        <div className="mt-6 h-8 w-[56%] rounded bg-indigo-400/15 ring-1 ring-indigo-300/20" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row({ a }: { a: EnrichedArticle }) {
    const fm = a.frontmatter as any;

    return (
        <Link
            href={`/articles/${a.slug}`}
            className="group block rounded-2xl px-2 py-3 transition hover:bg-slate-50"
        >
            <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-2.5 py-1 text-[11px] font-semibold tracking-wide">
                            {(a._clusterLabel || "Autres").toUpperCase()}
                        </span>
                        {fm?.date ? <span>{formatDateFr(fm.date)}</span> : null}
                        {fm?.readingTime ? (
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                {fm.readingTime}
                            </span>
                        ) : null}
                    </div>

                    <h3 className="mt-2 text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                        {fm?.title ?? a.slug}
                    </h3>

                    {fm?.description ? (
                        <p className="mt-2 text-slate-600 leading-relaxed line-clamp-2">
                            {fm.description}
                        </p>
                    ) : null}
                </div>

                <div className="pt-1 shrink-0 text-slate-300 group-hover:text-indigo-600 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                </div>
            </div>
        </Link>
    );
}

type Props = {
    query?: string;
    onQueryChange?: (v: string) => void;

    // ✅ defaults pour éviter undefined.length
    pillars?: EnrichedArticle[];
    sidebarArticles?: EnrichedArticle[];
    articles?: EnrichedArticle[];

    rightLimit?: number;
};

export default function ArticlesFeed({
    query = "",
    onQueryChange,
    pillars = [],
    sidebarArticles = [],
    articles = [],
    rightLimit = 10,
}: Props) {
    const list = (articles || []).slice(0, rightLimit);

    // ✅ safe
    if (!pillars.length && !list.length && !sidebarArticles.length) return null;

    return (
        <section className="mt-16">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
                {/* ===== Sidebar ===== */}
                <aside className="lg:sticky lg:top-8 h-fit">
                    <div className="rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-sm p-5">
                        <div className="text-lg font-extrabold tracking-tight text-slate-900">
                            Journal.
                        </div>

                        {/* Search */}
                        <div className="mt-4">
                            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 ring-1 ring-slate-200/70 px-3 py-2">
                                <Search className="h-4 w-4 text-slate-400" />
                                <input
                                    value={query}
                                    onChange={(e) => onQueryChange?.(e.target.value)}
                                    placeholder="Rechercher..."
                                    className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Quick nav */}
                        <div className="mt-4 space-y-1">
                            <Link
                                href="/articles"
                                className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                                Vue d&apos;ensemble
                            </Link>

                            <button
                                type="button"
                                className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                                Sauvegardés
                            </button>
                        </div>

                        {/* Pillars */}
                        {!!pillars.length && (
                            <div className="mt-6">
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Guides piliers
                                </div>

                                <div className="mt-3 space-y-2">
                                    {pillars.map((p) => {
                                        const fm = p.frontmatter as any;
                                        return (
                                            <Link
                                                key={p.slug}
                                                href={`/${p.slug}`}
                                                className="group block rounded-2xl px-3 py-2 hover:bg-slate-50 transition"
                                            >
                                                <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                                                    {fm?.title ?? p.slug}
                                                </div>
                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    {typeof fm?.clusters_count === "number"
                                                        ? `${fm.clusters_count} articles`
                                                        : "Guide"}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Articles (mini list) */}
                        {!!sidebarArticles.length && (
                            <div className="mt-6">
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Articles
                                </div>

                                <div className="mt-3 space-y-2">
                                    {sidebarArticles.map((a) => {
                                        const fm = a.frontmatter as any;
                                        return (
                                            <Link
                                                key={a.slug}
                                                href={`/articles/${a.slug}`}
                                                className="group block rounded-2xl px-3 py-2 hover:bg-slate-50 transition"
                                            >
                                                <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                                                    {fm?.title ?? a.slug}
                                                </div>
                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    {fm?.readingTime ? fm.readingTime : "Lire"}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ===== Main ===== */}
                <main className="min-w-0">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                                Derniers Articles
                            </h2>
                            <p className="mt-2 text-slate-600">
                                Explorations sur le design, le code et la culture.
                            </p>
                        </div>

                        <Link
                            href="/articles"
                            className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-indigo-700 transition"
                        >
                            Voir les archives
                        </Link>
                    </div>

                    <div className="mt-8">
                        <Cover />
                    </div>

                    {!!list.length && (
                        <div className="mt-8">
                            <div className="divide-y divide-slate-200/70">
                                {list.map((a) => (
                                    <Row key={a.slug} a={a} />
                                ))}
                            </div>

                            <div className="mt-6">
                                <Link
                                    href="/articles"
                                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition"
                                >
                                    Voir plus <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
}
