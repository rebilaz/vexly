"use client";

import React from "react";
import { motion } from "motion/react";

export type TimelineItem = {
  id?: string;
  label: string;
};

type ArticleProgressBarProps = {
  items: TimelineItem[];
  activeIndex: number;
  /** progression globale du scroll, entre 0 et 1 */
  progress: number;
};

export const ArticleProgressBar: React.FC<ArticleProgressBarProps> = ({
  items,
  activeIndex,
  progress,
}) => {
  // hauteur de la barre = progression globale du scroll
  const ratio = Math.min(1, Math.max(0, progress));
  const targetHeight = `${ratio * 100}%`;

  // petites marges haut/bas pour les points
  const railTop = 8; // %
  const railBottom = 92; // %
  const railRange = railBottom - railTop;

  return (
    <div className="pointer-events-none fixed left-6 top-28 bottom-10 z-20 hidden md:flex flex-col items-start">
      <div className="relative h-full w-[2px] bg-slate-200/70 rounded-full">
        {/* Barre qui monte avec le scroll */}
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: targetHeight }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.2,
          }}
          className="absolute left-0 top-0 w-[2px] origin-top bg-gradient-to-b from-indigo-500 via-indigo-400 to-sky-400"
        />

        {/* Points + labels fixes le long de la barre */}
        {items.map((item, index) => {
          const topPercent =
            items.length === 1
              ? (railTop + railBottom) / 2
              : railTop + (index / (items.length - 1)) * railRange;

          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          const dotClass = isActive
            ? "bg-indigo-500 border-indigo-500 shadow-[0_0_0_4px_rgba(79,70,229,0.35)]"
            : isPast
            ? "bg-indigo-100 border-indigo-400"
            : "bg-white border-indigo-200";

          const textClass = isActive
            ? "text-indigo-600"
            : isPast
            ? "text-slate-500"
            : "text-slate-400";

          return (
            <div
              key={item.id ?? index}
              className="absolute -left-[7px] flex flex-col items-start"
              style={{ top: `${topPercent}%` }}
            >
              <div
                className={[
                  "h-4 w-4 rounded-full border-[2px] transition-all duration-200",
                  dotClass,
                ].join(" ")}
              />
              {item.label && (
                <div
                  className={[
                    "mt-2 ml-5 w-44 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
                    textClass,
                  ].join(" ")}
                >
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
