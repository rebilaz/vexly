"use client";

import React from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Props = {
  total: number; // conservé si jamais
  query: string;
  onQueryChange: (v: string) => void;
};

export default function ArticlesHero({
  query,
  onQueryChange,
}: Props) {
  return (
    <header
      className="
        relative
        overflow-hidden
        border-b border-slate-100
        bg-white
        min-h-[75vh]
        flex
        items-center
      "
    >
      {/* Background texture */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.35]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Titre */}
          <h1
            className={[
              geist.className,
              "text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-10 leading-[1.02]",
            ].join(" ")}
          >
            Explorez, apprenez,{" "}
            <span className="text-indigo-600">bâtissez.</span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl leading-relaxed text-slate-600 max-w-2xl mb-16">
            Des guides pratiques et des retours d&apos;expérience pour accélérer
            sur le Design, le Code et le Business.
          </p>

          {/* Search */}
          <div className="relative max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Rechercher un sujet..."
              className="
                block
                w-full
                rounded-2xl
                py-5
                pl-12
                pr-12
                text-base
                text-slate-900
                ring-1 ring-inset ring-slate-200
                placeholder:text-slate-400
                focus:ring-2 focus:ring-indigo-600
                bg-white/90
                backdrop-blur
              "
            />

            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Effacer la recherche"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
