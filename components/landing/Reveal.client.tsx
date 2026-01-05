"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

/**
 * Progressive enhancement wrapper for scroll animations.
 * SSR + first client render are identical (no inline style).
 * Animation is applied only after hydration to avoid hydration mismatch.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    // IMPORTANT: false on first client render => matches SSR
    const [hydrated, setHydrated] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        const el = ref.current;
        if (!el || hasAnimated) return;

        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

        if (prefersReduced) return;

        // Set initial hidden state AFTER hydration only
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";
        el.style.willChange = "opacity, transform";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                const run = () => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    setHasAnimated(true);
                    observer.disconnect();
                };

                if (delay > 0) {
                    window.setTimeout(run, delay);
                } else {
                    run();
                }
            },
            { threshold: 0.1, rootMargin: "-60px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hydrated, hasAnimated, delay]);

    // SSR + first client render => NO inline styles at all
    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
