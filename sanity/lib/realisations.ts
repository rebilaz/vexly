import "server-only";

import type { PortableTextBlock } from "sanity";

import { client } from "./client";

export type RealisationVisual =
  | "membership"
  | "analytics"
  | "ai"
  | "community"
  | "checkout"
  | "automation";

export type RealisationTheme =
  | "indigo"
  | "amber"
  | "violet"
  | "cyan"
  | "lime"
  | "rose";

export type RealisationMetric = {
  value?: string;
  label?: string;
};

export type RealisationImage = {
  asset?: {
    url?: string;
  };
  alt?: string;
  caption?: string;
};

export type RealisationListItem = {
  _id: string;
  title: string;
  slug: string;
  href: string;
  eyebrow?: string;
  category?: string;
  summary?: string;
  description?: string;
  services?: string[];
  tags?: string[];
  technologies?: string[];
  visual: RealisationVisual;
  theme: RealisationTheme;
  surfaceClass: string;
  glowClass: string;
  coverImage?: RealisationImage;
  cta: string;
  order?: number;
};

export type RealisationDetail = RealisationListItem & {
  client?: string;
  year?: number;
  duration?: string;
  metrics?: RealisationMetric[];
  challenge?: string;
  solution?: string;
  results?: string;
  content?: PortableTextBlock[];
  gallery?: RealisationImage[];
  projectUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImageUrl?: string | null;
    noIndex?: boolean;
  };
};

type SanityRealisation = Omit<
  RealisationDetail,
  "href" | "surfaceClass" | "glowClass" | "cta"
> & {
  ctaLabel?: string;
};

const themeClasses: Record<
  RealisationTheme,
  { surfaceClass: string; glowClass: string }
> = {
  indigo: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#dbeafe_0%,#e0e7ff_48%,#c4b5fd_100%)]",
    glowClass: "bg-indigo-500/25",
  },
  amber: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#fef3c7_0%,#fed7aa_48%,#fdba74_100%)]",
    glowClass: "bg-orange-500/20",
  },
  violet: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#ede9fe_0%,#ddd6fe_45%,#fbcfe8_100%)]",
    glowClass: "bg-violet-500/25",
  },
  cyan: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#cffafe_0%,#bfdbfe_50%,#a5b4fc_100%)]",
    glowClass: "bg-cyan-500/20",
  },
  lime: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#dcfce7_0%,#d9f99d_48%,#bef264_100%)]",
    glowClass: "bg-lime-500/20",
  },
  rose: {
    surfaceClass:
      "bg-[linear-gradient(135deg,#fee2e2_0%,#fecdd3_48%,#f9a8d4_100%)]",
    glowClass: "bg-rose-500/20",
  },
};

const realisationFields = `
  _id,
  title,
  "slug": slug.current,
  eyebrow,
  category,
  summary,
  description,
  client,
  year,
  duration,
  services,
  tags,
  technologies,
  "visual": coalesce(visual, "membership"),
  "theme": coalesce(theme, "indigo"),
  coverImage {
    asset-> {
      url
    },
    alt
  },
  metrics[] {
    value,
    label
  },
  challenge,
  solution,
  results,
  content[] {
    ...,
    asset-> {
      url
    }
  },
  gallery[] {
    asset-> {
      url
    },
    alt,
    caption
  },
  ctaLabel,
  projectUrl,
  "order": coalesce(order, 0),
  seo {
    title,
    description,
    canonical,
    "ogImageUrl": ogImage.asset->url,
    "noIndex": coalesce(noIndex, false)
  }
`;

function mapRealisation(doc: SanityRealisation): RealisationDetail {
  const theme = doc.theme || "indigo";
  const classes = themeClasses[theme] || themeClasses.indigo;

  return {
    ...doc,
    href: `/realisations/${doc.slug}`,
    visual: doc.visual || "membership",
    theme,
    surfaceClass: classes.surfaceClass,
    glowClass: classes.glowClass,
    cta: doc.ctaLabel || "Decouvrir le projet",
  };
}

export async function getAllRealisationSlugs(): Promise<string[]> {
  const slugs = await client.withConfig({ useCdn: false }).fetch<string[]>(`
    *[
      _type == "realisation" &&
      defined(slug.current) &&
      coalesce(isPublished, true) == true &&
      !(seo.noIndex == true)
    ] | order(coalesce(order, 0) asc, _createdAt desc).slug.current
  `);

  return slugs || [];
}

export async function getAllRealisations(): Promise<RealisationListItem[]> {
  const docs = await client.withConfig({ useCdn: false }).fetch<SanityRealisation[]>(`
    *[
      _type == "realisation" &&
      defined(slug.current) &&
      coalesce(isPublished, true) == true
    ] | order(coalesce(featured, false) desc, coalesce(order, 0) asc, _createdAt desc) {
      ${realisationFields}
    }
  `);

  return (docs || []).map(mapRealisation);
}

export async function getRealisationBySlug(
  slug: string
): Promise<RealisationDetail | null> {
  const doc = await client.withConfig({ useCdn: false }).fetch<SanityRealisation | null>(
    `
    *[
      _type == "realisation" &&
      defined(slug.current) &&
      slug.current == $slug &&
      coalesce(isPublished, true) == true
    ][0] {
      ${realisationFields}
    }
    `,
    { slug }
  );

  return doc ? mapRealisation(doc) : null;
}
