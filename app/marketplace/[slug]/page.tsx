// app/marketplace/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  getListing,
  getAllListingSlugs,
  getAllListings,
  getMarketplaceTraffic,
} from "@/lib/marketplace";

import { Image as SaaSImage } from "@/components/annuaire/saas page/Images";
import { ListingHeader } from "@/components/annuaire/saas page/ListingHeader";
import { TrafficChart } from "@/components/annuaire/saas page/TrafficChart";
import { ConceptOverview } from "@/components/annuaire/saas page/AnalysisBox";
import { SimilarCarousel } from "@/components/annuaire/saas page/SimilarCarousel";

// ⚠️ ton fichier export default function SaasLaunchCard
import SaasLaunchCard from "@/components/annuaire/saas page/SaaSLaunchCard";

export async function generateStaticParams() {
  const listings = getAllListingSlugs();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ slug = filename, ne pas renormaliser
  const listing = getListing(slug);
  if (!listing) return;

  const siteName = "Vexly Marketplace";
  const title = `${listing.name}${listing.tagline ? ` — ${listing.tagline}` : ""} | ${siteName}`;

  const description =
    (listing.tagline?.trim() && listing.tagline.trim()) ||
    (listing.content?.trim().slice(0, 160) ?? `${listing.name} sur ${siteName}`);

  const canonical = `https://www.vexly.fr/marketplace/${listing.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: listing.image ? [{ url: listing.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: listing.image ? [listing.image] : [],
    },
  };
}

function pickSimilar(listingSlug: string, niche?: string) {
  const all = typeof getAllListings === "function" ? getAllListings() : [];
  const others = all.filter((x) => x.slug !== listingSlug);

  const sameNiche = niche
    ? others.filter((x) => (x.niche_category || "").toLowerCase() === niche.toLowerCase())
    : [];

  const sortedByDate = [...others].sort((a, b) => {
    const da = a.discovered_at ? new Date(a.discovered_at).getTime() : 0;
    const db = b.discovered_at ? new Date(b.discovered_at).getTime() : 0;
    return db - da;
  });

  const pool = sameNiche.length > 0 ? sameNiche : sortedByDate;
  return pool.slice(0, 6);
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ slug = filename, ne pas renormaliser
  const listing = getListing(slug);
  if (!listing) return notFound();

  const traffic = await getMarketplaceTraffic(slug);

  const chartPoints = traffic.points.length ? traffic.points : listing.monthly_visits ?? [];
  const canonical = `https://www.vexly.fr/marketplace/${listing.slug}`;

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: listing.name,
    description: listing.tagline || listing.content?.slice(0, 200) || "",
    url: listing.url || canonical,
    applicationCategory: listing.niche_category || "BusinessApplication",
    operatingSystem: "Web",
    image: listing.image ? [listing.image] : undefined,
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Marketplace", item: "https://www.vexly.fr/marketplace" },
      { "@type": "ListItem", position: 2, name: listing.name, item: canonical },
    ],
  };

  const similar = pickSimilar(listing.slug, listing.niche_category);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/marketplace"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200">
              <ArrowLeft size={16} />
            </div>
            <span>Retour au catalogue</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <SaaSImage image={listing.image} name={listing.name} />
            <ListingHeader listing={listing} />
            <TrafficChart data={chartPoints} />

            <ConceptOverview listing={listing} />


            {similar.length > 0 && <SimilarCarousel similar={similar} />}
          </div>

          <div className="lg:col-span-4">
            <aside className="z-20 lg:sticky lg:top-16">
              <SaasLaunchCard listing={listing} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
