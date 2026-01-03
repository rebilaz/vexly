"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Listing } from "@/lib/annuaire";
import { Image as SaaSImage } from "./Images";

type Props = {
    similar: Listing[];
};

/**
 * ✅ IMPORTANT
 * On évite les URLs ScreenshotOne (api.screenshotone.com) dans le carousel :
 * - ça provoque des 400 / rate limit / erreurs upstream en masse
 * - donc on affiche des previews statiques (ou placeholder) ici.
 *
 * Convention :
 * - public/marketplace/previews/{slug}.jpg
 * - public/placeholders/saas.jpg
 */
function getSafeImage(p: Listing) {
    if (p?.slug) return `/marketplace/previews/${p.slug}.jpg`;
    return "/placeholders/saas.jpg";
}

export function SimilarCarousel({ similar }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!containerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const scrollBy = (offset: number) => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    // ✅ init state (au mount + quand similar change)
    useEffect(() => {
        checkScroll();
        // petit timeout pour laisser le layout se stabiliser
        const t = setTimeout(checkScroll, 50);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [similar.length]);

    if (!similar.length) return null;

    return (
        <section className="relative mt-8">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-900">Produits similaires</h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => scrollBy(-320)}
                        disabled={!canScrollLeft}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all
              ${!canScrollLeft
                                ? "cursor-not-allowed opacity-40"
                                : "text-slate-700 hover:bg-slate-50 hover:shadow-md active:scale-95"
                            }`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={() => scrollBy(320)}
                        disabled={!canScrollRight}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all
              ${!canScrollRight
                                ? "cursor-not-allowed opacity-40"
                                : "text-slate-700 hover:bg-slate-50 hover:shadow-md active:scale-95"
                            }`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                onScroll={checkScroll}
                className="mt-6 flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {similar.map((p) => (
                    <div key={p.slug} className="flex-none w-[280px] sm:w-[320px] snap-start">
                        <Link
                            href={`/marketplace/${p.slug}`}
                            className="group block h-full rounded-2xl bg-white transition hover:opacity-100"
                        >
                            <div className="mb-4">
                                {/* ✅ image safe locale / placeholder (pas ScreenshotOne) */}
                                <SaaSImage image={getSafeImage(p)} name={p.name} />
                            </div>

                            <div className="px-1">
                                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-amber-600">
                                    {p.name}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                    {p.tagline || (p.content ? p.content.slice(0, 100) : "")}
                                </p>

                                <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                    {p.niche_category || "SaaS"}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
