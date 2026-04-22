import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ArticleCategory = {
  title: string;
  slug: string;
};

export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  updatedAt?: string;
  searchIntent?: string;
  category?: ArticleCategory | null;
  coverImageUrl?: string;
  coverImageAlt?: string;
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

type SanityImage = SanityImageSource & {
  alt?: string;
};

type SanityArticle = {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  searchIntent?: string;
  coverImage?: SanityImage;
  content?: any[];
  slug: string;
  _updatedAt?: string;
  category?: {
    title?: string;
    slug?: string;
  } | null;
};

function hasSanityImageAsset(
  image: SanityImage | null | undefined
): image is SanityImage {
  return !!(image as any)?.asset?._ref || !!(image as any)?.asset?._id;
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

      if (style === "h4") {
        currentSection.body += `\n#### ${text}\n\n`;
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

    if (block._type === "image" && hasSanityImageAsset(block as SanityImage)) {
      const imageUrl = urlFor(block as SanityImage).width(1400).url();

      if (imageUrl) {
        const alt = block?.alt || "";
        currentSection.body += `![${alt}](${imageUrl})\n\n`;
      }
    }
  }

  pushCurrentSection();

  return sections;
}

function mapSanityArticle(doc: SanityArticle): Article {
  const coverImage = doc.coverImage;

  const coverImageUrl =
    coverImage && hasSanityImageAsset(coverImage)
      ? urlFor(coverImage).width(1600).height(900).url()
      : undefined;

  return {
    slug: doc.slug,
    frontmatter: {
      title: doc.title,
      subtitle: doc.subtitle ?? "",
      description: doc.description ?? "",
      date: doc.date ?? "",
      updatedAt: doc._updatedAt,
      searchIntent: doc.searchIntent ?? "",
      category: doc.category
        ? {
          title: doc.category.title ?? "",
          slug: doc.category.slug ?? "",
        }
        : null,
      coverImageUrl,
      coverImageAlt: doc.coverImage?.alt ?? "",
    },
    sections: portableTextToSections(doc.content || []),
    content: doc.content || [],
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const slugs = await client.fetch<string[]>(
    `*[_type == "article" && defined(slug.current)].slug.current`
  );

  return slugs || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await client.fetch<SanityArticle | null>(
    `
    *[_type == "article" && defined(slug.current) && slug.current == $slug][0]{
      title,
      subtitle,
      description,
      date,
      searchIntent,
      coverImage{
        asset,
        alt
      },
      content,
      "slug": slug.current,
      _updatedAt,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    { slug }
  );

  if (!article) return null;

  return mapSanityArticle(article);
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await client.fetch<SanityArticle[]>(
    `
    *[_type == "article" && defined(slug.current)] | order(coalesce(date, _updatedAt) desc){
      title,
      subtitle,
      description,
      date,
      searchIntent,
      coverImage{
        asset,
        alt
      },
      content,
      "slug": slug.current,
      _updatedAt,
      category->{
        title,
        "slug": slug.current
      }
    }
    `
  );

  return (articles || []).map(mapSanityArticle);
}