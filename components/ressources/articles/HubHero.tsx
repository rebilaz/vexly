import type { HubPageContent } from "@/sanity/lib/hubPage";

export default function HubHero({ content }: { content: HubPageContent }) {
  const hero = content.hero;

  const backgroundImageUrl = hero?.backgroundImageUrl;
  const backgroundImageAlt = hero?.backgroundImageAlt ?? "";

  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {backgroundImageUrl ? (
        <img
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        />
      ) : null}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.35),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.75),rgba(15,23,42,0.95))]" />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 ring-1 ring-white/15">
            {content.title}
          </p>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero?.titleline1}
            {hero?.titlehighlight ? (
              <>
                <br />
                <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-200 bg-clip-text text-transparent">
                  {hero.titlehighlight}
                </span>
              </>
            ) : null}
          </h1>

          {hero?.description ? (
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">
              {hero.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}