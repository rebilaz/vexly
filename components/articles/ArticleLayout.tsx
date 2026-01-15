"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { ArticleCTA } from "@/components/articles/ArticleCTA";
import {
  ArticleProgressBar,
  TimelineItem,
} from "@/components/articles/ArticleProgressBar";

import { ArticleIntro } from "./ArticleIntro";
import { ArticleSections } from "./ArticleSections";

export type ArticleSection = {
  id?: string;
  heading?: string;
  body: string; // MARKDOWN
};

type PillarNav = {
  title: string;
  slug: string;
  href: string; // ex: "/trouver-une-idee-rentable"
  breadcrumbBase?: string; // ex: "/articles"
};

type ArticleLayoutProps = {
  title: string;
  subtitle?: string;

  // ✅ date optionnelle (cohérent avec ArticleIntro)
  date?: string;

  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  sections: ArticleSection[];
  backHref?: string;

  // ✅ NEW
  pillar?: PillarNav;
};

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  tags = [],
  niche,
  coverImageUrl,
  sections,
  backHref = "/",
  pillar,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

  const timelineItems: TimelineItem[] = React.useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.heading ?? "",
      })),
    [sections]
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const elements = sectionRefs.current;
      if (!elements.length) return;

      const targetY = window.innerHeight * 0.3;
      let closestIndex = 0;
      let minDistance = Infinity;

      elements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);

      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header interne */}
      <header className="mt-2 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
            >
              <ArrowLeft className="size-4" />
              Retour
            </Link>

            {/* ✅ Breadcrumb style /articles/pillar/article */}
            {pillar?.href ? (
              <nav className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="h-4 w-px bg-slate-200" />
                <Link
                  href={pillar.breadcrumbBase ?? "/articles"}
                  className="hover:text-indigo-600"
                >
                  articles
                </Link>
                <ChevronRight className="size-3" />
                <Link href={pillar.href} className="hover:text-indigo-600">
                  {pillar.slug}
                </Link>
                <ChevronRight className="size-3" />
                <span className="text-slate-700 font-medium line-clamp-1 max-w-[220px]">
                  {title}
                </span>
              </nav>
            ) : null}
          </div>

          {niche ? (
            <span className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {niche}
            </span>
          ) : null}
        </div>
      </header>

      {sections.length > 0 ? (
        <ArticleProgressBar
          items={timelineItems}
          activeIndex={activeIndex}
          progress={scrollProgress}
        />
      ) : null}

      <main className="mx-auto max-w-5xl px-8 lg:px-16 py-10 lg:py-14 md:pl-28">
        {/* ✅ Petit bloc "fait partie du guide" au-dessus du H1 */}
        {pillar?.href ? (
          <div className="mb-6 max-w-3xl">
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
            >
              <BookOpen className="size-4" />
              Ce guide fait partie du hub :{" "}
              <span className="font-semibold">{pillar.title}</span>
              <span className="text-slate-400">→</span>
            </Link>
          </div>
        ) : null}

        <ArticleIntro
          title={title}
          subtitle={subtitle}
          date={date}
          readingTime={readingTime}
          tags={tags}
          coverImageUrl={coverImageUrl}
        />

        <ArticleSections sections={sections} sectionRefs={sectionRefs} />

        {/* ✅ Retour au guide en bas */}
        {pillar?.href ? (
          <section className="mt-14 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Retour au guide central
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Si tu veux la vue d’ensemble (et les autres articles du parcours),
              reviens sur le hub :
            </p>
            <div className="mt-4">
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <BookOpen className="size-4" />
                {pillar.title}
              </Link>
            </div>
          </section>
        ) : null}

        <ArticleCTA />
      </main>
    </div>
  );
};
