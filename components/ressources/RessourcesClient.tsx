"use client";

import React from "react";
import type { Article } from "@/lib/articles";

import RessourcesHero from "./RessourcesHero";
import RessourcesPaths from "./RessourcesPaths";
import RessourcesFeatured from "./RessourcesFeatured";
import RessourcesExplorer from "./RessourcesExplorer";
import RessourcesNewsletter from "./RessourcesNewsletter";

export default function RessourcesClient({
  latestArticles,
}: {
  latestArticles: Article[];
}) {
  const [query, setQuery] = React.useState("");

  const handleQueryChange = (v: string) => setQuery(v);

  const explorerArticles = React.useMemo(
    () =>
      latestArticles.map((a) => ({
        slug: a.slug,
        title: a.frontmatter.title,
        description: a.frontmatter.description,
        date: a.frontmatter.date,
        readingTime: a.frontmatter.readingTime,
        tags: a.frontmatter.tags ?? [],
        niche: a.frontmatter.niche,
        coverImageUrl: a.frontmatter.coverImageUrl,
      })),
    [latestArticles]
  );

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <RessourcesHero query={query} onQueryChange={handleQueryChange} />

        <RessourcesPaths />

        <RessourcesFeatured
          items={latestArticles.slice(0, 3).map((article) => ({
            slug: article.slug,
            title: article.frontmatter.title,
            description: article.frontmatter.description,
            date: article.frontmatter.date,
            readingTime: article.frontmatter.readingTime,
            coverImageUrl: article.frontmatter.coverImageUrl,
            tag: article.frontmatter.tags?.[0],
          }))}
        />

        <RessourcesExplorer
          articles={explorerArticles}
          externalQuery={query}
          onQueryChange={handleQueryChange}
        />
      </div>
    </main>
  );
}
