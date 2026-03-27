// components/landing/ExecutionMethodSection.tsx
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

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {/* STEP 1 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              1
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Semaine 1
              </div>
              <div className="text-lg font-semibold text-slate-900">
                On vous crée le design
              </div>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                On prépare une version claire, propre et moderne de votre futur SaaS.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              2
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Semaine 2
              </div>
              <div className="text-lg font-semibold text-slate-900">
                Vous validez, on branche tout
              </div>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                Une fois validé, on met tout en place pour rendre votre SaaS prêt à fonctionner.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-4">
            <div className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              3
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Semaine 3
              </div>
              <div className="text-lg font-semibold text-slate-900">
                Vous récupérez votre SaaS clé en main
              </div>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                Vous repartez avec un produit prêt à être présenté, utilisé et lancé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}