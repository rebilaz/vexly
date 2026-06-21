import Link from "next/link";

import type { ToolPage } from "@/sanity/lib/outils";

type ToolResourcesSectionProps = {
  tool: ToolPage;
};

export function ToolResourcesSection({
  tool,
}: ToolResourcesSectionProps) {
  const related = tool.relatedSection;
  const faq = tool.faqSection;

  if (!related && !faq) {
    return null;
  }

  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        {related?.items?.length ? (
          <div>
            <div className="text-center">
              <p className="text-xs font-black uppercase text-indigo-600">
                {related.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
                {related.title}
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {related.items.map((item) => (
                <Link
                  key={item._key}
                  href={item.href}
                  className="rounded-3xl border bg-white p-7"
                >
                  {item.label ? (
                    <p className="text-xs font-black uppercase text-indigo-600">
                      {item.label}
                    </p>
                  ) : null}

                  <h3 className="mt-4 text-2xl font-black">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {faq?.items?.length ? (
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-black uppercase text-indigo-600">
                {faq.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
                {faq.title}
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faq.items.map((item) => (
                <details
                  key={item._key}
                  className="rounded-3xl border bg-white p-6"
                >
                  <summary className="cursor-pointer text-xl font-black">
                    {item.question}
                  </summary>

                  <p className="mt-4 leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}