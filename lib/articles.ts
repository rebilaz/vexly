import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  date?: string;
  updated_at?: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  cluster?: string;
  type?: string;
  pillar?: string | boolean;
  main_keyword?: string;
  search_intent?: string;
  angle?: string;
  priority?: number;
  canonical_url?: string;
  clusters_count?: number;
};

export type ArticleSection = {
  id?: string;
  heading?: string;
  body: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  slug: string;
  sections: ArticleSection[];
  content?: any[];
};

function hasSanityImageAsset(image: any) {
  return !!image?.asset?._ref || !!image?.asset?._id;
}

function extractPlainText(block: any): string {
  if (!block?.children || !Array.isArray(block.children)) return "";
  return block.children.map((child: any) => child?.text || "").join("");
}

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function portableTextToSections(content: any[] = []): ArticleSection[] {
  const sections: ArticleSection[] = [];
  let currentSection: ArticleSection = {
    id: "intro",
    heading: undefined,
    body: "",
  };

  const pushCurrentSection = () => {
    if (currentSection.body.trim().length > 0) {
      sections.push({
        ...currentSection,
        body: currentSection.body.trim(),
      });
    }
  };

  for (const block of content) {
    if (!block) continue;

    if (block._type === "block") {
      const style = block.style || "normal";
      const text = extractPlainText(block);

      if (style === "h2") {
        pushCurrentSection();
        currentSection = {
          id: text ? slugify(text) : undefined,
          heading: text || undefined,
          body: "",
        };
        continue;
      }

      if (style === "h3") {
        currentSection.body += `\n### ${text}\n\n`;
        continue;
      }

      if (style === "blockquote") {
        currentSection.body += `\n> ${text}\n\n`;
        continue;
      }

      if (block.listItem === "bullet") {
        currentSection.body += `- ${text}\n`;
        continue;
      }

      if (block.listItem === "number") {
        currentSection.body += `1. ${text}\n`;
        continue;
      }

      currentSection.body += `${text}\n\n`;
      continue;
    }

    if (block._type === "image" && hasSanityImageAsset(block)) {
      const imageUrl = urlFor(block).width(1400).url();
      if (imageUrl) {
        const alt = block?.alt || "";
        currentSection.body += `![${alt}](${imageUrl})\n\n`;
      }
    }
  }

  pushCurrentSection();

  return sections;
}

function mapSanityArticle(doc: any): Article {
  const coverImageUrl =
    hasSanityImageAsset(doc?.coverImage)
      ? urlFor(doc.coverImage).width(1600).height(900).url()
      : undefined;

  return {
    slug: doc.slug,
    frontmatter: {
      title: doc.title,
      subtitle: doc.subtitle,
      description: doc.description,
      date: doc.date,
      updated_at: doc._updatedAt,
      readingTime: doc.readingTime,
      tags: doc.tags || [],
      niche: doc.niche,
      coverImageUrl,
      cluster: doc.cluster,
      pillar: doc.pillar,
      main_keyword: doc.mainKeyword,
      search_intent: doc.searchIntent,
      priority: doc.priority,
      canonical_url: doc.canonicalUrl,
      type: doc.type,
    },
    sections: portableTextToSections(doc.content || []),
    content: doc.content || [],
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const slugs = await client.fetch(
    `*[_type == "article" && defined(slug.current)].slug.current`
  );

  return slugs || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await client.fetch(
    `
    *[_type == "article" && defined(slug.current) && slug.current == $slug][0]{
      title,
      subtitle,
      description,
      date,
      readingTime,
      tags,
      niche,
      cluster,
      pillar,
      mainKeyword,
      searchIntent,
      priority,
      canonicalUrl,
      type,
      coverImage,
      content,
      "slug": slug.current,
      _updatedAt
    }
    `,
    { slug }
  );

  if (!article) return null;

  return mapSanityArticle(article);
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await client.fetch(
    `
    *[_type == "article" && defined(slug.current)] | order(coalesce(date, _updatedAt) desc){
      title,
      subtitle,
      description,
      date,
      readingTime,
      tags,
      niche,
      cluster,
      pillar,
      mainKeyword,
      searchIntent,
      priority,
      canonicalUrl,
      type,
      coverImage,
      content,
      "slug": slug.current,
      _updatedAt
    }
    `
  );

  return (articles || []).map(mapSanityArticle);
}