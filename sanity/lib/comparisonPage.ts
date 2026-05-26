import "server-only";

import { client } from "@/sanity/lib/client";
import type { Article } from "@/sanity/lib/articles";

export type ComparisonHub = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  hubType?: string | null;
};

export type ComparisonSeo = {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  noIndex?: boolean | null;
};

export type ComparisonHero = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
};

export type ComparisonOption = {
  name?: string | null;
  label?: string | null;
  description?: string | null;
  price?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type ComparisonCriterion = {
  _key?: string;
  category?: string | null;
  label?: string | null;
  description?: string | null;
  leftValue?: string | null;
  rightValue?: string | null;
  winner?: "left" | "right" | "tie" | null;
};

export type ComparisonHighlight = {
  _key?: string;
  title?: string | null;
  description?: string | null;
};

export type ComparisonUseCase = {
  _key?: string;
  title?: string | null;
  description?: string | null;
};

export type ComparisonFaqItem = {
  _key?: string;
  question?: string | null;
  answer?: string | null;
};

export type ComparisonPageContent = {
  _id: string;
  _updatedAt?: string;
  title?: string | null;
  slug: string;
  fullPath?: string | null;
  hubs: ComparisonHub[];
  seo?: ComparisonSeo | null;
  hero?: ComparisonHero | null;
  comparison?: {
    left?: ComparisonOption | null;
    right?: ComparisonOption | null;
  } | null;
  criteria: ComparisonCriterion[];
  highlights: ComparisonHighlight[];
  useCases: ComparisonUseCase[];
  faq?: {
    eyebrow?: string | null;
    title?: string | null;
    items?: ComparisonFaqItem[];
  } | null;
  cta?: {
    title?: string | null;
    description?: string | null;
    buttonLabel?: string | null;
    buttonHref?: string | null;
  } | null;
  seoContent?: {
    title?: string | null;
    paragraphs?: string[];
  } | null;
};

function normalizeHubSlug(slug: string) {
  const value = String(slug || "").trim();

  if (!value) return "/";
  if (!value.startsWith("/")) return `/${value}`;

  return value.length > 1 ? value.replace(/\/$/, "") : value;
}

function normalizeChildSlug(slug: string) {
  return String(slug || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

const hubMatchFilter = `
  defined(hubs) &&
  (
    $normalizedHubSlug in hubs[]->slug ||
    $cleanHubSlug in hubs[]->slug ||
    $normalizedHubSlug in hubs[]->slug.current ||
    $cleanHubSlug in hubs[]->slug.current
  )
`;

const comparisonPageFields = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,

  hubs[]-> {
    _id,
    title,
    "slug": select(
      defined(slug.current) => slug.current,
      defined(slug) => slug
    ),
    hubType
  },

  "fullPath": select(
    defined(hubs[0]->slug.current) && defined(slug.current) => hubs[0]->slug.current + "/" + slug.current,
    defined(hubs[0]->slug) && defined(slug.current) => hubs[0]->slug + "/" + slug.current,
    null
  ),

  seo {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    "ogImageUrl": ogImage.asset->url,
    noIndex
  },

  hero {
    eyebrow,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref
  },

  comparison {
    left {
      name,
      label,
      description,
      price,
      ctaLabel,
      ctaHref
    },
    right {
      name,
      label,
      description,
      price,
      ctaLabel,
      ctaHref
    }
  },

  criteria[] {
    _key,
    category,
    label,
    description,
    leftValue,
    rightValue,
    winner
  },

  highlights[] {
    _key,
    title,
    description
  },

  useCases[] {
    _key,
    title,
    description
  },

  faq {
    eyebrow,
    title,
    items[] {
      _key,
      question,
      answer
    }
  },

  cta {
    title,
    description,
    buttonLabel,
    buttonHref
  },

  seoContent {
    title,
    paragraphs
  }
`;

function normalizeComparisonPage(
  page: ComparisonPageContent | null
): ComparisonPageContent | null {
  if (!page) return null;

  return {
    ...page,
    hubs: page.hubs ?? [],
    criteria: page.criteria ?? [],
    highlights: page.highlights ?? [],
    useCases: page.useCases ?? [],
    faq: page.faq
      ? {
          ...page.faq,
          items: page.faq.items ?? [],
        }
      : null,
    seoContent: page.seoContent
      ? {
          ...page.seoContent,
          paragraphs: page.seoContent.paragraphs ?? [],
        }
      : null,
  };
}

export async function getComparisonPageByHubAndSlug({
  hubSlug,
  slug,
}: {
  hubSlug: string;
  slug: string;
}): Promise<ComparisonPageContent | null> {
  const normalizedHubSlug = normalizeHubSlug(hubSlug);
  const cleanHubSlug = normalizedHubSlug.replace(/^\//, "");
  const childSlug = normalizeChildSlug(slug);

  try {
    const page = await client
      .withConfig({ useCdn: false })
      .fetch<ComparisonPageContent | null>(
        `
        *[
          _type == "comparisonPage" &&
          defined(slug.current) &&
          slug.current == $slug &&
          ${hubMatchFilter}
        ][0] {
          ${comparisonPageFields}
        }
        `,
        {
          normalizedHubSlug,
          cleanHubSlug,
          slug: childSlug,
        }
      );

    return normalizeComparisonPage(page);
  } catch (error) {
    console.error("[Sanity] Failed to fetch comparison page:", error);
    return null;
  }
}

export async function getComparisonPagesByHubSlug(
  hubSlug: string
): Promise<ComparisonPageContent[]> {
  const normalizedHubSlug = normalizeHubSlug(hubSlug);
  const cleanHubSlug = normalizedHubSlug.replace(/^\//, "");

  try {
    const pages = await client
      .withConfig({ useCdn: false })
      .fetch<ComparisonPageContent[]>(
        `
        *[
          _type == "comparisonPage" &&
          defined(slug.current) &&
          ${hubMatchFilter}
        ] | order(coalesce(_updatedAt, _createdAt) desc) {
          ${comparisonPageFields}
        }
        `,
        {
          normalizedHubSlug,
          cleanHubSlug,
        }
      );

    return (pages ?? [])
      .map(normalizeComparisonPage)
      .filter(Boolean) as ComparisonPageContent[];
  } catch (error) {
    console.error("[Sanity] Failed to fetch comparison pages:", error);
    return [];
  }
}

export async function getComparisonPagesByHubForGrid(
  hubSlug: string
): Promise<Article[]> {
  const normalizedHubSlug = normalizeHubSlug(hubSlug);
  const cleanHubSlug = normalizedHubSlug.replace(/^\//, "");

  try {
    const pages = await client
      .withConfig({ useCdn: false })
      .fetch<Article[]>(
        `
        *[
          _type == "comparisonPage" &&
          defined(slug.current) &&
          ${hubMatchFilter}
        ] | order(coalesce(_updatedAt, _createdAt) desc) {
          _id,
          "slug": slug.current,
          "frontmatter": {
            "title": coalesce(title, hero.title, ""),
            "subtitle": coalesce(hero.eyebrow, "Comparaison"),
            "description": coalesce(seo.description, hero.description, ""),
            "date": _updatedAt,
            "updatedAt": _updatedAt,
            "searchIntent": "",
            "category": {
              "title": "Comparaison",
              "slug": "comparaison"
            },
            "hubs": hubs[]->{
              _id,
              title,
              "slug": select(
                defined(slug.current) => slug.current,
                defined(slug) => slug
              ),
              hubType
            },
            "coverImageUrl": seo.ogImage.asset->url,
            "coverImageAlt": coalesce(seo.ogTitle, title, hero.title, "")
          },
          "sections": [],
          "content": []
        }
        `,
        {
          normalizedHubSlug,
          cleanHubSlug,
        }
      );

    return pages ?? [];
  } catch (error) {
    console.error("[Sanity] Failed to fetch comparison pages for grid:", error);
    return [];
  }
}

export async function getAllComparisonPagePaths(): Promise<
  { hubSlug: string; slug: string; fullPath: string }[]
> {
  try {
    const paths = await client.fetch<
      { hubSlug: string; slug: string; fullPath: string }[]
    >(
      `
      *[
        _type == "comparisonPage" &&
        defined(slug.current) &&
        defined(hubs)
      ]{
        "childSlug": slug.current,
        "hubs": hubs[]->{
          "slug": select(
            defined(slug.current) => slug.current,
            defined(slug) => slug
          )
        }
      }{
        "paths": hubs[]{
          "hubSlug": slug,
          "slug": ^.childSlug,
          "fullPath": slug + "/" + ^.childSlug
        }
      }.paths[]
      `
    );

    return paths ?? [];
  } catch (error) {
    console.error("[Sanity] Failed to fetch comparison paths:", error);
    return [];
  }
}