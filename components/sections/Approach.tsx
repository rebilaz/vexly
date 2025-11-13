"use client";

import React from "react";
import { trackEvent } from "@/lib/tracking";

const Approach: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: "Audit rapide",
      text: "On identifie les blocages et les tâches à automatiser pour libérer ton temps.",
      color: "emerald",
    },
    {
      num: 2,
      title: "Système designé",
      text: "Je conçois un schéma clair et validé avant toute mise en place.",
      color: "sky",
    },
    {
      num: 3,
      title: "Automatisation & dashboard",
      text: "Tout est connecté, fluide et mesurable en un clin d’œil.",
      color: "emerald",
    },
  ] as const;

  const colorClasses: Record<
    (typeof steps)[number]["color"],
    { border: string; text: string }
  > = {
    emerald: {
      border: "border-emerald-400",
      text: "text-emerald-600",
    },
    sky: {
      border: "border-sky-400",
      text: "text-sky-600",
    },
  };

  const handleWhatsAppClick = () => {
    // AddToWishlist = clic WhatsApp (intent forte)
    trackEvent("AddToWishlist", 6, { source: "approach_whatsapp_cta" });
  };

  return (
    <section
      id="approach"
      className="relative py-20 border-t border-slate-200 bg-[#4158F0]"
    >
      {/* ✅ même halo qu'avant */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,244,246,1)_0%,rgba(243,244,246,0.9)_30%,rgba(243,244,246,0.6)_60%,rgba(243,244,246,0)_100%)]" />

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-10 lg:px-14 text-center">
        {/* En-tête */}
        <header className="mb-10 sm:mb-14">
          <p className="text-[0.85rem] uppercase tracking-[0.2em] text-slate-500 mb-2">
            Approche
          </p>
          <h2 className="text-[2rem] sm:text-[2.3rem] font-semibold text-slate-900 leading-tight">
            3 étapes pour un système fluide
          </h2>
          <p className="text-[0.98rem] text-slate-700 mt-3 max-w-xl mx-auto">
            Simple, efficace et 100% adapté à ton fonctionnement.
          </p>
        </header>

        {/* Vidéo centrale */}
        <div className="relative mx-auto max-w-3xl aspect-video overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-2xl shadow-slate-900/30 ring-1 ring-slate-300 mb-10 sm:mb-14">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/tOM3X2WvG9A" // 🔁 remplace par ton lien
            title="Présentation de l'approche"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Étapes – optimisées mobile */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3 text-center mb-10 sm:mb-14">
          {steps.map((step) => {
            const colors = colorClasses[step.color];
            return (
              <div
                key={step.num}
                className="flex flex-col items-center max-w-xs mx-auto"
              >
                <div
                  className={[
                    "h-12 w-12 rounded-full flex items-center justify-center text-[1rem] font-semibold mb-3 shadow-sm bg-white",
                    colors.border,
                    colors.text,
                  ].join(" ")}
                >
                  {step.num}
                </div>
                <h3 className="text-[1.15rem] font-semibold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-[0.95rem] text-slate-700 leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bouton WhatsApp */}
        <div className="flex justify-center">
          <a
            href="https://wa.me/33782979571?text=Salut%20Gabriel%2C%20je%20souhaite%20échanger%20à%20propos%20de%20l'automatisation%20de%20mon%20système%20!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-[0.98rem] font-semibold text-slate-950 shadow-lg shadow-emerald-900/25 hover:bg-emerald-400 active:scale-[0.97] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.89 11.89 0 0012 0C5.37 0 0 5.37 0 12a11.91 11.91 0 001.64 6.02L0 24l6.18-1.61A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.2-3.48-8.52zM12 22.1a10.05 10.05 0 01-5.15-1.41l-.37-.22-3.67.96.98-3.58-.24-.38A10.06 10.06 0 012 12C2 6.49 6.49 2 12 2c2.67 0 5.18 1.04 7.07 2.93A10.06 10.06 0 0122 12c0 5.51-4.49 10.1-10 10.1zm5.23-7.56c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14s-.74.91-.91 1.1-.34.2-.62.07a8.3 8.3 0 01-2.45-1.51 9.17 9.17 0 01-1.7-2.12c-.18-.31-.02-.48.13-.63.13-.13.31-.34.46-.51.15-.17.2-.29.3-.48.1-.2.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49h-.55c-.18 0-.48.07-.73.34-.25.26-.96.94-.96 2.3s.98 2.67 1.12 2.86c.14.19 1.93 3.05 4.67 4.28.65.28 1.15.45 1.54.57.65.21 1.24.18 1.7.11.52-.08 1.66-.68 1.89-1.34.23-.65.23-1.21.16-1.34-.07-.12-.26-.19-.55-.33z" />
            </svg>
            Me contacter sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Approach;
