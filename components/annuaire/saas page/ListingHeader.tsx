import { Globe, Calendar, BadgeCheck, Star } from "lucide-react";
import { Listing } from "@/lib/annuaire";

export function ListingHeader({ listing }: { listing: Listing }) {
  const domain = listing.url?.replace(/https?:\/\//, "") || "site";
  const dateLabel =
    listing.discovered_at
      ? new Date(listing.discovered_at).toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      })
      : "récemment";

  return (
    <div className="space-y-3">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {listing.niche_category && (
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
            {listing.niche_category}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        {listing.name}
      </h1>

      {/* ⭐ Rating + Verified (comme screenshot) */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 ? "currentColor" : "none"}
                className={i === 4 ? "text-yellow-400" : ""}
              />
            ))}
          </div>

          <span className="font-bold text-slate-900">4.8</span>
          <span className="text-slate-400">(124 reviews)</span>
        </div>

        <span className="text-slate-300">|</span>

        <div className="flex items-center gap-1.5 font-semibold text-slate-600">
          <BadgeCheck className="text-blue-500" size={16} />
          Verified by Marketplace
        </div>
      </div>

      {/* URL + date */}
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
        {listing.url && (
          <a
            href={listing.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-indigo-600 hover:underline"
          >
            <Globe size={14} />
            {domain}
          </a>
        )}

        <span className="text-slate-300">|</span>

        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          Ajouté en {dateLabel}
        </div>
      </div>
    </div>
  );
}
