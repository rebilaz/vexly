"use client";

import { useMemo, useState } from "react";
import MarketplaceHero from "./MarketplaceHero";
import MarketplaceControls from "./MarketplaceControls";
import MarketplaceFeatured, { type ClientListing } from "./MarketplaceFeatured";
import MarketplaceGrid from "./MarketplaceGrid";

export default function MarketplaceClient({
  listings,
}: {
  listings: ClientListing[];
  metrics?: { total: number; niches: number; stacks: number };
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredItem = listings.find((i) => i.featured);

  const filteredListings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return listings.filter((item) => {
      // cache le featured du grid quand on n'a pas de recherche
      if (item.featured && q === "") return false;

      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.niche_category ?? "").toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q);

      return matchesSearch;
    });
  }, [listings, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <MarketplaceHero />

      <div className="mx-auto max-w-6xl px-6">
        <MarketplaceControls searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="space-y-10 pt-10">
          {featuredItem && searchQuery === "" && <MarketplaceFeatured item={featuredItem} />}

          <MarketplaceGrid
            items={filteredListings}
            onReset={() => {
              setSearchQuery("");
            }}
          />
        </div>
      </div>
    </div>
  );
}
