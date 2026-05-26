import Link from "next/link";
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

function WinnerBadge({ winner }: { winner?: string | null }) {
  if (!winner || winner === "tie") {
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        Égalité
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
      Gagnant
    </span>
  );
}

export default function ComparisonLayout({
  page,
  backHref = "/articles",
}: {
  page: ComparisonPageContent;
  backHref?: string;
}) {
  const hero = page.hero;
  const left = page.comparison?.left;
  const right = page.comparison?.right;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 lg:px-8">
        <Link
          href={backHref}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Retour
        </Link>

        {hero?.eyebrow ? (
          <p className="mt-10 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {hero.eyebrow}
          </p>
        ) : null}

        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          {hero?.title ?? page.title}
        </h1>

        {hero?.description ? (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {hero.description}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {hero?.primaryCtaHref && hero?.primaryCtaLabel ? (
            <Link
              href={hero.primaryCtaHref}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {hero.primaryCtaLabel}
            </Link>
          ) : null}

          {hero?.secondaryCtaHref && hero?.secondaryCtaLabel ? (
            <Link
              href={hero.secondaryCtaHref}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {hero.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2 lg:px-8">
        {[left, right].map((option, index) => (
          <article
            key={index}
            className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
          >
            {option?.label ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {option.label}
              </span>
            ) : null}

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              {option?.name}
            </h2>

            {option?.description ? (
              <p className="mt-4 leading-7 text-slate-600">
                {option.description}
              </p>
            ) : null}

            {option?.price ? (
              <p className="mt-6 text-xl font-bold text-slate-950">
                {option.price}
              </p>
            ) : null}

            {option?.ctaHref && option?.ctaLabel ? (
              <Link
                href={option.ctaHref}
                className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {option.ctaLabel}
              </Link>
            ) : null}
          </article>
        ))}
      </section>

      {page.criteria.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="grid grid-cols-4 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-700">
              <div>Critère</div>
              <div>Option gauche</div>
              <div>Option droite</div>
              <div>Résultat</div>
            </div>

            {page.criteria.map((criterion) => (
              <div
                key={criterion._key}
                className="grid grid-cols-4 gap-4 border-t border-slate-100 px-6 py-5 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-950">
                    {criterion.label}
                  </p>
                  {criterion.description ? (
                    <p className="mt-1 text-slate-500">
                      {criterion.description}
                    </p>
                  ) : null}
                </div>

                <div className="text-slate-600">{criterion.leftValue}</div>
                <div className="text-slate-600">{criterion.rightValue}</div>
                <div>
                  <WinnerBadge winner={criterion.winner} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {page.highlights.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {page.highlights.map((highlight) => (
              <article
                key={highlight._key}
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

      {page.useCases.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Cas d’usage
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {page.useCases.map((useCase) => (
              <article
                key={useCase._key}
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

      {page.faq?.items?.length ? (
        <section className="mx-auto max-w-4xl px-6 pb-16 lg:px-8">
          {page.faq.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {page.faq.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {page.faq.title}
          </h2>

          <div className="mt-8 space-y-4">
            {page.faq.items.map((item) => (
              <article
                key={item._key}
                className="rounded-2xl bg-slate-50 p-6"
              >
                <h3 className="font-bold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
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
    </main>
  );
}