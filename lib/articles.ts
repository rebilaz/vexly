import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { ArticleSection } from "@/components/articles/ArticleLayout";

const articlesDir = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  slug: string;          // slug "de base" (sans date)
  description?: string;
  date: string;          // YYYY-MM-DD
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  slug: string;          // slug POUR L’URL (slug + date)
  sections: ArticleSection[];
};

function getAllArticleFiles() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter((file) => file.endsWith(".md"));
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Découpe un markdown en sections à chaque "## "
function splitMarkdownIntoSections(content: string): ArticleSection[] {
  const blocks = content.split(/\n(?=##\s+)/);
  const sections: ArticleSection[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split("\n");
    let heading: string | undefined;
    let bodyLines: string[] = [];

    if (index === 0) {
      const h1Index = lines.findIndex((l) => l.trim().startsWith("# "));
      if (h1Index !== -1) {
        bodyLines = lines.slice(h1Index + 1);
      } else {
        bodyLines = lines;
      }

      sections.push({
        id: "intro",
        heading: heading,
        body: bodyLines.join("\n").trim(),
      });
    } else {
      const firstLine = lines[0].trim();
      if (firstLine.startsWith("##")) {
        heading = firstLine.replace(/^##\s*/, "").trim();
        bodyLines = lines.slice(1);
      } else {
        bodyLines = lines;
      }

      sections.push({
        id: heading ? slugify(heading) : undefined,
        heading,
        body: bodyLines.join("\n").trim(),
      });
    }
  });

  return sections.filter((s) => s.body && s.body.length > 0);
}

// 🔥 slug param d’URL = fm.slug + "-" + fm.date
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const files = getAllArticleFiles();

  for (const file of files) {
    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const fm = data as ArticleFrontmatter;
    const baseSlug = fm.slug;
    const slugWithDate = `${baseSlug}-${fm.date}`;

    // On accepte soit /articles/slug, soit /articles/slug-date
    if (slug === slugWithDate || slug === baseSlug) {
      const sections = splitMarkdownIntoSections(content);

      return {
        frontmatter: fm,
        slug: slugWithDate, // on garde la version "complète" pour l’URL
        sections,
      };
    }
  }

  return null;
}

export async function getAllArticles(): Promise<Article[]> {
  const files = getAllArticleFiles();
  const articles: Article[] = [];

  for (const file of files) {
    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const fm = data as ArticleFrontmatter;

    const sections = splitMarkdownIntoSections(content);

    const slugWithDate = `${fm.slug}-${fm.date}`;

    articles.push({
      frontmatter: fm,
      slug: slugWithDate, // c’est celui-là qui servira à l’URL
      sections,
    });
  }

  // Trie du plus récent au plus ancien
  articles.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return articles;
}
