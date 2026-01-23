"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { Article } from "@/lib/articles";

export type EnrichedArticle = Article & {
  _clusterId: string;
  _clusterLabel: string;
};

/* =========================
   Helpers
========================= */

// ✅ AJOUT : Fonction essentielle pour récupérer l'image propre
function resolveCover(article: EnrichedArticle): string | null {
  const fm = article.frontmatter as any;
  const raw = fm?.coverImageUrl ? String(fm.coverImageUrl).trim() : "";

  if (!raw) return null;

  // Nettoyage des chemins (ex: retire "public/" si présent, ajoute "/" au début)
  if (raw.startsWith("public/")) return raw.replace(/^public\//, "/");
  if (!raw.startsWith("/") && !raw.startsWith("http")) return `/${raw}`;
  return raw;
}

function formatDateFr(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function hrefFor(a: EnrichedArticle) {
  const fm = a.frontmatter as any;
  // Distinction URL Pilier vs Article standard
  return String(fm?.type || "") === "pillar" ? `/${a.slug}` : `/articles/${a.slug}`;
}

/* =========================
   UI Atoms
========================= */

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "red";
}) {
  const cls =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10"
      : tone === "red"
        ? "bg-rose-50 text-rose-700 ring-1 ring-rose-700/10"
        : "bg-slate-100 text-slate-700 ring-1 ring-slate-200/70";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${cls}`}>
      {children}
    </span>
  );
}

// ✅ MODIFICATION : Gestion de l'affichage Image OU Déco abstraite
function CardArt({
  variant,
  src,
  alt
}: {
  variant: "hero" | "wide" | "small",
  src?: string | null,
  alt?: string
}) {
  const h =
    variant === "hero"
      ? "h-[230px] md:h-[260px] lg:h-[300px]"
      : variant === "wide"
        ? "h-[220px] md:h-[240px]"
        : "h-[150px]";

  return (
    <div className={`relative overflow-hidden rounded-t-3xl bg-slate-100 ${h}`}>
      {src ? (
        // Cas 1: L'image existe -> On l'affiche
        <img
          src={src}
          alt={alt || "Illustration"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        // Cas 2: Pas d'image -> On affiche le design abstrait
        <>
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/70" />
          <div className="absolute left-6 right-6 top-6 h-px bg-slate-200/60" />
          <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-slate-200/70" />
        </>
      )}
    </div>
  );
}

/* =========================
   Guide Card
========================= */

function GuideCard({
  article,
  variant,
}: {
  article: EnrichedArticle;
  variant: "hero" | "wide" | "small";
}) {
  const fm = article.frontmatter as any;

  const title = fm?.title ?? article.slug;
  const desc = fm?.description ?? "";
  const date = fm?.date ? formatDateFr(fm.date) : null;
  const readingTime = fm?.readingTime ?? null;

  // ✅ On récupère l'URL propre de l'image
  const cover = resolveCover(article);

  const isHero = variant === "hero";
  const isWide = variant === "wide";

  return (
    <Link
      href={hrefFor(article)}
      className="group block h-full overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-sm transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:ring-slate-300"
    >
      {/* ✅ On passe l'image au composant visuel */}
      <CardArt variant={variant} src={cover} alt={title} />

      <div className={isHero ? "p-7 md:p-8" : isWide ? "p-7" : "p-6"}>
        <div className="min-w-0">
          {/* Tags & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{article._clusterLabel}</Badge>
            {fm?.level ? (
              <Badge tone={String(fm.level).toLowerCase().includes("deb") ? "green" : "red"}>
                {fm.level}
              </Badge>
            ) : null}
            {String(fm?.type || "") === "pillar" ? <Badge tone="neutral">Guide</Badge> : null}
          </div>

          {/* Titre */}
          <h3
            className={`mt-4 font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors ${isHero
              ? "text-2xl md:text-3xl lg:text-4xl leading-[1.06]"
              : isWide
                ? "text-xl md:text-2xl leading-tight"
                : "text-lg md:text-xl leading-tight"
              }`}
          >
            {title}
          </h3>

          {/* Description */}
          {desc ? (
            <p
              className={`mt-3 text-slate-600 leading-relaxed ${isHero
                ? "text-base md:text-lg line-clamp-3 max-w-2xl"
                : isWide
                  ? "text-sm md:text-base line-clamp-3"
                  : "text-sm line-clamp-2"
                }`}
            >
              {desc}
            </p>
          ) : null}
        </div>

        {/* Footer (Date & CTA) */}
        <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
          {date ? <span className="font-medium">{date}</span> : null}
          {date && readingTime ? <span className="opacity-60">•</span> : null}

          {readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime}
            </span>
          ) : null}

          <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold transition group-hover:bg-indigo-700">
            Lire <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================
   Main Component
========================= */

export default function ArticlesGrid({
  articles,
  showLatest = false,
  query = "",
  onClearQuery,

  guide = null,
  insertGuideAt = 1,
}: {
  articles: EnrichedArticle[];
  showLatest?: boolean;
  query?: string;
  onClearQuery?: () => void;

  guide?: EnrichedArticle | null;
  insertGuideAt?: number;
}) {
  // Séparation : Featured / Second / Rest
  const { featured, second, rest } = useMemo(() => {
    if (!showLatest) return { featured: null, second: null, rest: articles };
    const featured = articles[0] ?? null;
    const second = articles[1] ?? null;
    const rest = articles.slice(2);
    return { featured, second, rest };
  }, [articles, showLatest]);

  // Insertion du Guide dans la liste
  const cards = useMemo(() => {
    const base = showLatest ? rest : articles;
    if (!guide) return base;

    const withoutDup = base.filter((a) => a.slug !== guide.slug);
    const idx = Math.max(0, Math.min(insertGuideAt, withoutDup.length));
    const out = [...withoutDup];
    out.splice(idx, 0, guide);
    return out;
  }, [articles, rest, guide, insertGuideAt, showLatest]);

  const guideKey = guide ? `${guide.slug}::${String((guide.frontmatter as any)?.type || "")}` : null;

  // État vide
  if (articles.length === 0 && !guide) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-slate-50 p-4 mb-4">
          <Search className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Aucun résultat</h3>
        <p className="text-slate-500">Essayez de reformuler votre recherche.</p>

        {!!query && onClearQuery && (
          <button
            onClick={onClearQuery}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Effacer la recherche
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Section Héroique (2 premières cartes) */}
      {(featured || second) && (
        <section className="grid gap-6 lg:grid-cols-12">
          {featured && (
            <div className="lg:col-span-8">
              <GuideCard article={featured} variant="hero" />
            </div>
          )}
          {second && (
            <div className="lg:col-span-4">
              <GuideCard article={second} variant="wide" />
            </div>
          )}
        </section>
      )}

      {/* Grille Principale */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {cards.map((a) => {
          const aKey = `${a.slug}::${String((a.frontmatter as any)?.type || "")}`;
          const isGuide = !!guideKey && aKey === guideKey;

          return (
            <div key={aKey} className={isGuide ? "lg:col-span-2" : ""}>
              <GuideCard article={a} variant={isGuide ? "wide" : "small"} />
            </div>
          );
        })}
      </section>
    </div>
  );
}