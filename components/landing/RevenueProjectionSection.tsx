//components/landing/RevenueProjectionSection.ts

import Reveal from "./Reveal.client";

type Props = {
  title: string;
  description?: string;
  clients: number;
  pricePerMonth: number;
  mrr: number;
};

export default function RevenueProjectionSection({
  title,
  description,
  clients,
  pricePerMonth,
  mrr,
}: Props) {
  return (
    <Reveal className="mx-auto max-w-5xl text-center">
      <section>
        <h2 className="font-geist text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-center">
          {title}
        </h2>

        {description ? (
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}

        <div
          className="
          mt-14 
          rounded-3xl 
          border 
          border-slate-200 
          bg-white 
          px-10 
          py-12 
          shadow-sm
        "
        >
          <div
            className="
            flex 
            flex-wrap 
            items-center 
            justify-center 
            gap-x-6 
            gap-y-4
            font-geist
            text-3xl 
            sm:text-4xl 
            lg:text-5xl 
            font-semibold 
            text-slate-900
          "
          >
            <span className="text-indigo-600">{clients} clients</span>
            <span className="text-slate-300">×</span>
            <span className="text-indigo-600">
              {pricePerMonth}€
              <span className="ml-2 text-xl sm:text-2xl font-medium text-slate-400">
                / mois
              </span>
            </span>
            <span className="text-slate-300">=</span>
            <span className="rounded-2xl bg-slate-50 px-6 py-3 text-slate-900">

              {mrr.toLocaleString("fr-FR")}€
              <span className="ml-2 text-lg sm:text-xl font-medium text-slate-400">
                MRR
              </span>
            </span>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
