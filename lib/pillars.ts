// lib/pillars.ts
import { promises as fs } from "fs";
import path from "path";

export type PillarFrontmatter = {
    title?: string;
    slug?: string;
    type?: string; // "pillar"
    pillar?: string; // ex: nom du cluster
    cluster?: string;
    canonical_url?: string;
    description?: string;
    updated_at?: string;
    [k: string]: unknown;
};

export type PillarDoc = {
    slug: string;
    filePath: string;
    frontmatter: PillarFrontmatter;
    markdown: string;
    html: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "pillars");

/**
 * ---------------------------------------------------------------------
 * Frontmatter parser (minimal YAML-like)
 * ---------------------------------------------------------------------
 */
function parseFrontmatter(raw: string): { fm: PillarFrontmatter; body: string } {
    const s = raw.replace(/\r\n/g, "\n");
    if (!s.startsWith("---\n")) return { fm: {}, body: s };

    const end = s.indexOf("\n---\n", 4);
    if (end === -1) return { fm: {}, body: s };

    const fmBlock = s.slice(4, end).trim();
    const body = s.slice(end + 5);

    const fm: PillarFrontmatter = {};
    for (const line of fmBlock.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const idx = trimmed.indexOf(":");
        if (idx === -1) continue;

        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();

        if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
        ) {
            val = val.slice(1, -1);
        }

        (fm as any)[key] = val;
    }

    return { fm, body };
}

/**
 * ---------------------------------------------------------------------
 * Markdown -> HTML (minimal)
 * ---------------------------------------------------------------------
 */
function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function mdInlineToHtml(line: string) {
    let out = escapeHtml(line);

    out = out.replace(/`([^`]+)`/g, (_, a) => `<code>${escapeHtml(a)}</code>`);
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
        const safeText = escapeHtml(text);
        const safeUrl = escapeHtml(url);
        const rel = safeUrl.startsWith("http") ? ` rel="noopener noreferrer"` : "";
        const target = safeUrl.startsWith("http") ? ` target="_blank"` : "";
        return `<a href="${safeUrl}"${target}${rel}>${safeText}</a>`;
    });

    return out;
}

function markdownToHtml(md: string) {
    const clean = md.replace(/```[\s\S]*?```/g, "");
    const lines = clean.split("\n");

    let html = "";
    let inUl = false;
    let inOl = false;

    const closeLists = () => {
        if (inUl) {
            html += "</ul>";
            inUl = false;
        }
        if (inOl) {
            html += "</ol>";
            inOl = false;
        }
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            closeLists();
            continue;
        }

        const h1 = line.match(/^#\s+(.+)$/);
        if (h1) {
            closeLists();
            html += `<h1>${mdInlineToHtml(h1[1])}</h1>`;
            continue;
        }

        const h2 = line.match(/^##\s+(.+)$/);
        if (h2) {
            closeLists();
            html += `<h2>${mdInlineToHtml(h2[1])}</h2>`;
            continue;
        }

        const h3 = line.match(/^###\s+(.+)$/);
        if (h3) {
            closeLists();
            html += `<h3>${mdInlineToHtml(h3[1])}</h3>`;
            continue;
        }

        const ul = line.match(/^[-*+]\s+(.+)$/);
        if (ul) {
            if (inOl) {
                html += "</ol>";
                inOl = false;
            }
            if (!inUl) {
                html += "<ul>";
                inUl = true;
            }
            html += `<li>${mdInlineToHtml(ul[1])}</li>`;
            continue;
        }

        const ol = line.match(/^\d+\.\s+(.+)$/);
        if (ol) {
            if (inUl) {
                html += "</ul>";
                inUl = false;
            }
            if (!inOl) {
                html += "<ol>";
                inOl = true;
            }
            html += `<li>${mdInlineToHtml(ol[1])}</li>`;
            continue;
        }

        closeLists();
        html += `<p>${mdInlineToHtml(line)}</p>`;
    }

    closeLists();
    return html;
}

/**
 * ---------------------------------------------------------------------
 * FS helpers
 * ---------------------------------------------------------------------
 */
async function fileExists(filePath: string) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * ---------------------------------------------------------------------
 * Public API
 * ---------------------------------------------------------------------
 */
export async function getPillar(slug: string): Promise<PillarDoc | null> {
    const safeSlug = String(slug || "").trim();
    if (!safeSlug) return null;

    const filePath = path.join(CONTENT_DIR, `${safeSlug}.md`);

    // 🔎 DEBUG LOGS (temp)
    console.log("──────── PILLAR LOOKUP ────────");
    console.log("slug        :", safeSlug);
    console.log("cwd         :", process.cwd());
    console.log("CONTENT_DIR :", CONTENT_DIR);
    console.log("filePath    :", filePath);
    console.log("exists      :", await fileExists(filePath));
    console.log("────────────────────────────────");

    if (!(await fileExists(filePath))) return null;

    const raw = await fs.readFile(filePath, "utf8");
    const { fm, body } = parseFrontmatter(raw);

    const title =
        (fm.title && String(fm.title)) ||
        fm.pillar?.toString() ||
        safeSlug.replaceAll("-", " ");

    const mergedFm: PillarFrontmatter = {
        ...fm,
        title,
        slug: safeSlug,
        type: fm.type ?? "pillar",
    };

    const md = body.trim();

    return {
        slug: safeSlug,
        filePath,
        frontmatter: mergedFm,
        markdown: md,
        html: markdownToHtml(md),
    };
}

export async function getAllPillarSlugs(): Promise<string[]> {
    try {
        const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

        return entries
            .filter((e) => e.isFile() && e.name.endsWith(".md"))
            .map((e) => e.name.replace(/\.md$/, ""))
            .sort();
    } catch (err) {
        console.log("⚠️ getAllPillarSlugs() failed:", err);
        return [];
    }
}
