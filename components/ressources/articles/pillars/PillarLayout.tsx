"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleCTA } from "@/components/ressources/articles/articles/ArticleCTA";
import { ArticleProgressBar, TimelineItem } from "@/components/ressources/articles/articles/ArticleProgressBar";
import { ArticleSections } from "@/components/ressources/articles/articles/ArticleSections";

// ✅ On copie ArticleIntro en version "Guide" sans date
type PillarIntroProps = {
    title: string;
    subtitle?: string;
    tags: string[];
    coverImageUrl?: string;
};

const PillarIntro: React.FC<PillarIntroProps> = ({ title, subtitle, tags, coverImageUrl }) => {
    return (
        <section className="mb-12 space-y-6">
            <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Guide
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                    {title}
                </h1>

                {subtitle ? (
                    <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
                        {subtitle}
                    </p>
                ) : null}
            </div>

            {/* tags only */}
            {tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            ) : null}

            {coverImageUrl ? (
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60">
                    <img
                        src={coverImageUrl}
                        alt={title}
                        className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[320px]"
                    />
                </div>
            ) : null}
        </section>
    );
};

// même type que tes articles (body markdown)
export type PillarSection = {
    id?: string;
    heading?: string;
    body: string;
};

type PillarLayoutProps = {
    title: string;
    subtitle?: string;
    tags?: string[];
    niche?: string;
    coverImageUrl?: string;
    sections: PillarSection[];
    backHref?: string; // défaut /articles
};

export default function PillarLayout({
    title,
    subtitle,
    tags = [],
    niche,
    coverImageUrl,
    sections,
    backHref = "/articles",
}: PillarLayoutProps) {
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

            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
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
                    </div>

                    {niche ? (
                        <span className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            {niche}
                        </span>
                    ) : null}
                </div>
            </header>

            {sections.length > 0 ? (
                <ArticleProgressBar items={timelineItems} activeIndex={activeIndex} progress={scrollProgress} />
            ) : null}

            <main className="mx-auto max-w-5xl px-8 lg:px-16 py-10 lg:py-14 md:pl-28">
                <PillarIntro
                    title={title}
                    subtitle={subtitle}
                    tags={tags}
                    coverImageUrl={coverImageUrl}
                />

                <ArticleSections sections={sections as any} sectionRefs={sectionRefs} />

                <ArticleCTA />
            </main>
        </div>
    );
}
