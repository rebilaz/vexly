import type { ScenariosSection } from "@/sanity/lib/outils";

type ToolScenariosSectionProps = {
  section?: ScenariosSection;
};

export function ToolScenariosSection({
  section,
}: ToolScenariosSectionProps) {
  if (!section?.cards?.length) {
    return null;
  }

  return (
    <section className="bg-[#061A33] px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase text-indigo-300">
            {section.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
            {section.title}
          </h2>

          {section.description ? (
            <p className="mt-5 leading-8 text-slate-300">
              {section.description}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {section.cards.map((card) => (
            <article
              key={card._key}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <p className="text-sm font-black uppercase text-slate-400">
                {card.label}
              </p>

              <p className="mt-5 text-3xl font-black">
                {card.value}
              </p>

              {card.description ? (
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {card.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}