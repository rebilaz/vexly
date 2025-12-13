"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/AuthSection";

type MenuId = "solutions" | "ressources" | null;

const CLOSE_DELAY_MS = 220;

export default function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId>(null);

  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = (id: Exclude<MenuId, null>) => {
    clearCloseTimer();
    setOpenMenu(id);
  };

  const scheduleClose = (id: Exclude<MenuId, null>) => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu((cur) => (cur === id ? null : cur));
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  };

  const forceClose = () => {
    clearCloseTimer();
    setOpenMenu(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={forceClose}>
            <Image
              src="/vexly-logo-2-full-gradient.svg"
              alt="Vexly logo"
              width={32}
              height={32}
              className="h-7 w-auto cursor-pointer"
              priority
            />
          </Link>

          {/* Navigation (desktop) */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
            {/* SOLUTIONS */}
            <div className="relative inline-flex">
              {/* IMPORTANT: ouverture seulement sur le bouton */}
              <button
                type="button"
                onMouseEnter={() => open("solutions")}
                onMouseLeave={() => scheduleClose("solutions")}
                aria-expanded={openMenu === "solutions"}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Solutions <span className="text-[9px]">▾</span>
              </button>

              {/* Panneau: garde ouvert tant que la souris est dedans */}
              <div className="absolute left-0 top-full z-50 mt-2">
                <div
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={() => scheduleClose("solutions")}
                  className={[
                    "relative w-[320px] rounded-xl border border-slate-200/80 bg-white/95 p-4 text-xs shadow-lg",
                    "transition-all duration-150",
                    openMenu === "solutions"
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none",
                  ].join(" ")}
                >
                  {/* bridge invisible anti-trou */}
                  <div className="absolute -top-2 left-0 h-2 w-full" />

                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Types de SaaS
                  </div>

                  <div className="mb-3 flex flex-col gap-1">
                    <Link
                      href="/solutions/saas-ia"
                      onClick={forceClose}
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      SaaS IA
                    </Link>
                    <Link
                      href="/solutions/automation"
                      onClick={forceClose}
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      SaaS d&apos;automation
                    </Link>
                    <Link
                      href="/solutions/seo"
                      onClick={forceClose}
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      SaaS SEO
                    </Link>
                    <Link
                      href="/solutions/marketing"
                      onClick={forceClose}
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      SaaS marketing
                    </Link>
                    <Link
                      href="/solutions/marketplaces"
                      onClick={forceClose}
                      className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      Plateformes &amp; marketplaces
                    </Link>
                    <Link
                      href="/solutions"
                      onClick={forceClose}
                      className="mt-1 rounded-md px-2 py-1.5 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      Voir toutes les solutions
                    </Link>
                  </div>

                  <div className="mt-2 border-t border-slate-100 pt-3">
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Pour qui ?
                    </div>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/personas/createurs"
                        onClick={forceClose}
                        className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        Pour créateurs
                      </Link>
                      <Link
                        href="/personas/freelances"
                        onClick={forceClose}
                        className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        Pour freelances
                      </Link>
                      <Link
                        href="/personas/entreprises"
                        onClick={forceClose}
                        className="rounded-md px-2 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        Pour entreprises
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/templates"
              onClick={forceClose}
              className="transition-colors hover:text-slate-900"
            >
              Templates SaaS
            </Link>

            <Link
              href="/tarifs"
              onClick={forceClose}
              className="transition-colors hover:text-slate-900"
            >
              Tarifs
            </Link>

            {/* RESSOURCES */}
            <div className="relative inline-flex">
              {/* IMPORTANT: ouverture seulement sur le bouton */}
              <button
                type="button"
                onMouseEnter={() => open("ressources")}
                onMouseLeave={() => scheduleClose("ressources")}
                aria-expanded={openMenu === "ressources"}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Ressources <span className="text-[9px]">▾</span>
              </button>

              <div className="absolute left-0 top-full z-50 mt-2">
                <div
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={() => scheduleClose("ressources")}
                  className={[
                    "relative w-[260px] rounded-xl border border-slate-200/80 bg-white/95 p-2 text-xs shadow-lg",
                    "transition-all duration-150",
                    openMenu === "ressources"
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="absolute -top-2 left-0 h-2 w-full" />

                  <Link
                    href="/ressources"
                    onClick={forceClose}
                    className="block rounded-lg px-3 py-2.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <div className="font-semibold">Ressources</div>
                    <div className="text-[10px] text-slate-500">Vue d’ensemble</div>
                  </Link>

                  <Link
                    href="/articles"
                    onClick={forceClose}
                    className="block rounded-lg px-3 py-2.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <div className="font-semibold">Articles</div>
                    <div className="text-[10px] text-slate-500">Explorer</div>
                  </Link>

                  <Link
                    href="/parcours"
                    onClick={forceClose}
                    className="block rounded-lg px-3 py-2.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <div className="font-semibold">Parcours</div>
                    <div className="text-[10px] text-slate-500">Étape par étape</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/faq" onClick={forceClose} className="transition-colors hover:text-slate-900">
              FAQ
            </Link>
          </nav>

          {/* Connexion + CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/connexion"
              onClick={forceClose}
              className="hidden text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 md:inline-block"
            >
              Connexion
            </Link>

            <button
              onClick={() => setAuthOpen(true)}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.55)] transition hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.65)] active:scale-[0.97]"
            >
              <span className="flex items-center gap-2">
                Créer mon SaaS <span className="text-sm">→</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal Auth */}
      {authOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute right-3 top-3 text-sm text-slate-400 transition hover:text-slate-600"
            >
              ✕
            </button>
            <AuthSection variant="modal" />
          </div>
        </div>
      )}
    </>
  );
}
