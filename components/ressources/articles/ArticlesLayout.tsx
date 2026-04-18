"use client";

import React, { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";
import type { ArticlesContent } from "@/content/article";
import ArticlesHeroClient from "./ArticlesHero";
import ArticlesGrid, { type EnrichedArticle } from "./ArticlesGrid";

const AROUND_LIMIT = 6;

function normalizeId(raw: string) {
  return (raw || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toDisplayLabel(raw: string) {
  const s = (raw || "").trim();
  if (!s) return "Autres";

  const map: Record<string, string> = {
    ai: "IA & Tech",
    ia: "IA & Tech",
    automation: "Automatisation",
    saas: "SaaS & Produit",
    business: "Business",
    growth: "Growth",
  };

  const key = s.toLowerCase();
  return map[key] ?? s.charAt(0).toUpperCase() + s.slice(1);
}

function isPillar(article: EnrichedArticle) {
  return String((article.frontmatter as any)?.type || "") === "pillar";
}

function matchesPillar(articleFm: any, pillar: EnrichedArticle) {
  const pFm = pillar.frontmatter as any;

  const pillarSlug = normalizeId(pillar.slug);
  const pillarTitle = normalizeId(String(pFm?.title ?? ""));
  const pillarName = normalizeId(String(pFm?.pillar ?? ""));

  const aPillar = normalizeId(
    String(articleFm?.pillar ?? articleFm?.pillar_title ?? "")
  );
  const aPillarSlug = normalizeId(String(articleFm?.pillar_slug ?? ""));

  if (aPillarSlug && aPillarSlug === pillarSlug) return true;

  if (
    aPillar &&
    (aPillar === pillarTitle ||
      aPillar === pillarName ||
      aPillar === pillarSlug)
  ) {
    return true;
  }

  return false;
}

function matchesQuery(article: EnrichedArticle, query: string) {
  const fm = article.frontmatter as any;

  const haystack = [
    fm.title,
    fm.description,
    fm.niche,
    fm.cluster,
    fm.pillar,
    ...(fm.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export default function ArticlesIndexClient({
  articles,
  content,
}: {
  articles: Article[];
  content: ArticlesContent;
}) {
  const [query, setQuery] = useState("");

  const enrichedAll: EnrichedArticle[] = useMemo(() => {
    return (articles || [])
      .map((article) => {
        const fm = article.frontmatter as any;
        const raw = fm?.cluster || fm?.niche || "Autres";

        return {
          ...article,
          _clusterId: normalizeId(String(raw)) || "autres",
          _clusterLabel: toDisplayLabel(String(raw)),
        };
      })
      .sort((a, b) => {
        const da = (a.frontmatter as any).date
          ? new Date((a.frontmatter as any).date).getTime()
          : 0;
        const db = (b.frontmatter as any).date
          ? new Date((b.frontmatter as any).date).getTime()
          : 0;
        return db - da;
      });
  }, [articles]);

  const pillars = useMemo(() => {
    return enrichedAll
      .filter(isPillar)
      .sort((a, b) => {
        const ua = (a.frontmatter as any).updated_at
          ? new Date((a.frontmatter as any).updated_at).getTime()
          : 0;
        const ub = (b.frontmatter as any).updated_at
          ? new Date((b.frontmatter as any).updated_at).getTime()
          : 0;
        return ub - ua;
      });
  }, [enrichedAll]);

  const posts = useMemo(() => {
    return enrichedAll.filter((a) => !isPillar(a));
  }, [enrichedAll]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((article) => matchesQuery(article, q));
  }, [posts, query]);

  const spotlight = useMemo(() => {
    if (query.trim()) return null;
    if (!pillars.length) return null;

    const pillar = pillars[0];

    const related = posts.filter((a) =>
      matchesPillar(a.frontmatter as any, pillar)
    );

    const pFm = pillar.frontmatter as any;
    const niche = String(pFm?.niche ?? "").trim();

    const fallback = niche
      ? posts.filter(
        (a) => String((a.frontmatter as any)?.niche ?? "").trim() === niche
      )
      : [];

    const items = (related.length ? related : fallback).slice(
      0,
      AROUND_LIMIT - 1
    );

    return { pillar, items };
  }, [pillars, posts, query]);

  const gridOnly = useMemo(() => {
    if (spotlight?.items?.length) return spotlight.items;
    return filteredPosts.slice(0, AROUND_LIMIT);
  }, [spotlight, filteredPosts]);

  return (
    <div className="min-h-screen bg-white">
      <ArticlesHeroClient
        hero={content.hero}
        query={query}
        onQueryChange={setQuery}
      />

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <ArticlesGrid
          articles={gridOnly}
          guide={spotlight?.pillar ?? null}
          insertGuideAt={1}
          query={query}
          onClearQuery={() => setQuery("")}
        />
      </main>
    </div>
  );
}