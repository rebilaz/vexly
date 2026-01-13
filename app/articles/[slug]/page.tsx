import type { Metadata } from "next";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

type Params = { slug: string };

// ✅ slugify simple (même logique que tes fonctions)
function toSlug(input: string) {
  return String(input ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .trim();
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Article introuvable" };

  const { frontmatter } = article;

  const canonical =
    (frontmatter.canonical_url && frontmatter.canonical_url.trim()) ||
    `/articles/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url:
        typeof canonical === "string" && canonical.startsWith("http")
          ? canonical
          : `https://www.vexly.fr${canonical}`,
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

  if (!article) return <div>Article introuvable</div>;

  const { frontmatter, sections } = article;

  // ✅ On utilise cluster comme “nom du pilier”
  const pillarTitle = String(frontmatter.cluster ?? "").trim() || undefined;
  const pillarSlug = pillarTitle ? toSlug(pillarTitle) : undefined;

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
      // ✅ NEW
      pillar={
        pillarSlug && pillarTitle
          ? {
            title: pillarTitle,
            slug: pillarSlug,
            href: `/${pillarSlug}`,          // ton pilier est à la racine
            breadcrumbBase: "/articles",     // pour afficher /articles/...
          }
          : undefined
      }
    />
  );
}
