export default function RessourcesHero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[520px] sm:min-h-[620px]">
      {/* Background (fast, no Next image pipeline) */}
      <picture className="absolute inset-0">
        <source srcSet="/ressources/Hero.avif" type="image/avif" />
        <source srcSet="/ressources/Hero.webp" type="image/webp" />
        <img
          src="/ressources/Hero.webp"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="h-24 bg-gradient-to-b from-transparent to-slate-50" />
      </div>

      {/* Content */}
      <header className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
          Centre de ressources Vexly
        </p>

        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-slate-950 [text-shadow:0_2px_20px_rgba(255,255,255,0.55)]">
            Comment souhaitez-vous
          </span>{" "}
          <span className="text-indigo-900 [text-shadow:0_2px_24px_rgba(99,102,241,0.35)]">
            progresser
          </span>{" "}
          <span className="text-slate-950 [text-shadow:0_2px_20px_rgba(255,255,255,0.55)]">
            aujourd&apos;hui ?
          </span>
        </h1>

        <div className="mt-10">
          <a
            href="#hubs"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Explorer les Hubs
            <span className="text-lg leading-none">↓</span>
          </a>
        </div>
      </header>
    </section>
  );
}
