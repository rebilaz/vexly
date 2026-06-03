import Link from "next/link";
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

export default function ComparisonHero({
  page,
  backHref,
}: {
  page: ComparisonPageContent;
  backHref: string;
}) {
  const hero = page.hero;

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-100">
      {/* Background subtil : un glow très léger et une grille fine pour l'aspect tech */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp3rpxnw/image/upload/v1704285160/grid_wqv7v2.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 pointer-events-none" />

      {/* Conteneur principal rétréci pour un texte parfaitement calibré */}
      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-900 mb-16"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Retour
        </Link>

        <div className="max-w-3xl">
          {/* Titre avec la police Geist (tracking-tighter est crucial pour ce look) */}
          <h1 className="font-geist text-5xl font-semibold tracking-tighter text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1.05]">
            {hero?.title ?? page.title}
          </h1>

          {hero?.description ? (
            <p className="mt-8 text-lg leading-relaxed text-slate-500 sm:text-xl max-w-2xl">
              {hero.description}
            </p>
          ) : null}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            {hero?.primaryCtaHref && hero?.primaryCtaLabel ? (
              <Link
                href={hero.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:-translate-y-0.5"
              >
                {hero.primaryCtaLabel}
              </Link>
            ) : null}

            {hero?.secondaryCtaHref && hero?.secondaryCtaLabel ? (
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-medium text-slate-900 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                {hero.secondaryCtaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}