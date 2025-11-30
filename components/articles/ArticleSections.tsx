"use client";

import React from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { ArticleSection } from "./ArticleLayout";

type ArticleSectionsProps = {
  sections: ArticleSection[];
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
};

export const ArticleSections: React.FC<ArticleSectionsProps> = ({
  sections,
  sectionRefs,
}) => {
  return (
    <section className="space-y-20">
      {sections.map((section, index) => (
        <motion.article
          key={section.id ?? `${index}-${section.heading ?? "section"}`}
          id={section.id}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.4,
            delay: index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          {section.heading && (
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-slate-900">
              {section.heading}
            </h2>
          )}

          <ReactMarkdown
            components={{
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
            {section.body}
          </ReactMarkdown>
        </motion.article>
      ))}
    </section>
  );
};
