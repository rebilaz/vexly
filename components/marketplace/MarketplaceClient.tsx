"use client";

import { useMemo, useState } from "react";
import MarketplaceHero from "./MarketplaceHero";
import MarketplaceControls, { type CategoryTab } from "./MarketplaceControls";
import MarketplaceFeatured, { type ClientListing } from "./MarketplaceFeatured";
import MarketplaceGrid from "./MarketplaceGrid";

export default function MarketplaceClient({
  listings,
  metrics,
}: {
  listings: ClientListing[];
  metrics?: { total: number; niches: number; stacks: number };
}) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredItem = listings.find((i) => i.featured);

  const filteredListings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return listings.filter((item) => {
      if (activeTab === "All" && item.featured && q === "") return false;

      const matchesTab = activeTab === "All" || item.category === activeTab;

      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.niche_category ?? "").toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [listings, activeTab, searchQuery]);

  const total = metrics?.total ?? listings.length;
  const niches = metrics?.niches ?? 0;
  const stacks = metrics?.stacks ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <MarketplaceHero total={total} niches={niches} stacks={stacks} />

      {/* ✅ Tout le contenu "page" dans le même container */}
      <div className="mx-auto max-w-6xl px-6">
        <MarketplaceControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="pt-10 space-y-10">
          {featuredItem && searchQuery === "" && activeTab === "All" && (
            <MarketplaceFeatured item={featuredItem} />
          )}

          <MarketplaceGrid
            items={filteredListings}
            onReset={() => {
              setSearchQuery("");
              setActiveTab("All");
            }}
          />
        </div>
      </div>
    </div>
  );
}
