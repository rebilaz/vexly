"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ListChecks, GraduationCap } from "lucide-react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Props = {
  slug: string;
  level: string;
  duration: string;
  title: string;
  description: string;
  steps: string;
  bullets?: string[];
  comingSoon?: boolean;
  imageSrc?: string;
  featured?: boolean;
  imagePosition?: "center" | "top" | "bottom";
};

export function ParcoursCard({
  slug,
  level,
  duration,
  title,
  description,
  steps,
  bullets = [],
  comingSoon = false,
  imageSrc,
  featured = false,
  imagePosition = "center",
}: Props) {
  const isLink = !comingSoon;
  const Wrapper: any = isLink ? Link : "div";
  const wrapperProps = isLink ? { href: `/parcours/${slug}` } : {};

  const objectPos =
    imagePosition === "top"
      ? "object-top"
      : imagePosition === "bottom"
        ? "object-bottom"
        : "object-center";

  const hasImage = Boolean(imageSrc);

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        "group block",
        comingSoon ? "cursor-not-allowed" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl border bg-white",
          "border-slate-200/80",
          "shadow-[0_8px_22px_rgba(2,6,23,0.05)]",
          "transition",
          !comingSoon
            ? "hover:-translate-y-[1px] hover:shadow-[0_14px_40px_rgba(2,6,23,0.08)] hover:border-slate-300/80"
            : "opacity-90",
        ].join(" ")}
      >
        {/* Bandeau image ULTRA FIN (ou placeholder si pas d’image) */}
        <div className="relative h-24 sm:h-28 bg-slate-50">
          {hasImage ? (
            <Image
              src={imageSrc!}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className={["object-cover", objectPos].join(" ")}
              priority={featured}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />
          )}

          {/* Badge bientôt */}
          {comingSoon && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-sm">
                Bientôt
              </span>
            </div>
          )}
        </div>

        {/* Content compact */}
        <div className="px-5 py-5">
          {/* Icon + meta (une seule ligne max) */}
          <div className="mb-3 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span className="font-medium text-slate-700">{level}</span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {duration}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <ListChecks className="h-3.5 w-3.5 text-slate-400" />
                  {steps}
                </span>
              </div>
            </div>
          </div>

          {/* Title (clamp 2) */}
          <h3
            className={[
              geist.className,
              "text-base sm:text-lg font-semibold tracking-tight text-slate-900",
              "leading-snug line-clamp-2",
            ].join(" ")}
          >
            {title}
          </h3>

          {/* Description (clamp 2) */}
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {description}
          </p>

          {/* Bullets (1 seule ligne pour garder compact) */}
          {bullets.length > 0 && (
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span className="leading-relaxed line-clamp-1">
                {bullets[0]}
              </span>
            </div>
          )}

          {/* CTA compact */}
          <div className="mt-5 flex items-center justify-between">
            <span
              className={[
                "text-sm font-semibold",
                comingSoon ? "text-slate-400" : "text-slate-900",
              ].join(" ")}
            >
              {comingSoon ? "Disponible bientôt" : "Voir le parcours"}
            </span>

            <ArrowRight
              className={[
                "h-4 w-4 transition-transform",
                comingSoon
                  ? "text-slate-300"
                  : "text-slate-400 group-hover:translate-x-0.5",
              ].join(" ")}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
