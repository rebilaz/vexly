import MarketplaceClient from "@/components/annuaire/MarketplaceClient";
import { getAllListingSlugs, getListing, type Listing } from "@/lib/annuaire";

type Category = "Templates" | "MVP" | "Modules";

type ClientListing = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  stack: string[];
  category: Category;
  niche_category?: string;
  discovered_at?: string | null;
  featured?: boolean;
};

function pickCategory(niche: string): Category {
  const lower = (niche || "").toLowerCase();
  if (lower.includes("template") || lower.includes("boilerplate") || lower.includes("starter")) {
    return "Templates";
  }
  if (lower.includes("module") || lower.includes("plugin") || lower.includes("integration")) {
    return "Modules";
  }
  return "MVP";
}

function toClientListing(l: Listing): ClientListing {
  const title = l.name;
  const description =
    (l.tagline && l.tagline.trim()) ||
    (l.content && l.content.trim().slice(0, 160)) ||
    "";

  const image = l.image || "";
  const stack = Array.isArray(l.stack_guess) ? l.stack_guess : [];
  const tags = Array.isArray(l.mvp_features) ? l.mvp_features.slice(0, 8) : [];
  const niche = l.niche_category || "Unknown";

  return {
    slug: l.slug,
    title,
    description,
    image,
    tags,
    stack,
    category: pickCategory(niche),
    niche_category: niche,
    discovered_at: l.discovered_at ?? null,
    featured: false,
  };
}

export default function MarketplacePage() {
  const slugs = getAllListingSlugs();

  const listings = slugs
    .map(({ slug }) => getListing(slug))
    .filter(Boolean)
    .map((l) => toClientListing(l as Listing));

  // Featured = plus récent
  const sorted = [...listings].sort((a, b) => {
    const da = a.discovered_at ? new Date(a.discovered_at).getTime() : 0;
    const db = b.discovered_at ? new Date(b.discovered_at).getTime() : 0;
    return db - da;
  });

  if (sorted.length > 0) sorted[0].featured = true;

  // (optionnel) metrics pour le header
  const niches = new Set(sorted.map((x) => (x.niche_category || "").trim()).filter(Boolean));
  const stacks = new Set(sorted.flatMap((x) => x.stack).map((s) => s.trim()).filter(Boolean));

  return (
    <MarketplaceClient
      listings={sorted}
      metrics={{
        total: sorted.length,
        niches: niches.size,
        stacks: stacks.size,
      }}
    />
  );
}
