// components/landing/ExecutionMethodSection.tsx
"use client";

import React from "react";

export default function ExecutionMethodSection() {
  return (
    <section className="mx-auto max-w-6xl">
      {/* Divider */}
      <div className="h-px w-full bg-slate-200" />

      {/* Timeline */}
      <div className="relative mt-16">
        {/* Line */}
        <div className="absolute left-0 right-0 top-4 h-px bg-slate-200" />

        <div className="grid grid-cols-3 gap-12 text-center">
          {/* STEP 1 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              1
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Semaine 1
              </div>
              <div className="text-sm font-semibold text-slate-900">
                Cadrage & scope
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Audit", "User flows", "Backlog"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              2
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Semaine 2
              </div>
              <div className="text-sm font-semibold text-slate-900">
                Développement
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Stack scalable", "Sprints", "QA"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              3
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Semaine 3
              </div>
              <div className="text-sm font-semibold text-slate-900">
                Livraison
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Déploiement", "Transfert IP", "Docs"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
