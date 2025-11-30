"use client";

import { motion } from "motion/react";
import Link from "next/link";

export const ArticleCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-10 py-7 sm:py-9 text-white shadow-lg shadow-slate-900/30"
    >
      <div className="max-w-2xl space-y-3">
        <h3 className="text-xl sm:text-2xl font-semibold">
          Envie d’aller plus loin avec cette thématique ?
        </h3>
        <p className="text-sm sm:text-base text-slate-300">
          Contacte-moi pour transformer cette idée en projet concret :
          site, outil, SaaS ou contenu plus approfondi.
        </p>
      </div>

      <div className="mt-5">
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 sm:px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
        >
          Me contacter
        </Link>
      </div>
    </motion.section>
  );
};
