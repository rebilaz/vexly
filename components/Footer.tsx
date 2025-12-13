"use client";

import React from "react";
import { Linkedin, Mail } from "lucide-react";
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
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">

          {/* ----- Bloc gauche : logo + contact ----- */}
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center gap-2">
              <Image
                src="/vexly-logo-2-full-gradient.svg"
                alt="VEXLY"
                width={32}
                height={32}
                className="h-7 w-auto"
              />
            </div>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@vexly.fr"
                  className="flex items-center gap-2 transition hover:text-indigo-400"
                >
                  <Mail size={16} /> contact@vexly.fr
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-indigo-400"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* ----- Bloc centre : navigation ----- */}
          <div className="flex flex-1 gap-12 text-sm">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Produit
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/solutions" className="hover:text-indigo-400 transition">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-indigo-400 transition">
                    Templates SaaS
                  </Link>
                </li>
                <li>
                  <Link href="/tarifs" className="hover:text-indigo-400 transition">
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ressources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/articles" className="hover:text-indigo-400 transition">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-indigo-400 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-indigo-400 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ----- Bloc droit : newsletter ----- */}
          <div className="flex-1 max-w-sm">
            <h3 className="mb-3 text-lg font-semibold text-white">
              Reste informé
            </h3>
            <p className="mb-5 text-sm text-slate-400">
              Une fois par semaine, un email sur les SaaS clés en main, l’IA
              & l’automatisation.
            </p>

            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(99,102,241,0.35)] transition hover:brightness-110"
              >
                S&apos;inscrire
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500">
              En vous inscrivant, vous acceptez notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="underline hover:text-indigo-400"
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-slate-500 md:flex-row">
          <span>© {currentYear} VEXLY — Tous droits réservés.</span>

          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-indigo-400 transition">
              Mentions légales
            </Link>
            <Link href="/conditions-generales" className="hover:text-indigo-400 transition">
              CGU / CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
