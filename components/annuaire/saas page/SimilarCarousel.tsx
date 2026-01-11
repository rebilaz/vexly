"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Listing } from "@/lib/marketplace";
import { Image as SaaSImage } from "./Images";

type Props = {
    similar: Listing[];
};

function getImage(p: Listing) {
    if (p?.image && typeof p.image === "string" && p.image.trim()) return p.image.trim();
    return "/placeholders/saas.jpg";
}

function setBtnState(btn: HTMLButtonElement, enabled: boolean) {
    // Conserve EXACTEMENT le même LUX que ton template (disabled = opacity-40 + cursor-not-allowed)
    btn.disabled = !enabled;

    // On applique la bonne classe selon l'état, sans React state
    // Base classes communes: (déjà dans className)
    // Disabled: "cursor-not-allowed opacity-40"
    // Enabled: "text-slate-700 hover:bg-slate-50 hover:shadow-md active:scale-95"
    btn.classList.toggle("cursor-not-allowed", !enabled);
    btn.classList.toggle("opacity-40", !enabled);

    btn.classList.toggle("text-slate-700", enabled);
    btn.classList.toggle("hover:bg-slate-50", enabled);
    btn.classList.toggle("hover:shadow-md", enabled);
    btn.classList.toggle("active:scale-95", enabled);
}

export function SimilarCarousel({ similar }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftBtnRef = useRef<HTMLButtonElement>(null);
    const rightBtnRef = useRef<HTMLButtonElement>(null);

    // RAF throttle (anti-spam)
    const rafRef = useRef<number | null>(null);

    const updateButtons = () => {
        const el = containerRef.current;
        const leftBtn = leftBtnRef.current;
        const rightBtn = rightBtnRef.current;
        if (!el || !leftBtn || !rightBtn) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        const canLeft = scrollLeft > 0;
        const canRight = scrollLeft + clientWidth < scrollWidth - 1;

        setBtnState(leftBtn, canLeft);
        setBtnState(rightBtn, canRight);
    };

    const onScroll = () => {
        if (rafRef.current != null) return;
        rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null;
            updateButtons();
        });
    };

    const scrollBy = (offset: number) => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollBy({ left: offset, behavior: "smooth" });
    };

    useEffect(() => {
        // Init
        updateButtons();

        const el = containerRef.current;
        if (!el) return;

        // Listener scroll (passive + throttled)
        el.addEventListener("scroll", onScroll, { passive: true });

        // Re-check après layout (images, fonts, etc.)
        const t = window.setTimeout(updateButtons, 60);

        // Re-check aussi sur resize (responsive)
        window.addEventListener("resize", updateButtons, { passive: true });

        return () => {
            window.clearTimeout(t);
            el.removeEventListener("scroll", onScroll as any);
            window.removeEventListener("resize", updateButtons as any);
            if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [similar.length]);

    if (!similar.length) return null;

    return (
        <section className="relative mt-8">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-900">Produits similaires</h2>

                <div className="flex gap-2">
                    <button
                        ref={leftBtnRef}
                        onClick={() => scrollBy(-320)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all
              cursor-not-allowed opacity-40`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        ref={rightBtnRef}
                        onClick={() => scrollBy(320)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all
              text-slate-700 hover:bg-slate-50 hover:shadow-md active:scale-95`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
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
                                <SaaSImage image={getImage(p)} name={p.name} />
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
