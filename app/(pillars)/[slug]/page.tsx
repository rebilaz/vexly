// app/(pillars)/[slug]/page.tsx
export const runtime = "nodejs"; // ✅ fs works (avoid Edge runtime)
export const dynamicParams = true;
export const revalidate = 3600; // 1h

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPillarSlugs, getPillar } from "@/lib/pillars";

function asString(v: unknown): string | undefined {
    if (typeof v === "string") {
        const s = v.trim();
        return s ? s : undefined;
    }
    if (v == null) return undefined;
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    return undefined;
}

// ✅ Compatible avec params sync (Next 13/14) ET params async (Next récent)
async function getSlugFromParams(
    params: { slug: string } | Promise<{ slug: string }>,
): Promise<string> {
    const resolved = await Promise.resolve(params);
    return String(resolved?.slug ?? "").trim();
}

export async function generateStaticParams() {
    const slugs = await getAllPillarSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = await getSlugFromParams(params);
    if (!slug) return {};

    const doc = await getPillar(slug);
    if (!doc) return {};

    const canonical =
        asString(doc.frontmatter.canonical_url) ?? `https://www.vexly.fr/${doc.slug}`;

    const title = asString(doc.frontmatter.title) ?? doc.slug;
    const description = asString(doc.frontmatter.description);

    return {
        title,
        description,
        alternates: { canonical },
    };
}

export default async function PillarPage({
    params,
}: {
    params: { slug: string } | Promise<{ slug: string }>;
}) {
    const slug = await getSlugFromParams(params);
    if (!slug) return notFound();

    const doc = await getPillar(slug);
    if (!doc) return notFound();

    const title = asString(doc.frontmatter.title) ?? doc.slug;
    const description = asString(doc.frontmatter.description);

    return (
        <main className="mx-auto max-w-3xl px-5 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                {description ? (
                    <p className="mt-3 text-base text-slate-600">{description}</p>
                ) : null}
            </header>

            <article
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: doc.html }}
            />
        </main>
    );
}
