"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Header from "@/components/Header";
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

type ArticleLayoutProps = {
  title: string;
  subtitle?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  niche?: string;
  coverImageUrl?: string;
  sections: ArticleSection[];
  backHref?: string;
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
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // refs des sections pour savoir laquelle est "au centre"
  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

  // items de la timeline
  const timelineItems: TimelineItem[] = React.useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.heading ?? "",
      })),
    [sections]
  );

  // détecte la section active + progression globale au scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const elements = sectionRefs.current;
      if (!elements.length) return;

      // 1) section active
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

      // 2) progression globale du scroll (0 -> 1)
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
      <Header niche={niche ?? "Article"} />

      {/* Header interne */}
      <header className="mt-2 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 lg:px-8 py-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Link>

          {niche && (
            <span className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {niche}
            </span>
          )}
        </div>
      </header>

      {/* Timeline à gauche */}
      {sections.length > 0 && (
        <ArticleProgressBar
          items={timelineItems}
          activeIndex={activeIndex}
          progress={scrollProgress}
        />
      )}

      <main className="mx-auto max-w-5xl px-8 lg:px-16 py-10 lg:py-14 md:pl-28">
        <ArticleIntro
          title={title}
          subtitle={subtitle}
          date={date}
          readingTime={readingTime}
          tags={tags}
          coverImageUrl={coverImageUrl}
        />

        <ArticleSections sections={sections} sectionRefs={sectionRefs} />

        <ArticleCTA />
      </main>
    </div>
  );
};
