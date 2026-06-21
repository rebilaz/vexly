// app/outils/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  getToolPageBySlug,
  getToolSlugs,
} from "@/sanity/lib/outils";

import { ToolPageLayout } from "@/components/outils/layout/ToolPageLayout";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vexly.fr"
).replace(/\/$/, "");

/**
 * Évite de refaire la même requête Sanity dans generateMetadata et Page.
 */
const getTool = cache(async (slug: string) => {
  return getToolPageBySlug(slug);
});

function getAbsoluteUrl(url: string | undefined, fallback: string): string {
  if (!url?.trim()) {
    return fallback;
  }

  try {
    return new URL(url, SITE_URL).toString();
  } catch {
    return fallback;
  }
}

export async function generateStaticParams() {
  const tools = await getToolSlugs();

  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const tool = await getTool(slug);

  if (!tool) {
    return {
      title: "Outil introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const fallbackCanonical = `${SITE_URL}/outils/${encodeURIComponent(
    tool.slug,
  )}`;

  const canonicalUrl = getAbsoluteUrl(
    tool.seo?.canonicalUrl,
    fallbackCanonical,
  );

  const title = tool.seo?.metaTitle?.trim() || tool.title;

  const description =
    tool.seo?.metaDescription?.trim() || tool.description;

  const shouldIndex = !tool.seo?.noIndex;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
      },
    },

    openGraph: {
      type: "website",
      siteName: "Vexly",
      title,
      description,
      url: canonicalUrl,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} />;
}