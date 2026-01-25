import Image from "next/image";

export default function RessourcesHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* =========================
          BACKGROUND IMAGE (optimized)
         ========================= */}
      <div className="absolute inset-0">
        <Image
          src="/ressources/Hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </div>

      {/* =========================
          BOTTOM CURVED TRANSITION
         ========================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="h-24 bg-gradient-to-b from-transparent to-slate-50" />
      </div>

      {/* =========================
          CONTENT
         ========================= */}
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
