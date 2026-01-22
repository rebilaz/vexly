"use client";

import Image from "next/image";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export function ParcoursHero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-100">
      {/* Background image – BRUTE */}
      <div className="absolute inset-0">
        <Image
          src="/ressources/parcours/Hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Fondu bas UNIQUEMENT */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="min-h-[70vh] flex items-center justify-center py-16">
          <div className="max-w-4xl text-center">
            <h1
              className={[
                geist.className,
                "text-5xl sm:text-6xl lg:text-7xl",
                "font-extrabold tracking-tight leading-[1.03]",
                "text-slate-900",
              ].join(" ")}
            >
              Passez de l&apos;idée à l&apos;action.
              <br />
              <span className="text-slate-500">
                Sans vous disperser.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600">
              Des parcours guidés pour avancer vite sur un objectif précis.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
