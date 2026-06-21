import Link from "next/link";

import type { ToolPage } from "@/sanity/lib/outils";
import { CalculatorRenderer } from "@/components/outils/CalculatorRenderer";

type ToolHeroSectionProps = {
  tool: ToolPage;
};

export function ToolHeroSection({
  tool,
}: ToolHeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/outils">Outils</Link>
          <span>/</span>
          <span className="text-slate-950">{tool.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            {tool.label ? (
              <p className="inline-flex rounded-full border bg-white px-4 py-2 text-xs font-black uppercase text-indigo-600">
                {tool.label}
              </p>
            ) : null}

            <h1 className="mt-6 text-4xl font-black tracking-[-0.06em] sm:text-6xl">
              {tool.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {tool.description}
            </p>

            {tool.stats?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {tool.stats.map((stat) => (
                  <div
                    key={stat._key}
                    className="rounded-3xl border bg-white p-5"
                  >
                    <p className="text-xs font-black uppercase text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {stat.value}
                    </p>

                    {stat.description ? (
                      <p className="mt-1 text-sm text-slate-500">
                        {stat.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {tool.helperText ? (
              <p className="mt-6 text-sm leading-7 text-slate-500">
                {tool.helperText}
              </p>
            ) : null}
          </div>

          <CalculatorRenderer config={tool.calculator} />
        </div>
      </div>
    </section>
  );
}