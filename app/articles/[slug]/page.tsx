import type { Metadata } from "next";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

type Params = { slug: string };

// Génère toutes les routes statiques à partir des .md
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// SEO
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params; // 👈 important
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  const { frontmatter } = article;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params; // 👈 important
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <div>Article introuvable</div>;
  }

  const { frontmatter, sections } = article;

  return (
    <ArticleLayout
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      date={frontmatter.date}
      readingTime={frontmatter.readingTime}
      tags={frontmatter.tags}
      niche={frontmatter.niche}
      coverImageUrl={frontmatter.coverImageUrl}
      backHref="/articles"
      sections={sections}
    />
  );
}
