import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Listing } from "@/lib/annuaire";
import { RainbowButton } from "@/components/ui/RainbowButton";

export function OfferCTA({
  listing,
  compact = false,
}: {
  listing: Listing;
  compact?: boolean;
}) {
  const primaryHref = `/fit?ref=marketplace&slug=${encodeURIComponent(
    listing.slug
  )}&name=${encodeURIComponent(listing.name)}`;

  const originalHref = listing.url || listing.demo_url || "";

  // compact sizing
  const pad = compact ? "p-6" : "p-8";
  const title = compact ? "text-3xl" : "text-4xl";
  const subtitleMt = compact ? "mt-3" : "mt-5";
  const ctaMt = compact ? "mt-6" : "mt-10";
  const btnText = compact ? "text-sm" : "text-base";

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className={pad}>
        <h3 className={`${title} font-extrabold tracking-tight text-slate-900`}>
          Reproduire
          <br />
          ce modèle
        </h3>

        {/* Subtitle: en compact on garde UNE ligne, pas 3 */}
        <p className={`${subtitleMt} text-base leading-relaxed text-slate-600`}>
          Clonez cette architecture SaaS.
          {!compact && (
            <>
              <br />
              <span className="text-slate-400">Optimisée. Scalable. Prête.</span>
            </>
          )}
        </p>

        <div className={`${ctaMt} space-y-4`}>
          <Link href={primaryHref} className="block w-full">
            <RainbowButton className={btnText}>
              <span>Lancer le projet</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition group-hover:bg-white/20">
                <ArrowUpRight size={18} />
              </span>
            </RainbowButton>
          </Link>

          {originalHref ? (
            <a
              href={originalHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-slate-600"
            >
              Voir le site original
              <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
