"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import type {
  SiteSettings,
  SiteNavItem,
  SiteNavLink,
} from "@/sanity/lib/siteSettings";

type HeaderProps = {
  data?: SiteSettings["header"];
};

const CLOSE_DELAY_MS = 220;

function isExternalLink(href?: string, isExternal?: boolean) {
  return Boolean(isExternal || href?.startsWith("http"));
}

function SmartLink({
  href,
  isExternal,
  className,
  children,
  onClick,
}: {
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const safeHref = href || "/";

  if (isExternalLink(safeHref, isExternal)) {
    return (
      <a
        href={safeHref}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Header({ data }: HeaderProps) {
  const navigation = data?.navigation ?? [];
  const logoUrl = data?.logoUrl || "/vexly-logo-2-full-gradient.svg";
  const logoAlt = data?.logoAlt || "Vexly logo";
  const loginLink = data?.loginLink;
  const cta = data?.cta;

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = (index: number) => {
    clearCloseTimer();
    setOpenMenu(index);
  };

  const scheduleClose = (index: number) => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu((cur) => (cur === index ? null : cur));
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  };

  const forceClose = () => {
    clearCloseTimer();
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const renderDesktopDropdown = (item: SiteNavItem, index: number) => {
    const links = item.items ?? [];

    return (
      <div key={`${item.label}-${index}`} className="relative inline-flex">
        <button
          type="button"
          onMouseEnter={() => open(index)}
          onMouseLeave={() => scheduleClose(index)}
          aria-expanded={openMenu === index}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          {item.label} <span className="text-[9px]">▾</span>
        </button>

        <div className="absolute left-0 top-full z-50 mt-2">
          <div
            onMouseEnter={clearCloseTimer}
            onMouseLeave={() => scheduleClose(index)}
            className={[
              "relative w-[320px] rounded-xl border border-slate-200/80 bg-white/95 p-2 text-xs shadow-lg",
              "transition-all duration-150",
              openMenu === index
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0",
            ].join(" ")}
          >
            <div className="absolute -top-2 left-0 h-2 w-full" />

            {links.map((link: SiteNavLink, linkIndex: number) => (
              <SmartLink
                key={`${link.label}-${link.href}-${linkIndex}`}
                href={link.href}
                isExternal={link.isExternal}
                onClick={forceClose}
                className="block rounded-lg px-3 py-2.5 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="font-semibold">{link.label}</div>

                {link.description ? (
                  <div className="mt-0.5 text-[10px] leading-snug text-slate-500">
                    {link.description}
                  </div>
                ) : null}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopLink = (item: SiteNavItem, index: number) => {
    return (
      <SmartLink
        key={`${item.label}-${index}`}
        href={item.href}
        isExternal={item.isExternal}
        onClick={forceClose}
        className="transition-colors hover:text-slate-900"
      >
        {item.label}
      </SmartLink>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/" className="flex items-center" onClick={forceClose}>
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-7 w-auto cursor-pointer"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
            {navigation.map((item, index) =>
              item.type === "dropdown"
                ? renderDesktopDropdown(item, index)
                : renderDesktopLink(item, index)
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white md:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {loginLink?.isVisible !== false && loginLink?.href ? (
              <SmartLink
                href={loginLink.href}
                onClick={forceClose}
                className="hidden text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 md:inline-block"
              >
                {loginLink.label || "Connexion"}
              </SmartLink>
            ) : null}

            {cta?.isVisible !== false && cta?.href ? (
              <SmartLink
                href={cta.href}
                onClick={forceClose}
                className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.55)] transition hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.65)] active:scale-[0.97] md:inline-flex"
              >
                <span className="flex items-center gap-2">
                  {cta.label || "Créer mon SaaS"}{" "}
                  <span className="text-sm">→</span>
                </span>
              </SmartLink>
            ) : null}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          <button
            aria-label="Fermer le menu"
            onClick={forceClose}
            className="absolute inset-0 bg-slate-950/25 backdrop-blur-sm"
          />

          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <Link
                href="/"
                onClick={forceClose}
                className="flex items-center gap-2"
              >
                <img src={logoUrl} alt={logoAlt} className="h-6 w-auto" />

                <span className="text-sm font-semibold text-slate-900">
                  Vexly
                </span>
              </Link>

              <button
                onClick={forceClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-8">
              <div className="flex flex-col items-center gap-5">
                {navigation.map((item, index) => {
                  if (item.type === "dropdown") {
                    return (
                      <details
                        key={`${item.label}-${index}`}
                        className="group w-full"
                      >
                        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400">
                          {item.label}
                          <span className="text-slate-400 transition group-open:rotate-180">
                            ▾
                          </span>
                        </summary>

                        <div className="mt-4 flex flex-col items-center gap-4">
                          {(item.items ?? []).map((link, linkIndex) => (
                            <SmartLink
                              key={`${link.label}-${link.href}-${linkIndex}`}
                              href={link.href}
                              isExternal={link.isExternal}
                              onClick={forceClose}
                              className="text-center text-sm font-medium text-slate-700 underline decoration-slate-200 underline-offset-8 hover:text-slate-900"
                            >
                              {link.label}
                            </SmartLink>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <SmartLink
                      key={`${item.label}-${index}`}
                      href={item.href}
                      isExternal={item.isExternal}
                      onClick={forceClose}
                      className="text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400"
                    >
                      {item.label}
                    </SmartLink>
                  );
                })}

                {loginLink?.isVisible !== false && loginLink?.href ? (
                  <SmartLink
                    href={loginLink.href}
                    onClick={forceClose}
                    className="text-base font-medium text-slate-900 underline decoration-slate-200 underline-offset-8 hover:decoration-slate-400"
                  >
                    {loginLink.label || "Connexion"}
                  </SmartLink>
                ) : null}
              </div>

              {cta?.isVisible !== false && cta?.href ? (
                <div className="mt-10">
                  <SmartLink
                    href={cta.href}
                    onClick={forceClose}
                    className="block w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.45)] transition hover:brightness-110 active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {cta.label || "Créer mon SaaS"}{" "}
                      <span className="text-base">→</span>
                    </span>
                  </SmartLink>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}