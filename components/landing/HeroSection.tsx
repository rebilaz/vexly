// components/landing/HeroSection

import Link from "next/link";
import SaasPreview from "./SaasPreview";

type HeroSectionProps = {
  eyebrow: string;
  titleline1: string;
  titlehighlight: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function HeroSection({
  eyebrow,
  titleline1,
  titlehighlight,
  description,
  primaryCtaLabel = "Créer ma plateforme",
  primaryCtaHref = "/#formulaire",
  secondaryCtaLabel = "Découvrir Vexly",
  secondaryCtaHref = "/#services",
}: HeroSectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F8FAFC] px-6 py-20 text-slate-950 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute -left-40 bottom-[-22rem] h-[38rem] w-[38rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-28 bottom-[-18rem] h-[32rem] w-[32rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute -left-16 bottom-[-14rem] h-[26rem] w-[26rem] rounded-full border border-indigo-100" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-bl-[7rem] bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-16 top-20 hidden h-32 w-32 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative z-10">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur">
              {eyebrow}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              <span className="block">{titleline1}</span>
              <span className="block">{titlehighlight}</span>
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full bg-indigo-600" />

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link
                href={primaryCtaHref}
                className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.32)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
              >
                {primaryCtaLabel}
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative z-0 lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[720px]">
              <div className="pointer-events-none absolute -inset-12 rounded-[40px] bg-gradient-to-tr from-indigo-300/25 via-sky-200/15 to-violet-300/20 blur-2xl transform-gpu will-change-transform" />

              <div className="relative transform-gpu rotate-[-6deg] [transform:rotate(-6deg)_rotateY(-10deg)]">
                <div className="relative h-[440px] w-[820px] max-w-none -mr-[220px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl will-change-transform [contain:layout_paint_style] [content-visibility:auto] lg:h-[480px] lg:-mr-[260px]">
                  <div className="relative -translate-y-[46px] lg:-translate-y-[60px]">
                    <SaasPreview />
                  </div>
                </div>

                <div className="pointer-events-none absolute right-[-220px] top-[60px] h-[420px] w-[220px] rounded-[28px] bg-slate-900/5 blur-2xl" />
              </div>

              <div className="pointer-events-none absolute left-10 top-8 h-20 w-56 rotate-[-12deg] rounded-full bg-white/45 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}