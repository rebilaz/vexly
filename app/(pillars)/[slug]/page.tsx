// app/(pillars)/[slug]/page.tsx
export const runtime = "nodejs";
export const dynamicParams = true;
export const revalidate = 3600;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PillarLayout from "@/components/pillars/PillarLayout";
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
    const subtitle = asString(doc.frontmatter.description);

    const tags = Array.isArray(doc.frontmatter.tags)
        ? doc.frontmatter.tags.map((t) => String(t)).filter(Boolean)
        : [];

    return (
        <PillarLayout
            title={title}
            subtitle={subtitle}
            tags={tags}
            niche={asString(doc.frontmatter.niche) ?? undefined}
            coverImageUrl={asString(doc.frontmatter.coverImageUrl) ?? undefined}
            backHref="/articles"
            sections={doc.sections}
        />
    );
}
