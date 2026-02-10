import React from "react";
import Link from "next/link";
import type { Listing } from "@/lib/marketplace";

function stripMarkdownTitleLine(text: string, name?: string) {
  if (!text || !name) return text;

  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^\\s*#\\s*${escaped}\\s*$`, "im");

  return text.replace(regex, "").trim();
}

function cleanForPlainText(markdown: string) {
  return (
    markdown
      // images ![alt](url) -> alt
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      // ⚠️ NE PAS supprimer les liens markdown ici : on les rend cliquables plus bas
      // titres ### -> (ligne)
      .replace(/^\s{0,3}#{1,6}\s+/gm, "")
      // emphase ** **, * *
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      // code inline ``
      .replace(/`([^`]+)`/g, "$1")
      // blockquotes >
      .replace(/^\s{0,3}>\s?/gm, "")
      // horizontal rules --- / ***
      .replace(/^\s{0,3}(-{3,}|\*{3,})\s*$/gm, "\n---\n")
      .trim()
  );
}

type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "hr" }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function isLikelyHeading(line: string) {
  const t = line.trim();
  if (!t) return false;
  if (t.length < 8 || t.length > 72) return false;
  if (/[.:;]$/.test(t)) return false;
  return true;
}

function parseBlocks(text: string): Block[] {
  const lines = text.split("\n").map((l) => l.replace(/\s+$/g, ""));
  const blocks: Block[] = [];

  let i = 0;
  const consumeBlank = () => {
    while (i < lines.length && !lines[i].trim()) i++;
  };

  consumeBlank();

  // Lead = premier paragraphe
  let leadLines: string[] = [];
  while (i < lines.length && lines[i].trim() && lines[i].trim() !== "---") {
    if (/^(\-|\*|•)\s+/.test(lines[i].trim()) || /^\d+\.\s+/.test(lines[i].trim())) break;
    leadLines.push(lines[i].trim());
    i++;
  }

  const lead = leadLines.join(" ").replace(/\s{2,}/g, " ").trim();
  if (lead) blocks.push({ type: "lead", text: lead });

  // Reste
  while (i < lines.length) {
    consumeBlank();
    if (i >= lines.length) break;

    const line = lines[i].trim();

    if (line === "---") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // UL
    if (/^(\-|\*|•)\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!/^(\-|\*|•)\s+/.test(l)) break;
        items.push(l.replace(/^(\-|\*|•)\s+/, "").trim());
        i++;
      }
      if (items.length) blocks.push({ type: "ul", items });
      continue;
    }

    // OL
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!/^\d+\.\s+/.test(l)) break;
        items.push(l.replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      if (items.length) blocks.push({ type: "ol", items });
      continue;
    }

    // Heading heuristique
    if (isLikelyHeading(line)) {
      const next = lines[i + 1]?.trim() ?? "";
      if (!next || next === "---") {
        blocks.push({ type: "h", text: line });
        i++;
        continue;
      }
    }

    // Paragraphe
    const pLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l) break;
      if (l === "---") break;
      if (/^(\-|\*|•)\s+/.test(l) || /^\d+\.\s+/.test(l)) break;
      pLines.push(l);
      i++;
    }

    const p = pLines.join(" ").replace(/\s{2,}/g, " ").trim();
    if (p) blocks.push({ type: "p", text: p });
  }

  return blocks;
}

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function trimTrailingPunct(s: string) {
  // évite les liens qui embarquent ")" "." "," ":" ";" "!"
  const m = s.match(/^(.*?)([)\].,;:!?]+)?$/);
  return { core: (m?.[1] ?? s), trail: (m?.[2] ?? "") };
}

function renderInline(text: string) {
  // 1) Liens Markdown: [label](href)
  // 2) Liens internes nus: /articles/...
  // 3) URLs externes: https://...
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  const pattern =
    /\[([^\]]+)\]\(([^)]+)\)|\bhttps?:\/\/[^\s]+|\/[a-zA-Z0-9\-/_]+/g;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const start = match.index;
    const end = pattern.lastIndex;

    if (start > cursor) parts.push(text.slice(cursor, start));

    // Markdown link
    if (match[1] && match[2]) {
      const label = match[1];
      const hrefRaw = match[2];
      const { core: href, trail } = trimTrailingPunct(hrefRaw);

      if (isInternalHref(href)) {
        parts.push(
          <Link
            key={`${start}-${end}`}
            href={href}
            className="font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
          >
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`${start}-${end}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
          >
            {label}
          </a>
        );
      }

      if (trail) parts.push(trail);
      cursor = end;
      continue;
    }

    // Bare url or bare internal path
    const raw = match[0];
    const { core, trail } = trimTrailingPunct(raw);

    if (isInternalHref(core)) {
      parts.push(
        <Link
          key={`${start}-${end}`}
          href={core}
          className="font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
        >
          {core}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`${start}-${end}`}
          href={core}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
        >
          {core}
        </a>
      );
    }

    if (trail) parts.push(trail);
    cursor = end;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function ConceptOverview({ listing }: { listing: Listing }) {
  const raw = listing.content ? stripMarkdownTitleLine(listing.content, listing.name) : "";
  const fullText = raw ? cleanForPlainText(raw) : "";
  if (!fullText) return null;

  const blocks = parseBlocks(fullText);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        Analyse complète
      </h2>

      <div className="mx-auto mt-6 max-w-[68ch]">
        <div className="space-y-4">
          {blocks.map((b, idx) => {
            if (b.type === "hr") {
              return <hr key={idx} className="my-6 border-slate-200" />;
            }

            if (b.type === "h") {
              return (
                <h3 key={idx} className="mt-10 text-xl font-bold tracking-tight text-slate-900">
                  {renderInline(b.text)}
                </h3>
              );
            }

            if (b.type === "lead") {
              return (
                <p
                  key={idx}
                  className="text-xl font-medium leading-relaxed tracking-tight text-slate-900"
                >
                  {renderInline(b.text)}
                </p>
              );
            }

            if (b.type === "ul") {
              return (
                <ul key={idx} className="space-y-2 pl-5">
                  {b.items.map((it, j) => (
                    <li key={j} className="list-disc text-[17px] leading-8 text-slate-800">
                      {renderInline(it)}
                    </li>
                  ))}
                </ul>
              );
            }

            if (b.type === "ol") {
              return (
                <ol key={idx} className="space-y-2 pl-5">
                  {b.items.map((it, j) => (
                    <li key={j} className="list-decimal text-[17px] leading-8 text-slate-800">
                      {renderInline(it)}
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={idx} className="text-[17px] leading-8 text-slate-800">
                {renderInline(b.text)}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
