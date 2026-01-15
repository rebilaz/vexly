import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { ArticleSection } from "@/components/articles/ArticleLayout";

const articlesDir = path.join(process.cwd(), "content", "articles");
const pillarsDir = path.join(process.cwd(), "content", "pillars");

/**
 * Frontmatter tel qu’il existe dans tes fichiers .md
 * 👉 IMPORTANT :
 * - fm.slug est INFORMATIF
 * - L’URL vient UNIQUEMENT du nom de fichier
 */
export type ArticleFrontmatter = {
  title: string;
  subtitle?: string;
  slug?: string; // informatif uniquement (NON utilisé pour router)
  description?: string;

  // NOTE: tes piliers n'ont pas forcément "date"
  date?: string; // YYYY-MM-DD ou ISO (optionnel)
  updated_at?: string; // ISO
  readingTime?: string;

  tags?: string[];
  niche?: string;

  // ✅ on garde ce champ (si tu le mets dans certains MD)
  coverImageUrl?: string;

  cluster?: string;

  type?: string; // "pillar" etc.
  pillar?: string;

  main_keyword?: string;
  search_intent?: string;
  angle?: string;
  priority?: number;
  canonical_url?: string;

  clusters_count?: number;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  slug: string; // ✅ slug D’URL = filename sans .md
  sections: ArticleSection[];
};

/**
 * Liste tous les fichiers markdown d'un dossier (non récursif)
 */
function getAllMdFilesInDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

/**
 * Slugify pour les ancres internes (## titres)
 */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Découpe un markdown en sections à chaque "## "
 */
function splitMarkdownIntoSections(content: string): ArticleSection[] {
  const blocks = content.split(/\n(?=##\s+)/);
  const sections: ArticleSection[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split("\n");
    let heading: string | undefined;
    let bodyLines: string[] = [];

    // Intro (avant le premier ##)
    if (index === 0) {
      const h1Index = lines.findIndex((l) => l.trim().startsWith("# "));
      bodyLines = h1Index !== -1 ? lines.slice(h1Index + 1) : lines;

      sections.push({
        id: "intro",
        heading: undefined,
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

/**
 * Lit un fichier md et le convertit en Article (slug basé sur filename)
 */
function readMdAsArticle(fullPath: string, fileName: string): Article {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as ArticleFrontmatter;
  const sections = splitMarkdownIntoSections(content);
  const fileSlug = fileName.replace(/\.md$/, "");

  // ✅ COVER DÉTERMINISTE (sans modifier les MD)
  const coverImageUrl =
    frontmatter.coverImageUrl && frontmatter.coverImageUrl.trim()
      ? frontmatter.coverImageUrl.trim()
      : `/images/articles/${fileSlug}.webp`;

  return {
    frontmatter: {
      ...frontmatter,
      coverImageUrl, // ✅ injecté pour le front
    },
    slug: fileSlug,
    sections,
  };
}

/**
 * ✅ Récupère un article OU un pilier par slug D’URL
 * 👉 slug = filename sans ".md"
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articleFiles = getAllMdFilesInDir(articlesDir);
  for (const file of articleFiles) {
    const fileSlug = file.replace(/\.md$/, "");
    if (slug !== fileSlug) continue;

    const fullPath = path.join(articlesDir, file);
    return readMdAsArticle(fullPath, file);
  }

  const pillarFiles = getAllMdFilesInDir(pillarsDir);
  for (const file of pillarFiles) {
    const fileSlug = file.replace(/\.md$/, "");
    if (slug !== fileSlug) continue;

    const fullPath = path.join(pillarsDir, file);
    return readMdAsArticle(fullPath, file);
  }

  return null;
}

/**
 * ✅ Récupère tous les articles + piliers
 * 👉 slug = filename sans ".md"
 */
export async function getAllArticles(): Promise<Article[]> {
  const articleFiles = getAllMdFilesInDir(articlesDir);
  const pillarFiles = getAllMdFilesInDir(pillarsDir);

  const items: Article[] = [];

  for (const file of articleFiles) {
    const fullPath = path.join(articlesDir, file);
    items.push(readMdAsArticle(fullPath, file));
  }

  for (const file of pillarFiles) {
    const fullPath = path.join(pillarsDir, file);
    items.push(readMdAsArticle(fullPath, file));
  }

  // Tri: plus récent → plus ancien
  // - priorise date si présente, sinon updated_at, sinon 0
  const toTs = (a: Article) => {
    const fm: any = a.frontmatter || {};
    const d = fm.date ? Date.parse(fm.date) : NaN;
    if (!Number.isNaN(d)) return d;
    const u = fm.updated_at ? Date.parse(fm.updated_at) : NaN;
    if (!Number.isNaN(u)) return u;
    return 0;
  };

  items.sort((a, b) => toTs(b) - toTs(a));

  return items;
}
