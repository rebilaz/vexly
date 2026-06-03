"use client";

import { useRef, useState, type ReactNode } from "react";
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

function isExternalLink(href: string, isExternal?: boolean) {
  return Boolean(isExternal || href.startsWith("http"));
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
  children: ReactNode;
  onClick?: () => void;
}) {
  if (!href) return null;

  if (isExternalLink(href, isExternal)) {
    return (
      <a
        href={href}
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
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function HeaderLogo({
  logoUrl,
  logoAlt,
  onClick,
}: {
  logoUrl?: string | null;
  logoAlt?: string | null;
  onClick?: () => void;
}) {
  if (!logoUrl) return null;

  return (
    <Link href="/" className="flex shrink-0 items-center" onClick={onClick}>
      <img
        src={logoUrl}
        alt={logoAlt ?? ""}
        width={150}
        height={40}
        className="block h-8 w-auto max-w-[150px] object-contain md:h-9"
        decoding="async"
      />
    </Link>
  );
}

function ChevronIcon({ isOpen = false }: { isOpen?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={[
        "transition-transform duration-200",
        isOpen ? "rotate-180" : "",
      ].join(" ")}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header({ data }: HeaderProps) {
  if (!data) return null;

  const navigation = data.navigation ?? [];
  const loginLink = data.loginLink;
  const cta = data.cta;

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

    if (!item.label || !links.length) return null;

    const isOpen = openMenu === index;

    return (
      <div key={`${item.label}-${index}`} className="relative inline-flex">
        <button
          type="button"
          onMouseEnter={() => open(index)}
          onMouseLeave={() => scheduleClose(index)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950"
        >
          {item.label}
          <span className="text-slate-400">
            <ChevronIcon isOpen={isOpen} />
          </span>
        </button>

        <div
          className="absolute left-0 top-full z-50 pt-4"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={() => scheduleClose(index)}
        >
          <div
            className={[
              "relative w-[390px] origin-top-left rounded-3xl border border-slate-200/80 bg-white/95 p-6 backdrop-blur-md",
              "shadow-[0_24px_70px_rgba(15,23,42,0.14)]",
              "transition-all duration-300 ease-out",
              isOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
            ].join(" ")}
          >
            <div className="absolute -top-4 left-0 h-4 w-full" />

            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {item.label}
              </p>
            </div>

            <div className="space-y-2">
              {links.map((link: SiteNavLink, linkIndex: number) => {
                if (!link.label || !link.href) return null;

                return (
                  <SmartLink
                    key={`${link.label}-${link.href}-${linkIndex}`}
                    href={link.href}
                    isExternal={link.isExternal}
                    onClick={forceClose}
                    className="group block rounded-2xl px-4 py-3.5 transition-all duration-200 hover:translate-x-1 hover:bg-slate-50"
                  >
                    <div className="text-[16px] font-semibold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-slate-950">
                      {link.label}
                    </div>

                    {link.description ? (
                      <div className="mt-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors duration-200 group-hover:text-slate-600">
                        {link.description}
                      </div>
                    ) : null}
                  </SmartLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopLink = (item: SiteNavItem, index: number) => {
    if (!item.label || !item.href) return null;

    return (
      <SmartLink
        key={`${item.label}-${index}`}
        href={item.href}
        isExternal={item.isExternal}
        onClick={forceClose}
        className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950"
      >
        {item.label}
      </SmartLink>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <HeaderLogo
            logoUrl={data.logoUrl}
            logoAlt={data.logoAlt}
            onClick={forceClose}
          />

          {navigation.length ? (
            <nav className="hidden items-center gap-3 md:flex">
              {navigation.map((item, index) =>
                item.type === "dropdown"
                  ? renderDesktopDropdown(item, index)
                  : renderDesktopLink(item, index)
              )}
            </nav>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 md:hidden"
            >
              <svg
                width="19"
                height="19"
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

            {loginLink?.isVisible !== false &&
            loginLink?.href &&
            loginLink?.label ? (
              <SmartLink
                href={loginLink.href}
                onClick={forceClose}
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-slate-950 md:inline-block"
              >
                {loginLink.label}
              </SmartLink>
            ) : null}

            {cta?.isVisible !== false && cta?.href && cta?.label ? (
              <SmartLink
                href={cta.href}
                onClick={forceClose}
                className="group hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_45px_rgba(88,80,236,0.4)] transition duration-200 hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.5)] active:scale-[0.97] md:inline-flex"
              >
                <span className="flex items-center gap-2">
                  {cta.label}
                  <ArrowRightIcon />
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
              <HeaderLogo
                logoUrl={data.logoUrl}
                logoAlt={data.logoAlt}
                onClick={forceClose}
              />

              <button
                type="button"
                onClick={forceClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-slate-950"
                aria-label="Fermer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 py-8">
              {navigation.length ? (
                <div className="flex flex-col gap-4">
                  {navigation.map((item, index) => {
                    if (!item.label) return null;

                    if (item.type === "dropdown") {
                      const links = item.items ?? [];

                      if (!links.length) return null;

                      return (
                        <details
                          key={`${item.label}-${index}`}
                          className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-slate-950">
                            {item.label}
                            <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                              <ChevronIcon />
                            </span>
                          </summary>

                          <div className="mt-4 flex flex-col gap-2">
                            {links.map((link, linkIndex) => {
                              if (!link.label || !link.href) return null;

                              return (
                                <SmartLink
                                  key={`${link.label}-${link.href}-${linkIndex}`}
                                  href={link.href}
                                  isExternal={link.isExternal}
                                  onClick={forceClose}
                                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                                >
                                  {link.label}
                                </SmartLink>
                              );
                            })}
                          </div>
                        </details>
                      );
                    }

                    if (!item.href) return null;

                    return (
                      <SmartLink
                        key={`${item.label}-${index}`}
                        href={item.href}
                        isExternal={item.isExternal}
                        onClick={forceClose}
                        className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-white hover:shadow-sm"
                      >
                        {item.label}
                      </SmartLink>
                    );
                  })}

                  {loginLink?.isVisible !== false &&
                  loginLink?.href &&
                  loginLink?.label ? (
                    <SmartLink
                      href={loginLink.href}
                      onClick={forceClose}
                      className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 text-base font-semibold text-slate-950 transition-all duration-200 hover:bg-white hover:shadow-sm"
                    >
                      {loginLink.label}
                    </SmartLink>
                  ) : null}
                </div>
              ) : null}

              {cta?.isVisible !== false && cta?.href && cta?.label ? (
                <div className="mt-10">
                  <SmartLink
                    href={cta.href}
                    onClick={forceClose}
                    className="group block w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3.5 text-center text-sm font-bold text-white shadow-[0_18px_45px_rgba(88,80,236,0.45)] transition duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {cta.label}
                      <ArrowRightIcon />
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