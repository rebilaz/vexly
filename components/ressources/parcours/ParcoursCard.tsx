"use client";

import Link from "next/link";
import { ArrowRight, Clock, ListChecks } from "lucide-react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

type Props = {
  slug: string;
  level: string;
  duration: string;
  title: string;
  description: string;
  steps: string;
  bullets?: string[];
  comingSoon?: boolean;
};

export function ParcoursCard({
  slug,
  level,
  duration,
  title,
  description,
  steps,
  bullets = [],
  comingSoon = false,
}: Props) {
  const Wrapper: any = comingSoon ? "div" : Link;
  const wrapperProps = comingSoon
    ? {}
    : { href: `/parcours/${slug}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        "group relative block overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-slate-200/70 transition-all",
        "hover:shadow-xl hover:shadow-slate-200/50 hover:ring-slate-300",
        comingSoon ? "cursor-not-allowed" : "",
      ].join(" ")}
    >
      {/* background glow subtil */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">
        {/* meta ligne simple (moins de chips) */}
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{level}</span>
          <span className="inline-flex items-center gap-2 text-slate-500">
            <Clock className="h-4 w-4" /> {duration}
          </span>
          <span className="inline-flex items-center gap-2 text-slate-500">
            <ListChecks className="h-4 w-4" /> {steps}
          </span>

          {comingSoon && (
            <span className="ml-auto rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Bientôt
            </span>
          )}
        </div>

        <h2
          className={[
            geist.className,
            "text-3xl font-extrabold tracking-tight text-slate-900 leading-[1.08]",
            comingSoon ? "" : "group-hover:text-indigo-600 transition-colors",
          ].join(" ")}
        >
          {title}
        </h2>

        <p className="mt-4 text-base leading-relaxed text-slate-600 max-w-2xl">
          {description}
        </p>

        {/* aperçu steps (3 max) */}
        {bullets.length > 0 && (
          <div className="mt-6 grid gap-2 text-sm text-slate-700">
            {bullets.slice(0, 3).map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span className="line-clamp-1">{b}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-slate-200/60 pt-5">
          <span className="text-sm font-semibold text-slate-900">
            {comingSoon ? "Disponible bientôt" : "Voir le parcours"}
          </span>

          <ArrowRight
            className={[
              "h-5 w-5 transition-all",
              comingSoon
                ? "text-slate-300"
                : "text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5",
            ].join(" ")}
          />
        </div>
      </div>
    </Wrapper>
  );
}
