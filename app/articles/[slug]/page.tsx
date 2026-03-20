import type { Metadata } from "next";

import { ArticleLayout } from "@/components/ressources/articles/articles/ArticleLayout";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/articles";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();

  return slugs.map((slug) => ({
    slug,
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
  const canonicalAbs = `https://www.vexly.fr/articles/${article.slug}`;

  const ogImageAbs = fm.coverImageUrl
    ? fm.coverImageUrl.startsWith("http")
      ? fm.coverImageUrl
      : `https://www.vexly.fr${fm.coverImageUrl}`
    : undefined;

  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: canonicalAbs,
    },
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
      date={fm.date ?? fm.updatedAt}
      readingTime={fm.readingTime}
      tags={fm.tags || []}
      niche={fm.niche}
      coverImageUrl={fm.coverImageUrl}
      backHref="/articles"
      content={article.content || []}
    />
  );
}