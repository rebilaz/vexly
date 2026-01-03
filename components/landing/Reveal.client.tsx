"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

/**
 * Progressive enhancement wrapper for scroll animations.
 * Content is visible by default (SSR-friendly), animation enhances when JS loads.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || hasAnimated) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                        setHasAnimated(true);
                    }, delay);
                }
            },
            { threshold: 0.1, rootMargin: "-60px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [delay, hasAnimated]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0.01,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
            }}
        >
            {children}
        </div>
    );
}
