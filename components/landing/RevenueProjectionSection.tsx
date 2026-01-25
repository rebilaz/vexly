import React from "react";
import Link from "next/link";
import Reveal from "./Reveal.client";

type Props = {
  clients: number;
  pricePerMonth: number;
  mrr: number;
  ctaLabel: string;
};

export default function RevenueProjectionSection({
  clients,
  pricePerMonth,
  mrr,
  ctaLabel,
}: Props) {
  return (
    <Reveal className="mx-auto max-w-5xl text-center">
      <section>
        {/* TITRE GROS / IMPACT */}
        <h2 className="font-geist text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-center">

          À quoi ça peut{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ressembler financièrement
          </span>
        </h2>

        {/* BLOC CHIFFRES */}
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

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/form"
              className="
              inline-flex 
              items-center 
              gap-2 
              rounded-full 
              bg-slate-900 
              px-8 
              py-4 
              font-geist 
              text-sm 
              font-semibold 
              text-white 
              shadow-lg 
              transition 
              hover:scale-[1.04] 
              active:scale-[0.97]
            "
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
