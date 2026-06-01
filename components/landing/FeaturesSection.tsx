import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getHomeSolutions } from "@/sanity/lib/features";

export default async function FeaturesSection() {
  const expertises = await getHomeSolutions();

  if (!expertises?.length) return null;

  return (
    <section className="mx-auto max-w-6xl">
      <div className="text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Nos expertises
        </p>

        <h2 className="font-geist text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Des expertises pensées pour lancer votre SaaS plus vite
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
          Découvrez les accompagnements Vexly pour transformer votre audience en
          plateforme, produit SaaS ou actif digital rentable.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expertises.map((expertise) => (
          <Link
            key={expertise._id}
            href={expertise.href}
            className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-indigo-600">
              <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
            </div>

            <h3 className="text-xl font-bold leading-snug text-slate-900">
              {expertise.navLabel || expertise.title}
            </h3>

            {expertise.description ? (
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                {expertise.description}
              </p>
            ) : null}

            <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              {expertise.ctaLabel || "Découvrir l’expertise"}
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}