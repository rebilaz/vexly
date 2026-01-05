// lib/marketplace.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

const DATA_DIR = path.join(process.cwd(), "content/marketplace");

/* =========================
   TYPES
========================= */

export type TrafficPoint = {
  label: string;
  value: number;
  fullLabel?: string; // tooltip (optionnel)
};

export type ListingFacts = {
  pricing?: string;  // Abonnement / Freemium / Sur devis...
  coverage?: string; // France / Europe / Global...
  status?: string;   // Mature / Early access / Enterprise...
  note?: string;     // phrase courte
};

export type VexlyAnalysis = {
  estimated_price?: string;
  comment?: string;
};

export type Listing = {
  slug: string;

  // Header
  name: string;
  tagline?: string;
  niche_category?: string;
  discovered_at?: string;

  // URLs
  url?: string;
  demo_url?: string;

  // SEO / SaaS proof (optionnel)
  pricing_url?: string;
  login_url?: string;
  proof_of_saas?: string;

  // Media
  image?: string;

  // Content
  content: string;
  mvp_features?: string[];

  // Tech
  stack_guess?: string[];

  // Facts (from YAML "facts:")
  facts?: ListingFacts;

  // Traction
  monthly_visits?: TrafficPoint[];
  growth_rate?: number;

  // Expert analysis
  vexly_analysis?: VexlyAnalysis;
};

/* =========================
   SMALL GUARDS
========================= */

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isTrafficPointArray(v: unknown): v is TrafficPoint[] {
  return (
    Array.isArray(v) &&
    v.every(
      (x) =>
        x &&
        typeof x === "object" &&
        typeof (x as any).label === "string" &&
        typeof (x as any).value === "number"
    )
  );
}

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/* =========================
   HELPERS (FS)
========================= */

export function getAllListingSlugs(): { slug: string }[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  return fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export function getListing(slug: string): Listing | null {
  const fullPath = path.join(DATA_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const facts: ListingFacts | undefined =
    isObject((data as any)?.facts)
      ? {
        pricing:
          typeof (data as any).facts.pricing === "string"
            ? (data as any).facts.pricing
            : undefined,
        coverage:
          typeof (data as any).facts.coverage === "string"
            ? (data as any).facts.coverage
            : undefined,
        status:
          typeof (data as any).facts.status === "string"
            ? (data as any).facts.status
            : undefined,
        note:
          typeof (data as any).facts.note === "string"
            ? (data as any).facts.note
            : undefined,
      }
      : undefined;

  const listing: Listing = {
    slug,

    name: typeof (data as any)?.name === "string" ? (data as any).name : slug,
    tagline:
      typeof (data as any)?.tagline === "string" ? (data as any).tagline : undefined,

    niche_category:
      typeof (data as any)?.niche_category === "string"
        ? (data as any).niche_category
        : undefined,
    discovered_at:
      typeof (data as any)?.discovered_at === "string"
        ? (data as any).discovered_at
        : undefined,

    url: typeof (data as any)?.url === "string" ? (data as any).url : undefined,
    demo_url:
      typeof (data as any)?.demo_url === "string" ? (data as any).demo_url : undefined,

    pricing_url:
      typeof (data as any)?.pricing_url === "string"
        ? (data as any).pricing_url
        : undefined,
    login_url:
      typeof (data as any)?.login_url === "string"
        ? (data as any).login_url
        : undefined,
    proof_of_saas:
      typeof (data as any)?.proof_of_saas === "string"
        ? (data as any).proof_of_saas
        : undefined,

    image: typeof (data as any)?.image === "string" ? (data as any).image : undefined,

    // ✅ content = body markdown (après frontmatter)
    content: (content ?? "").trim(),

    mvp_features: isStringArray((data as any)?.mvp_features)
      ? (data as any).mvp_features
      : undefined,

    stack_guess: isStringArray((data as any)?.stack_guess)
      ? (data as any).stack_guess
      : undefined,

    facts,

    monthly_visits: isTrafficPointArray((data as any)?.monthly_visits)
      ? (data as any).monthly_visits
      : undefined,

    growth_rate:
      typeof (data as any)?.growth_rate === "number" ? (data as any).growth_rate : undefined,

    vexly_analysis: isObject((data as any)?.vexly_analysis)
      ? {
        estimated_price:
          typeof (data as any).vexly_analysis.estimated_price === "string"
            ? (data as any).vexly_analysis.estimated_price
            : undefined,
        comment:
          typeof (data as any).vexly_analysis.comment === "string"
            ? (data as any).vexly_analysis.comment
            : undefined,
      }
      : undefined,
  };

  return listing;
}

/**
 * ✅ Utile pour “Produits similaires”, “Alternatives”, etc.
 */
export function getAllListings(): Listing[] {
  return getAllListingSlugs()
    .map(({ slug }) => getListing(slug))
    .filter(Boolean) as Listing[];
}

/* =========================
   TRAFFIC (SUPABASE)
   - Source: hunt_results.raw.traffic
   - 1 row (latest) per slug
========================= */

function computeGrowth(points: { value: number }[]) {
  if (!points?.length) return undefined;
  const first = points[0]?.value ?? 0;
  const last = points[points.length - 1]?.value ?? 0;
  if (first <= 0) return undefined;
  return ((last - first) / first) * 100;
}

/**
 * ✅ Récupère les vrais points de trafic depuis Supabase
 * ⚠️ À appeler côté serveur (Server Component / route handler)
 */
export async function getMarketplaceTraffic(
  slug: string
): Promise<{ points: TrafficPoint[]; growthRate?: number }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) return { points: [] };

  const supabase = createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("hunt_results")
    .select("created_at, raw")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return { points: [] };

  const rawTraffic = (data as any)?.raw?.traffic;

  const points: TrafficPoint[] = (Array.isArray(rawTraffic) ? rawTraffic : [])
    .map((p: any): TrafficPoint | null => {
      const ym = String(p?.label ?? "").slice(0, 7); // "2025-11"
      const v = Number(p?.value);
      if (!ym || !Number.isFinite(v) || v <= 0) return null;

      // affiche "Oct" etc mais garde fullLabel pour tri/tooltip
      const [, m] = ym.split("-").map(Number);
      const monthFR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
      const label = monthFR[(m ?? 1) - 1] ?? ym;

      return { label, fullLabel: ym, value: v };
    })
    .filter((x): x is TrafficPoint => x !== null);

  points.sort((a, b) =>
    String(a.fullLabel ?? "").localeCompare(String(b.fullLabel ?? ""))
  );

  const growthRate = points.length >= 2 ? computeGrowth(points) : undefined;
  return { points, growthRate };
}
