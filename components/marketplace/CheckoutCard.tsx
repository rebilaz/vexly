import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { Listing } from "@/lib/marketplace";

export function CheckoutCard({ listing }: { listing: Listing }) {
  const price = listing.vexly_analysis?.estimated_price || "Sur devis";

  return (
    <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
      {/* Price */}
      <div className="mb-6">
        <p className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-500">
          Licence Standard
        </p>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">{price}</span>
          <span className="font-medium text-slate-400">USD</span>
        </div>

        <p className="mt-2 text-[11px] text-slate-500">
          Licence commerciale • Usage illimité • Revente autorisée
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <Link
          href={`/contact?subject=Commande: ${encodeURIComponent(listing.name)}`}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 font-bold text-white shadow-lg shadow-indigo-900/10 transition-all hover:scale-[1.02] hover:bg-black"
        >
          Acheter maintenant
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

        {listing.demo_url ? (
          <a
            href={listing.demo_url}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            Voir la démo live
            <ExternalLink size={18} />
          </a>
        ) : (
          <button
            type="button"
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-400"
            title="Démo non disponible"
          >
            Voir la démo live
            <ExternalLink size={18} />
          </button>
        )}
      </div>

      {/* Features */}
      <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
        {[
          "Projets illimités",
          "Code source complet",
          "Accès GitHub Privé",
          "Support Discord Premium",
        ].map((t) => (
          <div key={t} className="flex items-start gap-3 text-sm text-slate-600">
            <CheckCircle2 className="shrink-0 text-green-500" size={20} />
            <span>{t}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        Paiement sécurisé • IP 100% à vous
      </p>
    </div>
  );
}
