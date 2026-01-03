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

/* =========================
   HELPERS (FS)
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

  const listing: Listing = {
    slug,

    name: typeof data?.name === "string" ? data.name : slug,
    tagline: typeof data?.tagline === "string" ? data.tagline : undefined,

    niche_category:
      typeof data?.niche_category === "string" ? data.niche_category : undefined,
    discovered_at:
      typeof data?.discovered_at === "string" ? data.discovered_at : undefined,

    url: typeof data?.url === "string" ? data.url : undefined,
    demo_url: typeof data?.demo_url === "string" ? data.demo_url : undefined,

    pricing_url:
      typeof data?.pricing_url === "string" ? data.pricing_url : undefined,
    login_url:
      typeof data?.login_url === "string" ? data.login_url : undefined,
    proof_of_saas:
      typeof data?.proof_of_saas === "string" ? data.proof_of_saas : undefined,

    image: typeof data?.image === "string" ? data.image : undefined,

    content: (content ?? "").trim(),

    mvp_features: isStringArray(data?.mvp_features) ? data.mvp_features : undefined,
    stack_guess: isStringArray(data?.stack_guess) ? data.stack_guess : undefined,

    monthly_visits: isTrafficPointArray(data?.monthly_visits)
      ? data.monthly_visits
      : undefined,
    growth_rate: typeof data?.growth_rate === "number" ? data.growth_rate : undefined,

    vexly_analysis: data?.vexly_analysis
      ? {
        estimated_price:
          typeof data.vexly_analysis?.estimated_price === "string"
            ? data.vexly_analysis.estimated_price
            : undefined,
        comment:
          typeof data?.vexly_analysis?.comment === "string"
            ? data.vexly_analysis.comment
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
  const slugs = getAllListingSlugs();
  return slugs.map(({ slug }) => getListing(slug)).filter(Boolean) as Listing[];
}

/* =========================
   TRAFFIC (SUPABASE)
   - Source: hunt_results.raw.traffic
   - 1 row (latest) per slug
========================= */

function monthLabelFR(ym: string) {
  // ym = "YYYY-MM"
  const [y, m] = ym.split("-").map((x) => Number(x));
  if (!y || !m) return ym;

  const names = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];
  return names[m - 1] ?? ym;
}

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

  // ✅ On prend le dernier hunt_results pour ce slug
  const { data, error } = await supabase
    .from("hunt_results")
    .select("created_at, raw")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return { points: [] };

  // ✅ C’est ici : raw.traffic (jsonb)
  const rawTraffic = (data as any)?.raw?.traffic;

  const points: TrafficPoint[] = (Array.isArray(rawTraffic) ? rawTraffic : [])
    .map((p: any): TrafficPoint | null => {
      const ym = String(p?.label ?? "").slice(0, 7); // "2025-11"
      const v = Number(p?.value);
      if (!ym || !Number.isFinite(v) || v <= 0) return null;

      // Axe X en "Sep" "Oct" etc (tu peux aussi laisser ym)
      const [y, m] = ym.split("-").map(Number);
      const monthFR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
      const monthLabel = monthFR[(m ?? 1) - 1] ?? ym;

      return { label: monthLabel, fullLabel: ym, value: v };
    })
    .filter((x): x is TrafficPoint => x !== null); // ✅ fix TS

  // Tri safe par fullLabel YYYY-MM
  points.sort((a, b) =>
    String(a.fullLabel ?? "").localeCompare(String(b.fullLabel ?? ""))
  );

  // Growth (premier -> dernier)
  let growthRate: number | undefined = undefined;
  if (points.length >= 2 && points[0].value > 0) {
    growthRate =
      ((points[points.length - 1].value - points[0].value) / points[0].value) *
      100;
  }

  return { points, growthRate };
}
