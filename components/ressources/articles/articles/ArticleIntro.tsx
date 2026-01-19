"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Tag } from "lucide-react";

type ArticleIntroProps = {
  title: string;
  subtitle?: string;

  // ✅ date optionnelle (sinon ça casse quand c’est undefined)
  date?: string;

  readingTime?: string;
  tags: string[];
  coverImageUrl?: string;
};

export const ArticleIntro: React.FC<ArticleIntroProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  tags,
  coverImageUrl,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 space-y-6"
    >
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Article
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            {subtitle}
          </p>
        )}
      </div>

      {/* meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
        {date ? (
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{date}</span>
          </div>
        ) : null}

        {readingTime ? (
          <>
            {date ? <span className="h-1 w-1 rounded-full bg-slate-300" /> : null}
            <div className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{readingTime}</span>
            </div>
          </>
        ) : null}

        {tags.length > 0 ? (
          <>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-slate-300" />
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="size-3.5" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {coverImageUrl ? (
        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60">
          <img
            src={coverImageUrl}
            alt={title}
            className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[320px]"
          />
        </div>
      ) : null}
    </motion.section>
  );
};
