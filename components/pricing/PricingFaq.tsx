"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "La propriété intellectuelle m’appartient-elle ?",
    a: "Absolument. Une fois le paiement effectué et le projet livré, vous êtes 100% propriétaire du code source, du design et des assets. Aucune redevance future.",
  },
  {
    q: "Quel est le délai moyen de livraison ?",
    a: "Pour le pack Starter, on peut livrer très vite. Le pack Growth prend généralement 7 à 10 jours ouvrés selon les personnalisations et intégrations.",
  },
  {
    q: "Puis-je upgrade plus tard ?",
    a: "Oui. Tu peux commencer Starter puis passer Growth/Custom quand tu veux (tu paies la différence selon le scope).",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-16 max-w-3xl pb-8">
      <h2 className="text-center text-3xl font-extrabold text-white">Questions fréquentes</h2>

      <div className="mt-8 space-y-4">
        {FAQ.map((item, idx) => {
          const isOpen = open === idx;

          return (
            <div
              key={item.q}
              className={cx(
                "rounded-2xl border backdrop-blur-xl transition-all duration-300",
                isOpen
                  ? "border-indigo-500/30 bg-indigo-900/10 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
                  : "border-white/12 bg-white/[0.035] hover:border-white/18",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
              >
                <span className={cx("text-sm font-semibold", isOpen ? "text-white" : "text-white/85")}>
                  {item.q}
                </span>

                <ChevronDown
                  className={cx(
                    "h-4 w-4 shrink-0 transition-transform duration-300",
                    isOpen ? "rotate-180 text-indigo-300" : "text-white/55",
                  )}
                />
              </button>

              {/* Contenu (comme Gemini : padding séparé) */}
              {isOpen && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-white/65">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
