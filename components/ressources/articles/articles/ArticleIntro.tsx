import React from "react";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";

type ArticleIntroProps = {
  title: string;
  subtitle?: string;
  date?: string;
  readingTime?: string;
  tags: string[];
  coverImageUrl?: string;

  /**
   * Ajuste le point de focus du crop si une image est "décalée"
   * Exemple: "70% 40%" (plus à droite + un peu plus haut)
   * Par défaut: "50% 50%" (centré, marche pour la majorité)
   */
  coverFocus?: string;

  /**
   * Par défaut on fait "cover" (crop propre).
   * Si tu veux absolument éviter le crop pour certaines images, passe "contain".
   */
  fit?: "cover" | "contain";
};

export const ArticleIntro: React.FC<ArticleIntroProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  tags,
  coverImageUrl,
  coverFocus = "50% 50%",
  fit = "cover",
}) => {
  const isContain = fit === "contain";

  return (
    <section className="mb-12 space-y-6">
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Article
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

        {tags?.length ? (
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
        <div className="relative mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-100/60 h-[220px] sm:h-[280px] lg:h-[320px]">
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            priority
            className={isContain ? "object-contain" : "object-cover"}
            style={{
              objectPosition: coverFocus,
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
          />
        </div>
      ) : null}
    </section>
  );
};