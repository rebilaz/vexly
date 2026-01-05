import { Globe, Calendar, BadgeCheck } from "lucide-react";
import { Listing } from "@/lib/marketplace";

export function ListingHeader({ listing }: { listing: Listing }) {
  const domain = listing.url?.replace(/https?:\/\//, "") || "site";

  const dateLabel = listing.discovered_at
    ? new Date(listing.discovered_at).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    })
    : "récemment";

  return (
    <div className="space-y-4">
      {/* TITLE — plus gros */}
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
        {listing.name}
      </h1>

      {/* Verified */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <BadgeCheck className="text-indigo-600" size={18} />
        Verified by Vexly
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
