"use client";

import React from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

import type { SiteSettings, SiteNavLink } from "@/sanity/lib/siteSettings";

type FooterProps = {
  year?: number;
  data?: SiteSettings["footer"];
};

function isExternalLink(href?: string, isExternal?: boolean) {
  return Boolean(isExternal || href?.startsWith("http"));
}

function FooterLink({
  link,
  className,
}: {
  link: SiteNavLink;
  className?: string;
}) {
  const href = link.href || "/";

  if (isExternalLink(href, link.isExternal)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {link.label}
    </Link>
  );
}

const Footer: React.FC<FooterProps> = ({ year, data }) => {
  const currentYear = year ?? new Date().getFullYear();

  const logoUrl = data?.logoUrl || "/vexly-logo-2-full-white.svg";
  const logoAlt = data?.logoAlt || "VEXLY";
  const description =
    data?.description ||
    "Vexly conçoit des SaaS, outils IA et automatisations pour aider les créateurs et business digitaux à lancer plus vite.";
  const email = data?.email || "contact@vexly.fr";
  const columns = data?.columns ?? [];
  const legalLinks = data?.legalLinks ?? [];
  const copyright = data?.copyright || "VEXLY — Tous droits réservés.";

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <img src={logoUrl} alt={logoAlt} className="h-7 w-auto" />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              {description}
            </p>

            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm transition hover:text-indigo-400"
              >
                <Mail size={16} /> {email}
              </a>
            ) : null}
          </div>

          {columns.map((column, columnIndex) => (
            <div key={`${column.title}-${columnIndex}`} className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {column.title}
              </h3>

              <ul className="space-y-3 text-sm">
                {(column.links ?? []).map((link, linkIndex) => (
                  <li key={`${link.label}-${link.href}-${linkIndex}`}>
                    <FooterLink
                      link={link}
                      className="transition hover:text-indigo-400"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col items-center gap-3 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-left">
            <span>
              © {currentYear} {copyright}
            </span>

            {legalLinks.length ? (
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {legalLinks.map((link, index) => (
                  <FooterLink
                    key={`${link.label}-${link.href}-${index}`}
                    link={link}
                    className="transition hover:text-indigo-400"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;