// lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { ArticleSection } from "@/components/articles/ArticleLayout";

const articlesDir = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  slug: string; // pour l’URL
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
  const blocks = content.split(/\n(?=##\s+)/); // on coupe dès qu'une ligne commence par "## "
  const sections: ArticleSection[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split("\n");
    let heading: string | undefined;
    let bodyLines: string[] = [];

    if (index === 0) {
      // Premier bloc: il peut contenir un H1 + intro avant le premier "##"
      // On cherche un H1 (# ) et on garde tout en body
      const h1Index = lines.findIndex((l) => l.trim().startsWith("# "));
      if (h1Index !== -1) {
        // On pourrait utiliser le H1 comme heading, mais ton layout a déjà "title"
        // donc on met tout en body
        bodyLines = lines.slice(h1Index + 1);
      } else {
        bodyLines = lines;
      }

      sections.push({
        id: "intro",
        heading: heading, // pas de heading explicite
        body: bodyLines.join("\n").trim(),
      });
    } else {
      // Bloc suivant: on attend un "## Titre"
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

  // On nettoie les sections vides
  return sections.filter((s) => s.body && s.body.length > 0);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const files = getAllArticleFiles();

  for (const file of files) {
    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const fm = data as ArticleFrontmatter;

    if (fm.slug === slug) {
      const sections = splitMarkdownIntoSections(content);

      return {
        frontmatter: fm,
        slug: fm.slug,
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

    articles.push({
      frontmatter: fm,
      slug: fm.slug,
      sections,
    });
  }

  // Trie du plus récent au plus ancien
  articles.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return articles;
}
