import "server-only";

import { client } from "./client";

export type FeatureSolutionCard = {
  _id: string;
  title: string;
  slug: string;
  href: string;
  navLabel?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
};

export type FeatureSectionContent = {
  _id: string;
  title: string;
  slug: string;
  pageType?: "solution" | "resource" | "other";
  navLabel?: string;
  showInHeader?: boolean;
  showOnHome?: boolean;
  order?: number;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroMedia?: {
    type?: "youtube" | "video" | "image";
    youtubeUrl?: string;
    videoFile?: {
      asset?: {
        url?: string;
        mimeType?: string;
        originalFilename?: string;
      };
    };
    imageFile?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
  };
  advantages?: {
    title: string;
    description?: string;
    linkLabel?: string;
    linkHref?: string;
    image?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
  }[];
  seoContent?: {
    title?: string;
    paragraphs?: string[];
    items?: {
      title?: string;
    }[];
  };
  faq?: {
    title?: string;
    description?: string;
    items?: {
      question?: string;
      answer?: string;
    }[];
  };
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImageUrl?: string | null;
    noIndex?: boolean;
  };
};

const featuresSectionFields = `
  _id,
  title,
  "slug": slug.current,
  "pageType": coalesce(pageType, "solution"),
  navLabel,
  "showInHeader": coalesce(showInHeader, false),
  "showOnHome": coalesce(showOnHome, true),
  "order": coalesce(order, 0),
  description,

  ctaLabel,
  ctaHref,

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
  },

  seo {
    title,
    description,
    canonical,
    "ogImageUrl": ogImage.asset->url,
    "noIndex": coalesce(noIndex, false)
  }
`;

const featureSolutionCardFields = `
  _id,
  title,
  "slug": slug.current,
  "href": "/" + slug.current,
  navLabel,
  description,
  ctaLabel,
  ctaHref,
  "order": coalesce(order, 0)
`;

export async function getFeaturesSection(
  slug?: string
): Promise<FeatureSectionContent | null> {
  if (slug) {
    return client.withConfig({ useCdn: false }).fetch(
      `
      *[
        _type == "featuresSection" &&
        defined(slug.current) &&
        slug.current == $slug &&
        coalesce(pageType, "solution") == "solution"
      ][0] {
        ${featuresSectionFields}
      }
      `,
      { slug }
    );
  }

  return client.withConfig({ useCdn: false }).fetch(`
    *[
      _type == "featuresSection" &&
      defined(slug.current) &&
      coalesce(pageType, "solution") == "solution"
    ] | order(coalesce(order, 0) asc, _createdAt asc)[0] {
      ${featuresSectionFields}
    }
  `);
}

export async function getAllFeaturesSlugs(): Promise<{ slug: string }[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      _type == "featuresSection" &&
      defined(slug.current) &&
      coalesce(pageType, "solution") == "solution" &&
      !(seo.noIndex == true)
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      "slug": slug.current
    }
  `);
}

export async function getAllFeaturesSections(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      _type == "featuresSection" &&
      defined(slug.current) &&
      coalesce(pageType, "solution") == "solution"
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}

export async function getHeaderSolutions(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      _type == "featuresSection" &&
      defined(slug.current) &&
      coalesce(pageType, "solution") == "solution" &&
      coalesce(showInHeader, false) == true
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}

export async function getHomeSolutions(): Promise<FeatureSolutionCard[]> {
  return client.withConfig({ useCdn: false }).fetch(`
    *[
      _type == "featuresSection" &&
      defined(slug.current) &&
      coalesce(pageType, "solution") == "solution" &&
      coalesce(showOnHome, true) == true
    ] | order(coalesce(order, 0) asc, _createdAt asc) {
      ${featureSolutionCardFields}
    }
  `);
}