import Link from "next/link";
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

export default function ComparisonExtraSections({
  page,
}: {
  page: ComparisonPageContent;
}) {
  const highlights = page.highlights ?? [];
  const useCases = page.useCases ?? [];
  const faqItems = page.faq?.items ?? [];

  return (
    <>
      {highlights.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight._key ?? highlight.title}
                className="rounded-3xl bg-slate-50 p-6"
              >
                <h3 className="text-lg font-bold text-slate-950">
                  {highlight.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {useCases.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Cas d’usage
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <article
                key={useCase._key ?? useCase.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="text-lg font-bold text-slate-950">
                  {useCase.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {faqItems.length > 0 ? (
        <section className="mx-auto max-w-4xl px-6 pb-16 lg:px-8">
          {page.faq?.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {page.faq.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {page.faq?.title}
          </h2>

          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <article
                key={item._key ?? item.question}
                className="rounded-2xl bg-slate-50 p-6"
              >
                <h3 className="font-bold text-slate-950">
                  {item.question}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.cta?.title ? (
        <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight">
              {page.cta.title}
            </h2>

            {page.cta.description ? (
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                {page.cta.description}
              </p>
            ) : null}

            {page.cta.buttonHref && page.cta.buttonLabel ? (
              <Link
                href={page.cta.buttonHref}
                className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
              >
                {page.cta.buttonLabel}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}