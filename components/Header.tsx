"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthSection } from "@/components/AuthSection";

type MenuId = "ressources" | null;

const CLOSE_DELAY_MS = 220;

export default function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
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
            <Link
              href="/marketplace"
              onClick={forceClose}
              className="transition-colors hover:text-slate-900"
            >
              Marketplace
            </Link>

            <Link
              href="/tarifs"
              onClick={forceClose}
              className="transition-colors hover:text-slate-900"
            >
              Tarifs
            </Link>

            {/* RESSOURCES (desktop hover) */}
            <div className="relative inline-flex">
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
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
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
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Desktop only: Connexion */}
            <Link
              href="/connexion"
              onClick={forceClose}
              className="hidden text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 md:inline-block"
            >
              Connexion
            </Link>

            {/* Desktop only: CTA */}
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden md:inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.55)] transition hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.65)] active:scale-[0.97]"
            >
              <span className="flex items-center gap-2">
                Créer mon SaaS <span className="text-sm">→</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDE PANEL (minimal) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* overlay */}
          <button
            aria-label="Fermer le menu"
            onClick={forceClose}
            className="absolute inset-0 bg-slate-950/25 backdrop-blur-sm"
          />

          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/vexly-logo-2-full-gradient.svg"
                  alt="Vexly logo"
                  width={28}
                  height={28}
                  className="h-6 w-auto"
                />
                <span className="text-sm font-semibold text-slate-900">Vexly</span>
              </div>

              <button
                onClick={forceClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-8">
              {/* links centered + underlined */}
              <div className="flex flex-col items-center gap-5">
                <Link
                  href="/marketplace"
                  onClick={forceClose}
                  className="text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400"
                >
                  Marketplace
                </Link>

                <Link
                  href="/tarifs"
                  onClick={forceClose}
                  className="text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400"
                >
                  Tarifs
                </Link>

                <details className="group w-full">
                  <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400">
                    Ressources
                    <span className="text-slate-400 transition group-open:rotate-180">▾</span>
                  </summary>

                  <div className="mt-4 flex flex-col items-center gap-4">
                    <Link
                      href="/ressources"
                      onClick={forceClose}
                      className="text-sm font-medium text-slate-700 underline decoration-slate-200 underline-offset-8 hover:text-slate-900"
                    >
                      Vue d’ensemble
                    </Link>
                    <Link
                      href="/articles"
                      onClick={forceClose}
                      className="text-sm font-medium text-slate-700 underline decoration-slate-200 underline-offset-8 hover:text-slate-900"
                    >
                      Articles
                    </Link>
                    <Link
                      href="/parcours"
                      onClick={forceClose}
                      className="text-sm font-medium text-slate-700 underline decoration-slate-200 underline-offset-8 hover:text-slate-900"
                    >
                      Parcours
                    </Link>
                  </div>
                </details>

                <Link
                  href="/connexion"
                  onClick={forceClose}
                  className="text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400"
                >
                  Connexion
                </Link>
              </div>

              {/* CTA only here */}
              <div className="mt-10">
                <button
                  onClick={() => {
                    forceClose();
                    setAuthOpen(true);
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.45)] transition hover:brightness-110 active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Créer mon SaaS <span className="text-base">→</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
