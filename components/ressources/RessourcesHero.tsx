import Link from "next/link";
import { Search } from "lucide-react";

type PopularItem = {
  label: string;
  value: string; // ce que tu mets dans la search (ex: "Data Visualisation")
};

type RessourcesHeroProps = {
  badge?: string;
  titleTop?: string;
  titleHighlight?: string;
  subtitle?: string;

  // Search
  query?: string; // contrôlé si fourni
  onQueryChange?: (v: string) => void; // si tu veux contrôler depuis RessourcesClient
  onSubmit?: () => void; // optionnel

  popular?: PopularItem[];
};

export default function RessourcesHero({
  badge = "Académie & Ressources",
  titleTop = "Maîtrisez l’art de la",
  titleHighlight = "Donnée Intelligente",
  subtitle = "Guides experts, tutoriels interactifs et stratégies pour transformer vos analyses en décisions impactantes.",
  query,
  onQueryChange,
  onSubmit,
  popular = [
    { label: "Data Visualisation", value: "Data Visualisation" },
    { label: "SaaS Metrics", value: "SaaS Metrics" },
    { label: "Data Storytelling", value: "Data Storytelling" },
  ],
}: RessourcesHeroProps) {
  const isControlled = typeof query === "string" && typeof onQueryChange === "function";

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
      {/* décor léger */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="absolute left-1/2 top-[120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 pt-14 sm:pt-16 pb-10 sm:pb-12 text-center">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-indigo-200/60 bg-indigo-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
            {badge}
          </span>
        </div>

        {/* Titres */}
        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900">
          {titleTop}
          <span className="block mt-2 text-indigo-600">{titleHighlight}</span>
        </h1>

        {/* Sous-titre */}
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
          {subtitle}
        </p>

        {/* Search */}
        <div className="mx-auto mt-9 max-w-2xl">
          <form
            onSubmit={(e) => {
              // en server mode : tu peux laisser le form faire son submit si tu veux
              // en client mode : on évite le refresh
              if (onSubmit) {
                e.preventDefault();
                onSubmit();
              }
            }}
            className="relative"
          >
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="size-5" />
            </div>

            <input
              value={isControlled ? query : undefined}
              defaultValue={!isControlled ? query : undefined}
              onChange={(e) => onQueryChange?.(e.target.value)}
              placeholder="Que cherchez-vous aujourd’hui ? (ex: API, Visualisation, KPI...)"
              className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm sm:text-base text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
              aria-label="Rechercher dans les ressources"
            />

            {/* bouton optionnel (si tu veux un CTA explicite) */}
            {/* <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Rechercher
            </button> */}
          </form>

          {/* Populaires */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="text-slate-400">Populaire :</span>

            {popular.map((item) =>
              isControlled ? (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onQueryChange?.(item.value)}
                  className="rounded-full px-2.5 py-1 text-slate-500 underline underline-offset-4 decoration-slate-200 hover:text-indigo-600 hover:decoration-indigo-200"
                >
                  {item.label}
                </button>
              ) : (
                // mode server simple : liens (tu peux adapter si tu gères un querystring)
                <Link
                  key={item.value}
                  href={`/ressources?q=${encodeURIComponent(item.value)}`}
                  className="rounded-full px-2.5 py-1 text-slate-500 underline underline-offset-4 decoration-slate-200 hover:text-indigo-600 hover:decoration-indigo-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
