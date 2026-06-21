import Link from "next/link";

import type { ToolCta } from "@/sanity/lib/outils";

type ToolFinalCtaSectionProps = {
  cta?: ToolCta;
};

export function ToolFinalCtaSection({
  cta,
}: ToolFinalCtaSectionProps) {
  if (!cta) {
    return null;
  }

  return (
    <section className="px-6 pb-24 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#061A33] px-8 py-14 text-center text-white">
        {cta.eyebrow ? (
          <p className="text-xs font-black uppercase text-indigo-300">
            {cta.eyebrow}
          </p>
        ) : null}

        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
          {cta.title}
        </h2>

        {cta.description ? (
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
            {cta.description}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={cta.primaryHref}
            className="rounded-full bg-indigo-600 px-7 py-4 font-black"
          >
            {cta.primaryLabel}
          </Link>

          {cta.secondaryLabel && cta.secondaryHref ? (
            <Link
              href={cta.secondaryHref}
              className="rounded-full border border-white/20 px-7 py-4 font-black"
            >
              {cta.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}