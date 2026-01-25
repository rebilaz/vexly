"use client";

import React from "react";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  year?: number;
};

const Footer: React.FC<FooterProps> = ({ year }) => {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* ----- Contenu principal ----- */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        {/* Mobile-first grid: stack, puis 3 colonnes */}
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr] md:gap-12">
          {/* ----- Logo + contact ----- */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Image
                src="/vexly-logo-2-full-gradient.svg"
                alt="VEXLY"
                width={32}
                height={32}
                className="h-7 w-auto"
              />
            </div>

            <a
              href="mailto:contact@vexly.fr"
              className="inline-flex items-center gap-2 text-sm transition hover:text-indigo-400"
            >
              <Mail size={16} /> contact@vexly.fr
            </a>
          </div>

          {/* ----- Navigation (mobile: 2 petites colonnes) ----- */}
          <div className="grid grid-cols-2 gap-10 sm:max-w-md md:max-w-none">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Produit
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/marketplace"
                    className="transition hover:text-indigo-400"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tarifs"
                    className="transition hover:text-indigo-400"
                  >
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ressources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/articles"
                    className="transition hover:text-indigo-400"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-indigo-400"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ----- Newsletter ----- */}
          <div className="md:pl-6">
            <h3 className="text-lg font-semibold text-white">Reste informé</h3>
            <p className="mt-2 text-sm text-slate-400">
              Une fois par semaine, un email sur les SaaS clés en main, l’IA &amp;
              l’automatisation.
            </p>

            {/* Mobile: stack plein width, sm+: inline */}
            <form
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="h-11 w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(99,102,241,0.35)] transition hover:brightness-110 sm:w-auto"
              >
                S&apos;inscrire
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500">
              En vous inscrivant, vous acceptez notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="underline underline-offset-4 hover:text-indigo-400"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ----- Bas de page ----- */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-5">
          {/* Mobile: centered + wrap clean, md: row */}
          <div className="flex flex-col items-center gap-3 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-left">
            <span>© {currentYear} VEXLY — Tous droits réservés.</span>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link
                href="/mentions-legales"
                className="transition hover:text-indigo-400"
              >
                Mentions légales
              </Link>
              <Link
                href="/conditions-generales"
                className="transition hover:text-indigo-400"
              >
                CGU / CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
