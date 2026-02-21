import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { ArticleSection } from "./ArticleLayout";

// marker utilisé par le système d'internal linking auto
const AUTO_MARKER = "<!--il:auto-->";

type ArticleSectionsProps = {
  sections: ArticleSection[];
};

export const ArticleSections: React.FC<ArticleSectionsProps> = ({ sections }) => {
  return (
    <section className="space-y-20">
      {sections.map((section, index) => {
        // ✅ Nettoyage UNIQUEMENT pour l’affichage
        const cleanBody = section.body.replaceAll(AUTO_MARKER, "");

        return (
          <article
            key={section.id ?? `${index}-${section.heading ?? "section"}`}
            id={section.id}
            className="max-w-3xl"
          >
            {section.heading ? (
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-slate-900">
                {section.heading}
              </h2>
            ) : null}

            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  const url = String(href ?? "");

                  // Liens internes
                  if (url.startsWith("/")) {
                    return (
                      <Link
                        href={url}
                        className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                      >
                        {children}
                      </Link>
                    );
                  }

                  // Liens externes
                  return (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                    >
                      {children}
                    </a>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-4 text-[15px] leading-relaxed text-slate-700">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ml-5 list-disc space-y-1 text-[15px] text-slate-700">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-5 list-decimal space-y-1 text-[15px] text-slate-700">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-slate-900">
                    {children}
                  </strong>
                ),
              }}
            >
              {cleanBody}
            </ReactMarkdown>
          </article>
        );
      })}
    </section>
  );
};