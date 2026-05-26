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
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/vexly-logo-2-full-white.svg"
                alt="VEXLY"
                width={32}
                height={32}
                className="h-7 w-auto"
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Vexly conçoit des SaaS, outils IA et automatisations pour aider les
              créateurs et business digitaux à lancer plus vite.
            </p>

            <a
              href="mailto:contact@vexly.fr"
              className="inline-flex items-center gap-2 text-sm transition hover:text-indigo-400"
            >
              <Mail size={16} /> contact@vexly.fr
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tarifs" className="transition hover:text-indigo-400">
                  Tarifs
                </Link>
              </li>

              <li>
                <Link href="/articles" className="transition hover:text-indigo-400">
                  Articles
                </Link>
              </li>

              <li>
                <Link
                  href="/expertises"
                  className="transition hover:text-indigo-400"
                >
                  Expertises
                </Link>
              </li>

              <li>
                <Link
                  href="/ressources"
                  className="transition hover:text-indigo-400"
                >
                  Ressources
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Informations
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="transition hover:text-indigo-400">
                  Contact
                </Link>
              </li>

   
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="transition hover:text-indigo-400"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-5">
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