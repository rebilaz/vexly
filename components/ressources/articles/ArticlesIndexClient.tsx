"use client";

import React, { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";

import ArticlesHero from "./ArticlesHero";
import ClusterBar, { type UiCluster } from "./ClusterBar";
import ArticlesGrid, { type EnrichedArticle } from "./ArticlesGrid";

function normalizeId(raw: string) {
  return (raw || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "autres";
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

export default function ArticlesIndexClient({ articles }: { articles: Article[] }) {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [query, setQuery] = useState("");

  const enriched: EnrichedArticle[] = useMemo(() => {
    return articles
      .map((article) => {
        const fm = article.frontmatter as any;
        const raw = fm?.cluster || fm?.niche || "Autres";
        return {
          ...article,
          _clusterId: normalizeId(String(raw)),
          _clusterLabel: toDisplayLabel(String(raw)),
        };
      })
      .sort((a, b) => {
        const da = (a.frontmatter as any).date ? new Date((a.frontmatter as any).date).getTime() : 0;
        const db = (b.frontmatter as any).date ? new Date((b.frontmatter as any).date).getTime() : 0;
        return db - da;
      });
  }, [articles]);

  const clusters: UiCluster[] = useMemo(() => {
    const map = new Map<string, UiCluster>();
    for (const a of enriched) {
      const ex = map.get(a._clusterId);
      if (ex) ex.count++;
      else map.set(a._clusterId, { id: a._clusterId, label: a._clusterLabel, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [enriched]);

  const filtered: EnrichedArticle[] = useMemo(() => {
    let list = enriched;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(({ frontmatter }) => {
        const fm = frontmatter as any;
        const haystack = [fm.title, fm.description, fm.niche, fm.cluster, ...(fm.tags || [])]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    if (selectedCluster !== "all") {
      list = list.filter((a) => a._clusterId === selectedCluster);
    }

    return list;
  }, [enriched, query, selectedCluster]);

  const showClusterBar = !query;
  const showLatest = !query && selectedCluster === "all";

  return (
    <div className="min-h-screen bg-white">
      <ArticlesHero
        total={enriched.length}
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          if (v) setSelectedCluster("all"); // reset cluster pendant recherche
        }}
      />

      {showClusterBar && (
        <ClusterBar clusters={clusters} selected={selectedCluster} onSelect={setSelectedCluster} />
      )}

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <ArticlesGrid
          articles={filtered}
          showLatest={showLatest}
          query={query}
          onClearQuery={() => setQuery("")}
        />
      </main>
    </div>
  );
}
