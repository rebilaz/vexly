"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

import ArticlesHeroClient from "./ArticlesHero";
import ClusterBar, { type UiCluster } from "./ClusterBar";
import ArticlesGrid, { type EnrichedArticle } from "./ArticlesGrid";
import ArticlesFeed from "./ArticlesFeed";

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

function formatDateFr(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function matchesPillar(articleFm: any, pillar: EnrichedArticle) {
  const pFm = pillar.frontmatter as any;

  const pillarSlug = normalizeId(pillar.slug);
  const pillarTitle = normalizeId(String(pFm?.title ?? ""));
  const pillarName = normalizeId(String(pFm?.pillar ?? ""));

  const aPillar = normalizeId(String(articleFm?.pillar ?? articleFm?.pillar_title ?? ""));
  const aPillarSlug = normalizeId(String(articleFm?.pillar_slug ?? ""));

  if (aPillarSlug && aPillarSlug === pillarSlug) return true;
  if (aPillar && (aPillar === pillarTitle || aPillar === pillarName || aPillar === pillarSlug)) return true;

  return false;
}

export default function ArticlesIndexClient({ articles }: { articles: Article[] }) {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [query, setQuery] = useState("");

  const AROUND_LIMIT = 5;
  const FEED_RIGHT_LIMIT = 10;
  const SIDEBAR_PILLARS_LIMIT = 3;
  const SIDEBAR_ARTICLES_LIMIT = 6;

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
        const da = (a.frontmatter as any).date ? new Date((a.frontmatter as any).date).getTime() : 0;
        const db = (b.frontmatter as any).date ? new Date((b.frontmatter as any).date).getTime() : 0;
        return db - da;
      });
  }, [articles]);

  const pillars: EnrichedArticle[] = useMemo(() => {
    return enrichedAll
      .filter((a) => String((a.frontmatter as any)?.type || "") === "pillar")
      .sort((a, b) => {
        const ua = (a.frontmatter as any).updated_at ? new Date((a.frontmatter as any).updated_at).getTime() : 0;
        const ub = (b.frontmatter as any).updated_at ? new Date((b.frontmatter as any).updated_at).getTime() : 0;
        return ub - ua;
      });
  }, [enrichedAll]);

  const posts: EnrichedArticle[] = useMemo(() => {
    return enrichedAll.filter((a) => String((a.frontmatter as any)?.type || "") !== "pillar");
  }, [enrichedAll]);

  const clusters: UiCluster[] = useMemo(() => {
    const map = new Map<string, UiCluster>();
    for (const a of posts) {
      const ex = map.get(a._clusterId);
      if (ex) ex.count++;
      else map.set(a._clusterId, { id: a._clusterId, label: a._clusterLabel, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  const filteredPosts: EnrichedArticle[] = useMemo(() => {
    let list = posts;

    if (selectedCluster !== "all") list = list.filter((a) => a._clusterId === selectedCluster);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(({ frontmatter }) => {
        const fm = frontmatter as any;
        const haystack = [fm.title, fm.description, fm.niche, fm.cluster, fm.pillar, ...(fm.tags || [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    return list;
  }, [posts, query, selectedCluster]);

  const showClusterBar = !query;

  const spotlight = useMemo(() => {
    if (query) return null;
    if (!pillars.length) return null;

    const pillar = pillars[0];
    const related = posts.filter((a) => matchesPillar(a.frontmatter as any, pillar));

    const pFm = pillar.frontmatter as any;
    const niche = String(pFm?.niche ?? "").trim();
    const fallback = niche ? posts.filter((a) => String((a.frontmatter as any)?.niche ?? "").trim() === niche) : [];

    const items = (related.length ? related : fallback).slice(0, AROUND_LIMIT);
    return { pillar, items };
  }, [pillars, posts, query, AROUND_LIMIT]);

  const gridOnly: EnrichedArticle[] = useMemo(() => {
    if (spotlight?.items?.length) return spotlight.items.slice(0, AROUND_LIMIT);
    return filteredPosts.slice(0, AROUND_LIMIT);
  }, [spotlight, filteredPosts, AROUND_LIMIT]);

  const gridSlugs = useMemo(() => new Set(gridOnly.map((a) => a.slug)), [gridOnly]);

  const feedBase: EnrichedArticle[] = useMemo(() => {
    return filteredPosts.filter((a) => !gridSlugs.has(a.slug));
  }, [filteredPosts, gridSlugs]);

  const sidebarPillars = useMemo(() => pillars.slice(0, SIDEBAR_PILLARS_LIMIT), [pillars]);
  const sidebarArticles = useMemo(() => feedBase.slice(0, SIDEBAR_ARTICLES_LIMIT), [feedBase]);
  const feedRight = useMemo(() => feedBase.slice(0, FEED_RIGHT_LIMIT), [feedBase]);

  return (
    <div className="min-h-screen bg-white">
      <ArticlesHeroClient
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          if (v) setSelectedCluster("all");
        }}
      />

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* ===== ton spotlight existant ===== */}
        {spotlight && selectedCluster === "all" && (
          <section className="mb-12">
            {/* ... garde ton code spotlight identique ... */}
            {/* (je le laisse volontairement inchangé chez toi) */}
          </section>
        )}

        {/* GRID strictement autour du guide */}
        <ArticlesGrid
          articles={gridOnly}
          showLatest={false}
          guide={spotlight?.pillar ?? null}
          insertGuideAt={1} // milieu (0 gauche, 1 milieu, 2 droite)
          query={query}
          onClearQuery={() => setQuery("")}
        />


        {/* Feed layout journal */}
        <ArticlesFeed
          query={query}
          onQueryChange={(v) => {
            setQuery(v);
            if (v) setSelectedCluster("all");
          }}
          pillars={sidebarPillars}
          sidebarArticles={sidebarArticles}
          articles={feedRight}
          rightLimit={FEED_RIGHT_LIMIT}
        />
      </main>
    </div>
  );
}
