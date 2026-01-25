"use client";

export default function MarketplaceHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_60%,rgba(255,255,255,1)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center pt-28 pb-20 sm:pt-24 sm:pb-16 md:pt-24 md:pb-16">
          {/* Title */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight leading-[1.12] text-slate-900 md:text-6xl">
            Découvrez les meilleurs{" "}
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              Micro-SaaS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-[22rem] text-center text-[15px] font-semibold leading-[1.65] text-slate-700 sm:max-w-xl sm:text-base md:text-lg">
            Produits, templates et MVPs prêts à l’emploi pour lancer plus vite, sans friction.
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/60" />
    </section>
  );
}
