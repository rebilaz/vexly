"use client";

import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export function ParcoursHero() {
  return (
    <header className="relative border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="min-h-[70vh] flex items-center justify-center py-16">
          <div className="max-w-4xl text-center">
            <h1
              className={[
                geist.className,
                "text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.03]",
              ].join(" ")}
            >
              Passez de l&apos;idée à l&apos;action.
              <br />
              <span className="text-slate-500">Sans vous disperser.</span>
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
