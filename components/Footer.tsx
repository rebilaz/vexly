"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

import type {
  SiteSettings,
  SiteNavLink,
} from "@/sanity/lib/siteSettings";

type FooterProps = {
  year?: number;
  data?: SiteSettings["footer"];
};

function isExternalLink(href: string, isExternal?: boolean) {
  return Boolean(
    isExternal ||
      href.startsWith("http://") ||
      href.startsWith("https://")
  );
}

function FooterLink({
  link,
  className,
}: {
  link: SiteNavLink;
  className?: string;
}) {
  if (!link.href || !link.label) {
    return null;
  }

  if (isExternalLink(link.href, link.isExternal)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

const Footer: React.FC<FooterProps> = ({ year, data }) => {
  if (!data) {
    return null;
  }

  const currentYear = year ?? new Date().getFullYear();
  const columns = data.columns ?? [];
  const legalLinks = data.legalLinks ?? [];

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.8fr)] lg:gap-20">
          {/* Logo, description et e-mail */}
          <div className="space-y-5">
            {data.logoUrl ? (
              <Link href="/" className="inline-flex items-center gap-2">
                <img
                  src={data.logoUrl}
                  alt={data.logoAlt ?? ""}
                  className="h-7 w-auto"
                />
              </Link>
            ) : null}

            {data.description ? (
              <p className="max-w-sm text-sm leading-6 text-slate-400">
                {data.description}
              </p>
            ) : null}

            {data.email ? (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-indigo-400"
              >
                <Mail size={16} aria-hidden="true" />
                <span>{data.email}</span>
              </a>
            ) : null}
          </div>

          {/* Navigation, expertises et affiliation */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {columns.map((column, columnIndex) => {
              const links = column.links ?? [];
              const isLastColumn = columnIndex === columns.length - 1;

              if (!column.title && !links.length) {
                return null;
              }

              return (
                <div
                  key={`${column.title ?? "column"}-${columnIndex}`}
                  className={`space-y-4 ${
                    isLastColumn ? "lg:justify-self-end" : ""
                  }`}
                >
                  {column.title ? (
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {column.title}
                    </h3>
                  ) : null}

                  {links.length ? (
                    <ul className="space-y-3 text-sm">
                      {links.map((link, linkIndex) => {
                        if (!link.label || !link.href) {
                          return null;
                        }

                        return (
                          <li
                            key={`${link.label}-${link.href}-${linkIndex}`}
                          >
                            <FooterLink
                              link={link}
                              className="transition-colors hover:text-indigo-400"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {data.copyright || legalLinks.length ? (
        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-10">
            <div className="flex flex-col items-center gap-3 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-left">
              {data.copyright ? (
                <span>
                  © {currentYear} {data.copyright}
                </span>
              ) : null}

              {legalLinks.length ? (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {legalLinks.map((link, index) => {
                    if (!link.label || !link.href) {
                      return null;
                    }

                    return (
                      <FooterLink
                        key={`${link.label}-${link.href}-${index}`}
                        link={link}
                        className="transition-colors hover:text-indigo-400"
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
};

export default Footer;