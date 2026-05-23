"use client";

import React, { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";
import type { ArticlesContent } from "@/content/article";
import ArticlesHeroClient from "./ArticlesHero";
import ArticlesGrid, { type EnrichedArticle } from "./ArticlesGrid";

const ARTICLES_LIMIT = 6;

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
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function resolveCategoryValue(category: any) {
  if (!category) return "";

  if (typeof category === "string") return category;

  if (typeof category === "object") {
    return category.title || category.slug || "";
  }

  return "";
}

function matchesQuery(article: EnrichedArticle, query: string) {
  const fm = article.frontmatter as any;
  const category = resolveCategoryValue(fm?.category);

  const haystack = [
    fm?.title,
    fm?.subtitle,
    fm?.description,
    fm?.searchIntent,
    category,
  ]
    .filter(Boolean)
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

  const enrichedArticles: EnrichedArticle[] = useMemo(() => {
    return (articles || [])
      .map((article) => {
        const fm = article.frontmatter as any;
        const rawCategory = resolveCategoryValue(fm?.category) || "Autres";

        return {
          ...article,
          _categoryId: normalizeId(rawCategory) || "autres",
          _categoryLabel: toDisplayLabel(rawCategory),
        };
      })
      .sort((a, b) => {
        const da = (a.frontmatter as any)?.date
          ? new Date((a.frontmatter as any).date).getTime()
          : 0;
        const db = (b.frontmatter as any)?.date
          ? new Date((b.frontmatter as any).date).getTime()
          : 0;

        return db - da;
      });
  }, [articles]);

  const visibleArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = !q
      ? enrichedArticles
      : enrichedArticles.filter((article) => matchesQuery(article, q));

    return filtered.slice(0, ARTICLES_LIMIT);
  }, [enrichedArticles, query]);

  return (
    <div className="min-h-screen bg-white">
      <ArticlesHeroClient
        hero={content.hero}
        query={query}
        onQueryChange={setQuery}
      />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <ArticlesGrid
          articles={visibleArticles}
          query={query}
          onClearQuery={() => setQuery("")}
        />
      </main>
    </div>
  );
}