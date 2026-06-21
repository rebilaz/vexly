import type { ToolPage } from "@/sanity/lib/outils";

type ToolDetailsSectionProps = {
  tool: ToolPage;
};

export function ToolDetailsSection({
  tool,
}: ToolDetailsSectionProps) {
  const formula = tool.formulaSection;
  const useCases = tool.useCasesSection;

  if (!formula && !useCases) {
    return null;
  }

  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        {formula ? (
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase text-indigo-600">
                {formula.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
                {formula.title}
              </h2>
            </div>

            <div>
              {formula.intro ? (
                <p className="text-base leading-8 text-slate-600">
                  {formula.intro}
                </p>
              ) : null}

              {formula.formula ? (
                <div className="mt-6 rounded-3xl border bg-white p-6">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Formule
                  </p>

                  <p className="mt-4 text-2xl font-black">
                    {formula.formula}
                  </p>
                </div>
              ) : null}

              {formula.steps?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {formula.steps.map((step) => (
                    <div
                      key={step._key}
                      className="rounded-3xl bg-slate-100 p-5"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-indigo-600 font-black text-white">
                        {step.label}
                      </span>

                      <p className="mt-4 font-black">
                        {step.title}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {useCases?.items?.length ? (
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase text-indigo-600">
                {useCases.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
                {useCases.title}
              </h2>
            </div>

            <div className="grid gap-4">
              {useCases.items.map((item, index) => (
                <div
                  key={item._key}
                  className="rounded-3xl border bg-white p-6"
                >
                  <div className="flex gap-4">
                    <span className="font-black text-indigo-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="leading-8 text-slate-700">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}