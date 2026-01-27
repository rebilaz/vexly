import fs from "fs";
import path from "path";
import type { Metadata } from "next";

import { ArticleLayout } from "@/components/ressources/articles/articles/ArticleLayout";
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

/**
 * ✅ Charge les slugs à EXCLURE du build statique
 * - On lit redirects.generated.json (généré par ta function Supabase)
 * - Format: [{ from: "/articles/<slug>", to: "/articles/<slug>" }, ...]
 */
function loadRedirectedSlugs(): Set<string> {
  try {
    const p = path.join(process.cwd(), "redirects.generated.json");
    if (!fs.existsSync(p)) return new Set();

    const raw = fs.readFileSync(p, "utf8");
    const arr = JSON.parse(raw);

    const slugs = new Set<string>();
    if (!Array.isArray(arr)) return slugs;

    for (const r of arr) {
      if (!r?.from || typeof r.from !== "string") continue;
      const m = r.from.match(/^\/articles\/(.+)$/);
      if (m?.[1]) slugs.add(m[1]);
    }
    return slugs;
  } catch {
    return new Set();
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const redirected = loadRedirectedSlugs();

  // ✅ On ne pré-rend pas les pages "mortes" (elles seront servies en 301 via next.config.js)
  return articles
    .filter((article) => !redirected.has(article.slug))
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Article introuvable" };

  const { frontmatter } = article;

  const isPillar = String((frontmatter as any)?.type || "") === "pillar";

  const canonical =
    (frontmatter.canonical_url && frontmatter.canonical_url.trim()) ||
    (isPillar ? `/${slug}` : `/articles/${slug}`);

  const canonicalAbs =
    typeof canonical === "string" && canonical.startsWith("http")
      ? canonical
      : `https://www.vexly.fr${canonical}`;

  // ✅ OG image déterministe (pas besoin de frontmatter)
  const ogImageAbs = `https://www.vexly.fr/images/articles/${slug}.webp`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: canonicalAbs,
      images: [
        {
          url: ogImageAbs,
          width: 1536,
          height: 1024,
          alt: frontmatter.title,
        },
      ],
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

  const isPillar = String((frontmatter as any)?.type || "") === "pillar";

  // ✅ pilier associé (priorité à frontmatter.pillar, fallback cluster)
  const pillarTitle =
    String((frontmatter as any)?.pillar ?? "").trim() ||
    String((frontmatter as any)?.pillar_title ?? "").trim() ||
    String(frontmatter.cluster ?? "").trim() ||
    undefined;

  const pillarSlug = pillarTitle ? toSlug(pillarTitle) : undefined;

  // ✅ date optionnelle
  const date =
    (frontmatter as any)?.date ||
    (frontmatter as any)?.updated_at ||
    undefined;

  return (
    <ArticleLayout
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      date={date}
      readingTime={frontmatter.readingTime}
      tags={frontmatter.tags}
      niche={frontmatter.niche}
      coverImageUrl={frontmatter.coverImageUrl} // ✅ injecté par lib/articles.ts
      backHref="/articles"
      sections={sections}
      pillar={
        !isPillar && pillarSlug && pillarTitle
          ? {
            title: pillarTitle,
            slug: pillarSlug,
            href: `/${pillarSlug}`, // ton pilier est à la racine
            breadcrumbBase: "/articles",
          }
          : undefined
      }
    />
  );
}
