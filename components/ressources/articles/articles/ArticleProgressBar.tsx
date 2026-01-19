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
  progress: number; // 0 -> 1
};

export const ArticleProgressBar: React.FC<ArticleProgressBarProps> = ({
  progress,
}) => {
  const ratio = Math.min(1, Math.max(0, progress));

  return (
    <div className="pointer-events-none fixed left-6 top-28 bottom-10 z-20 hidden md:flex flex-col items-start">
      <div className="relative h-full w-[3px] bg-slate-200/70 rounded-full overflow-hidden">
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: `${ratio * 100}%` }}
          transition={{
            duration: 0.1, // super fluide
            ease: "linear",
          }}
          className="absolute left-0 top-0 w-full bg-indigo-500"
        />
      </div>
    </div>
  );
};
