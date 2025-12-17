import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DATA_DIR = path.join(process.cwd(), "content/marketplace");

/* =========================
   TYPES
========================= */

export type TrafficPoint = {
  label: string;
  value: number;
};

export type VexlyAnalysis = {
  estimated_price?: string;
  comment?: string;
};

export type Listing = {
  slug: string;

  // Header
  name: string;
  niche_category?: string;
  discovered_at?: string;

  // URLs
  url?: string;
  demo_url?: string;

  // Media
  image?: string;

  // Content
  content: string;
  mvp_features?: string[];

  // Tech
  stack_guess?: string[];

  // Traction
  monthly_visits?: TrafficPoint[];
  growth_rate?: number;

  // Expert analysis
  vexly_analysis?: VexlyAnalysis;
};

/* =========================
   HELPERS
========================= */

export function getAllListingSlugs(): { slug: string }[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  return fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export function getListing(slug: string): Listing | null {
  const fullPath = path.join(DATA_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Sécurisation minimale + mapping clair
  const listing: Listing = {
    slug,

    name: data.name ?? slug,
    niche_category: data.niche_category,
    discovered_at: data.discovered_at,

    url: data.url,
    demo_url: data.demo_url,

    image: data.image,

    content: content.trim(),

    mvp_features: Array.isArray(data.mvp_features)
      ? data.mvp_features
      : undefined,

    stack_guess: Array.isArray(data.stack_guess)
      ? data.stack_guess
      : undefined,

    monthly_visits: Array.isArray(data.monthly_visits)
      ? data.monthly_visits
      : undefined,

    growth_rate:
      typeof data.growth_rate === "number"
        ? data.growth_rate
        : undefined,

    vexly_analysis: data.vexly_analysis
      ? {
          estimated_price: data.vexly_analysis.estimated_price,
          comment: data.vexly_analysis.comment,
        }
      : undefined,
  };

  return listing;
}
