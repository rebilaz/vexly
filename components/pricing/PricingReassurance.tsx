import Link from "next/link";

export function PricingReassurance() {
  return (
    <section className="mx-auto mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
        Comment ça se passe concrètement ?
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">1. Cadrage rapide</p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Tu expliques ton idée. On valide le scope du MVP (ce qui compte vraiment).
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">2. Build propre</p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Code clean, UI pro, auth/paiement si besoin. Tu gardes le contrôle.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-semibold text-white">3. Mise en ligne</p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Livraison + docs. Si maintenance : sécurité & support léger dans la durée.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-white/60">Pas d’engagement caché. Tu repars avec le code source.</p>

        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
        >
          Demander un devis rapide
        </Link>
      </div>
    </section>
  );
}
