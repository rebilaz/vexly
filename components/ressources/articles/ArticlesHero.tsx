"use client";

import { Search } from "lucide-react";
import type { ArticlesContent } from "@/content/article";

export default function ArticlesHeroClient({
  hero,
  query,
  onQueryChange,
}: {
  hero: ArticlesContent["hero"];
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <picture className="absolute inset-0">
        <img
          src="/Gemini_Generated_Image_vdi976vdi976vdi9.webp"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>

      <div className="absolute inset-0 bg-white/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
          {hero.titleline1}
          <br />
          {hero.titlehighlight}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {hero.description}
        </p>
      </div>
    </header>
  );
}