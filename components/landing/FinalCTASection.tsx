import React from "react";
import Link from "next/link";

type FinalCTASectionProps = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
};

const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  title,
  subtitle,
  primaryCtaLabel,
}) => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 text-white lg:px-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -right-24 top-[-40px] h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-[-40px] h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-200">{subtitle}</p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/form"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/40 transition hover:scale-[1.03] active:scale-[0.97]"
          >
            {primaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
