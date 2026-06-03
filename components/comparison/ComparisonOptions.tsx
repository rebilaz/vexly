import Link from "next/link";
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

type ComparisonOption = NonNullable<
  ComparisonPageContent["comparison"]
>["left"];

export default function ComparisonOptions({
  left,
  right,
}: {
  left?: ComparisonOption | null;
  right?: ComparisonOption | null;
}) {
  const options = [left, right];

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2 lg:px-8">
      {options.map((option, index) => (
        <article
          key={option?.name ?? index}
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
  );
}