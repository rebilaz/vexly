"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { EnrichedArticle } from "./ArticlesGrid";

/* =========================
   Helpers (inline)
========================= */
function getFm(a: EnrichedArticle) {
    return (a?.frontmatter ?? {}) as any;
}

function hrefFor(a: EnrichedArticle) {
    const fm = getFm(a);
    return String(fm?.type || "") === "pillar" ? `/${a.slug}` : `/articles/${a.slug}`;
}

function formatDateFr(value?: string) {
    if (!value) return null;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(d);
}

function resolveCover(a: EnrichedArticle): string | null {
    const fm = getFm(a);
    const raw = fm?.coverImageUrl ? String(fm.coverImageUrl).trim() : "";

    if (!raw) return null;

    // normalisation chemins public
    if (raw.startsWith("public/")) return raw.replace(/^public\//, "/");
    if (!raw.startsWith("/") && !raw.startsWith("http")) return `/${raw}`;
    return raw;
}

/* =========================
   Fallback deco
========================= */
function SoftFallback() {
    return (
        <>
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-indigo-400/18 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-violet-400/18 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/70 via-white to-violet-100/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/35" />
        </>
    );
}

/* =========================
   Safe <img> (CORRIGÉ)
========================= */
function SafeImg({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const [broken, setBroken] = useState(false);

    // ✅ IMPORTANT : Si l'URL change (ex: navigation), on reset l'état d'erreur
    useEffect(() => {
        setBroken(false);
    }, [src]);

    if (broken) return <SoftFallback />;

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className ?? "h-full w-full object-cover"}
                loading="lazy"
                onError={() => {
                    console.warn(`[SafeImg] Impossible de charger : ${src}`); // Debug pour toi
                    setBroken(true);
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/35" />
        </>
    );
}

/* =========================
   UI atoms
========================= */
function ArticleThumb({
    src,
    alt,
    size = "md",
}: {
    src?: string | null;
    alt: string;
    size?: "sm" | "md";
}) {
    const cls = size === "sm" ? "h-10 w-10 rounded-xl" : "h-16 w-16 rounded-2xl";

    return (
        <div className={`relative shrink-0 ${cls} overflow-hidden bg-slate-100 ring-1 ring-slate-200/70`}>
            {src ? <SafeImg src={src} alt={alt} /> : <SoftFallback />}
        </div>
    );
}

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wide">
            {String(children).toUpperCase()}
        </span>
    );
}

function MetaLine({ a }: { a: EnrichedArticle }) {
    const fm = getFm(a);
    const date = formatDateFr(fm?.date);
    const rt = fm?.readingTime;

    return (
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Chip>{a._clusterLabel || "Autres"}</Chip>
            {date ? <span>{date}</span> : null}
            {rt ? (
                <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {rt}
                </span>
            ) : null}
        </div>
    );
}

/* =========================
   Rows
========================= */
function Row({ a }: { a: EnrichedArticle }) {
    const fm = getFm(a);
    const title = fm?.title ?? a.slug;
    const desc = fm?.description ?? "";
    const cover = resolveCover(a);

    return (
        <Link href={hrefFor(a)} className="group flex gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
            <ArticleThumb src={cover} alt={title} size="md" />

            <div className="min-w-0 flex-1">
                <MetaLine a={a} />

                <h3 className="mt-2 text-base md:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {title}
                </h3>

                {desc ? (
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">{desc}</p>
                ) : null}
            </div>

            <div className="shrink-0 pt-1 text-slate-300 group-hover:text-indigo-600 transition-colors">
                <ArrowRight className="h-5 w-5" />
            </div>
        </Link>
    );
}

function SidebarMiniRow({ a }: { a: EnrichedArticle }) {
    const fm = getFm(a);
    const title = fm?.title ?? a.slug;
    const rt = fm?.readingTime;
    const cover = resolveCover(a);

    return (
        <Link
            href={hrefFor(a)}
            className="group flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-slate-50 transition"
        >
            <ArticleThumb src={cover} alt={title} size="sm" />
            <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {title}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">{rt ? rt : "Lire"}</div>
            </div>
        </Link>
    );
}

/* =========================
   Featured
========================= */
function Featured({ a }: { a: EnrichedArticle }) {
    const fm = getFm(a);
    const title = fm?.title ?? a.slug;
    const desc = fm?.description ?? "";
    const cover = resolveCover(a);

    return (
        <Link
            href={hrefFor(a)}
            className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-sm transition hover:shadow-lg hover:ring-slate-300"
        >
            <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-slate-100">
                {cover ? (
                    <div className="absolute inset-0">
                        <SafeImg src={cover} alt={title} className="h-full w-full object-cover" />
                    </div>
                ) : (
                    <SoftFallback />
                )}
            </div>

            <div className="p-6 md:p-7">
                <MetaLine a={a} />

                <h3 className="mt-3 text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {title}
                </h3>

                {desc ? <p className="mt-2 text-slate-600 leading-relaxed line-clamp-3">{desc}</p> : null}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold group-hover:bg-indigo-700 transition">
                    Lire <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}

/* =========================
   Component
========================= */
type Props = {
    query?: string;
    onQueryChange?: (v: string) => void;

    pillars?: EnrichedArticle[];
    sidebarArticles?: EnrichedArticle[];
    articles?: EnrichedArticle[];

    rightLimit?: number;

    featured?: EnrichedArticle | null;
};

export default function ArticlesFeed({
    query = "",
    onQueryChange,
    pillars = [],
    sidebarArticles = [],
    articles = [],
    rightLimit = 10,
    featured = null,
}: Props) {
    const list = (articles || []).slice(0, rightLimit);

    // featured auto : 1er article de la liste si non fourni
    const hero = featured ?? list[0] ?? null;
    const rest = hero ? list.filter((a) => a.slug !== hero.slug) : list;

    if (!pillars.length && !list.length && !sidebarArticles.length) return null;

    return (
        <section className="mt-16">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
                {/* ===== Sidebar ===== */}
                <aside className="lg:sticky lg:top-8 h-fit">
                    <div className="rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-sm p-5">
                        <div className="text-lg font-extrabold tracking-tight text-slate-900">Journal.</div>

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

                                <div className="mt-3 space-y-1">
                                    {pillars.map((p) => {
                                        const fm = getFm(p);
                                        return (
                                            <Link
                                                key={p.slug}
                                                href={hrefFor(p)}
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

                                <div className="mt-3 space-y-1">
                                    {sidebarArticles.map((a) => (
                                        <SidebarMiniRow key={`${a.slug}::mini`} a={a} />
                                    ))}
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
                            <p className="mt-2 text-slate-600">Explorations sur le design, le code et la culture.</p>
                        </div>

                        <Link
                            href="/articles"
                            className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-indigo-700 transition"
                        >
                            Voir les archives
                        </Link>
                    </div>

                    {/* Featured */}
                    {hero ? (
                        <div className="mt-8">
                            <Featured a={hero} />
                        </div>
                    ) : null}

                    {/* List */}
                    {!!rest.length && (
                        <div className="mt-8">
                            <div className="divide-y divide-slate-200/70">
                                {rest.map((a) => (
                                    <Row key={`${a.slug}::row`} a={a} />
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