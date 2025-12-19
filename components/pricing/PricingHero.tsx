"use client";

export function PricingHero({
  withMaintenance,
  onToggleMaintenance,
}: {
  withMaintenance: boolean;
  onToggleMaintenance: (v: boolean) => void;
}) {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
        Places limitées pour janvier
      </div>

      {/* Title + subtitle */}
      <div className="w-full">
        <h1 className="font-black tracking-[-0.045em] text-5xl sm:text-6xl md:text-7xl lg:text-[78px] leading-[1.05]">
          Tarifs pour lancer
          <br />
          <span className="text-indigo-300/95">votre empire SaaS</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
          Un accompagnement clair. Du code propre. Tu choisis le niveau, on construit le produit.
          <span className="font-semibold text-white/80"> Livrable en moins de 14 jours.</span>
        </p>
      </div>

      {/* Toggle */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold">
        <span className={!withMaintenance ? "text-white" : "text-white/55"}>Projet One-shot</span>

        <button
          type="button"
          onClick={() => onToggleMaintenance(!withMaintenance)}
          className="relative h-7 w-12 rounded-full border border-white/15 bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
          aria-label="Toggle maintenance"
        >
          <span
            className={[
              "absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-indigo-500 shadow-sm transition-transform",
              withMaintenance ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>

        <span className={withMaintenance ? "text-white" : "text-white/55"}>Avec Maintenance</span>

        <span className="ml-1 rounded-md border border-emerald-300/15 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-200">
          Sérénité
        </span>
      </div>

      {/* Optional: small spacing divider (pure spacing, no line) */}
      <div className="h-2" />
    </header>
  );
}
