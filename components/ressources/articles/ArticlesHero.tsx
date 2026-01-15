"use client";

import React from "react";
import { Search } from "lucide-react";

export default function ArticlesHeroClient({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond — INCHANGÉE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/Gemini_Generated_Image_vdi976vdi976vdi9.webp')",
        }}
      />


      {/* Contenu */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
          Apprenez vite.
          <br />
          Construisez juste.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Une sélection d’articles clairs et concrets pour avancer sur la
          validation, le produit, le code et la croissance.
        </p>

        {/* Search minimaliste */}
        <div className="relative mt-10 max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Rechercher un article…"
            className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm
                       text-slate-900 placeholder:text-slate-400
                       ring-1 ring-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>
    </header>
  );
}
