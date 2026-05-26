import "server-only";

import { client } from "@/sanity/lib/client";
import type { Article } from "@/sanity/lib/articles";
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

export type HubItemType = "article" | "comparisonPage" | "featuresSection";

export type HubItemCard = Article & {
  _id?: string;
  _type: HubItemType;
  _sortDate?: string | null;
};

export type FeatureSectionContent = {
  _id: string;
  _type: "featuresSection";
  title: string;
  slug: string;
  description?: string;
  hubs?: {
    _id: string;
    title?: string;
    hubType?: string;
  }[];
  ctaLabel?: string;
  ctaHref?: string;
  heroMedia?: any;
  advantages?: any[];
  seoContent?: any;
  faq?: any;
};

export type HubItemDetail =
  | {
      type: "article";
      data: Article;
    }
  | {
      type: "comparisonPage";
      data: ComparisonPageContent;
    }
  | {
      type: "featuresSection";
      data: FeatureSectionContent;
    };

function getHubTypeFromPath(value: string) {
  const clean = String(value || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  if (clean === "articles") return "resources";
  if (clean === "ressources") return "resources";
  if (clean === "resources") return "resources";
  if (clean === "expertises") return "expertises";
  if (clean === "solutions") return "solutions";

  return clean;
}

function normalizeChildSlug(slug: string) {
  return String(slug || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

const hubMatchFilter = `
  defined(hubs) &&
  $hubType in hubs[]->hubType
`;

const hubProjection = `
  hubs[]->{
    _id,
    title,
    hubType
  }
`;

const articleDetailFields = `
  _id,
  "slug": slug.current,
  "frontmatter": {
    "title": coalesce(title, ""),
    "subtitle": coalesce(subtitle, ""),
    "description": coalesce(description, ""),
    "date": date,
    "updatedAt": _updatedAt,
    "searchIntent": coalesce(searchIntent, ""),
    "category": category->{
      title,
      "slug": slug.current
    },
    "hubs": hubs[]->{
      _id,
      title,
      hubType
    },
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coalesce(coverImage.alt, "")
  },
  "sections": [],
  content
`;

const comparisonDetailFields = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,

  ${hubProjection},

  "fullPath": select(
    defined(slug.current) => "/" + slug.current,
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

const featureDetailFields = `
  _id,
  "_type": "featuresSection",
  title,
  "slug": slug.current,
  "description": coalesce(description, ""),

  ${hubProjection},

  "ctaLabel": coalesce(ctaLabel, ""),
  "ctaHref": coalesce(ctaHref, ""),

  heroMedia {
    type,
    youtubeUrl,
    videoFile {
      asset-> {
        url,
        mimeType,
        originalFilename
      }
    },
    imageFile {
      asset-> {
        url
      },
      alt
    }
  },

  advantages[] {
    title,
    description,
    linkLabel,
    linkHref,
    image {
      asset-> {
        url
      },
      alt
    }
  },

  seoContent {
    title,
    paragraphs,
    items[] {
      title
    }
  },

  faq {
    title,
    description,
    items[] {
      question,
      answer
    }
  }
`;

function sortHubItems(items: HubItemCard[]) {
  return [...items].sort((a, b) => {
    const da = a._sortDate ? new Date(a._sortDate).getTime() : 0;
    const db = b._sortDate ? new Date(b._sortDate).getTime() : 0;

    return db - da;
  });
}

export async function getHubItemsByHubSlug(
  hubSlug: string
): Promise<HubItemCard[]> {
  const hubType = getHubTypeFromPath(hubSlug);

  const result = await client.withConfig({ useCdn: false }).fetch<{
    articles: HubItemCard[];
    comparisons: HubItemCard[];
    features: HubItemCard[];
  }>(
    `
    {
      "articles": *[
        _type == "article" &&
        defined(slug.current) &&
        ${hubMatchFilter}
      ] | order(coalesce(date, _updatedAt) desc) {
        _id,
        "_type": "article",
        "_sortDate": coalesce(date, _updatedAt),
        "slug": slug.current,
        "frontmatter": {
          "title": coalesce(title, ""),
          "subtitle": coalesce(subtitle, ""),
          "description": coalesce(description, ""),
          "date": date,
          "updatedAt": _updatedAt,
          "searchIntent": coalesce(searchIntent, ""),
          "category": category->{
            title,
            "slug": slug.current
          },
          "hubs": hubs[]->{
            _id,
            title,
            hubType
          },
          "coverImageUrl": coverImage.asset->url,
          "coverImageAlt": coalesce(coverImage.alt, "")
        },
        "sections": [],
        "content": []
      },

      "comparisons": *[
        _type == "comparisonPage" &&
        defined(slug.current) &&
        ${hubMatchFilter}
      ] | order(coalesce(_updatedAt, _createdAt) desc) {
        _id,
        "_type": "comparisonPage",
        "_sortDate": coalesce(_updatedAt, _createdAt),
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
            hubType
          },
          "coverImageUrl": seo.ogImage.asset->url,
          "coverImageAlt": coalesce(seo.ogTitle, title, hero.title, "")
        },
        "sections": [],
        "content": []
      },

      "features": *[
        _type == "featuresSection" &&
        defined(slug.current) &&
        ${hubMatchFilter}
      ] | order(coalesce(_updatedAt, _createdAt) desc) {
        _id,
        "_type": "featuresSection",
        "_sortDate": coalesce(_updatedAt, _createdAt),
        "slug": slug.current,
        "frontmatter": {
          "title": coalesce(title, ""),
          "subtitle": coalesce(ctaLabel, "Expertise"),
          "description": coalesce(description, ""),
          "date": _updatedAt,
          "updatedAt": _updatedAt,
          "searchIntent": "",
          "category": {
            "title": "Expertise",
            "slug": "expertise"
          },
          "hubs": hubs[]->{
            _id,
            title,
            hubType
          },
          "coverImageUrl": heroMedia.imageFile.asset->url,
          "coverImageAlt": coalesce(heroMedia.imageFile.alt, title, "")
        },
        "sections": [],
        "content": []
      }
    }
    `,
    {
      hubType,
    }
  );

  const items = [
    ...(result?.articles ?? []),
    ...(result?.comparisons ?? []),
    ...(result?.features ?? []),
  ];

  return sortHubItems(items);
}

export async function getHubItemSlugsByHubSlug(
  hubSlug: string
): Promise<string[]> {
  const items = await getHubItemsByHubSlug(hubSlug);

  return Array.from(new Set(items.map((item) => item.slug).filter(Boolean)));
}

export async function getHubItemByHubAndSlug({
  hubSlug,
  slug,
}: {
  hubSlug: string;
  slug: string;
}): Promise<HubItemDetail | null> {
  const hubType = getHubTypeFromPath(hubSlug);
  const childSlug = normalizeChildSlug(slug);

  const result = await client.withConfig({ useCdn: false }).fetch<{
    article: Article | null;
    comparison: ComparisonPageContent | null;
    feature: FeatureSectionContent | null;
  }>(
    `
    {
      "article": *[
        _type == "article" &&
        defined(slug.current) &&
        slug.current == $slug &&
        ${hubMatchFilter}
      ][0] {
        ${articleDetailFields}
      },

      "comparison": *[
        _type == "comparisonPage" &&
        defined(slug.current) &&
        slug.current == $slug &&
        ${hubMatchFilter}
      ][0] {
        ${comparisonDetailFields}
      },

      "feature": *[
        _type == "featuresSection" &&
        defined(slug.current) &&
        slug.current == $slug &&
        ${hubMatchFilter}
      ][0] {
        ${featureDetailFields}
      }
    }
    `,
    {
      hubType,
      slug: childSlug,
    }
  );

  const matches = [
    result.article ? "article" : null,
    result.comparison ? "comparisonPage" : null,
    result.feature ? "featuresSection" : null,
  ].filter(Boolean);

  if (matches.length > 1) {
    console.warn(
      `[hubItems] Slug conflict on ${hubType}/${childSlug}: ${matches.join(
        ", "
      )}`
    );
  }

  if (result.article) {
    return {
      type: "article",
      data: result.article,
    };
  }

  if (result.comparison) {
    return {
      type: "comparisonPage",
      data: {
        ...result.comparison,
        hubs: result.comparison.hubs ?? [],
        criteria: result.comparison.criteria ?? [],
        highlights: result.comparison.highlights ?? [],
        useCases: result.comparison.useCases ?? [],
        faq: result.comparison.faq
          ? {
              ...result.comparison.faq,
              items: result.comparison.faq.items ?? [],
            }
          : null,
        seoContent: result.comparison.seoContent
          ? {
              ...result.comparison.seoContent,
              paragraphs: result.comparison.seoContent.paragraphs ?? [],
            }
          : null,
      },
    };
  }

  if (result.feature) {
    return {
      type: "featuresSection",
      data: {
        ...result.feature,
        description: result.feature.description ?? "",
        advantages: result.feature.advantages ?? [],
      },
    };
  }

  return null;
}