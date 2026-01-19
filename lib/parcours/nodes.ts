// lib/parcours/nodes.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NodeChoice = {
    label: string;
    to: string; // slug cible
};

export type ParcoursNode = {
    id?: string;
    slug: string;
    title?: string;
    type?: string;

    // SEO
    description?: string;
    canonical_url?: string;
    keywords?: string[];

    problem?: string;
    question?: string;
    shock?: string;
    example?: string;
    seo_intent?: string;

    choices?: NodeChoice[];
    content: string;
};


const CONTENT_DIR = path.join(process.cwd(), "content", "parcours");

// Si chez toi c’est content/parcours :
// const CONTENT_DIR = path.join(process.cwd(), "content", "parcours");

export function getAllNodeSlugs(): string[] {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    return fs
        .readdirSync(CONTENT_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

export function getNodeBySlug(slug: string): ParcoursNode | null {
    const file = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) return null;

    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);

    return {
        id: data.id,
        slug: data.slug ?? slug,
        title: data.title,
        type: data.type,

        description: data.description,
        canonical_url: data.canonical_url,
        keywords: Array.isArray(data.keywords) ? data.keywords : undefined,

        problem: data.problem,
        question: data.question,
        shock: data.shock,
        example: data.example,
        seo_intent: data.seo_intent,

        choices: Array.isArray(data.choices) ? data.choices : [],
        content,
    };

}
