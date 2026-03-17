import type { Metadata } from "next";

import { ArticleLayout } from "@/components/ressources/articles/articles/ArticleLayout";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

type Params = { slug: string };

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  const fm = article.frontmatter;

  const canonical =
    (fm.canonical_url && fm.canonical_url.trim()) || `/articles/${article.slug}`;

  const canonicalAbs =
    typeof canonical === "string" && canonical.startsWith("http")
      ? canonical
      : `https://www.vexly.fr${canonical}`;

  const ogImageAbs = fm.coverImageUrl
    ? fm.coverImageUrl.startsWith("http")
      ? fm.coverImageUrl
      : `https://www.vexly.fr${fm.coverImageUrl}`
    : undefined;

  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: canonicalAbs,
      images: ogImageAbs
        ? [
          {
            url: ogImageAbs,
            alt: fm.title,
          },
        ]
        : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <div>Article introuvable</div>;
  }

  const fm = article.frontmatter;

  return (
    <ArticleLayout
      title={fm.title}
      subtitle={fm.subtitle}
      date={fm.date ?? fm.updated_at}
      readingTime={fm.readingTime}
      tags={fm.tags || []}
      niche={fm.niche}
      coverImageUrl={fm.coverImageUrl}
      backHref="/articles"
      content={article.content || []}
    />
  );
}