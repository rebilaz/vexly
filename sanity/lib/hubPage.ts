// sanity/lib/hubPage.ts
import "server-only";

import { client } from "@/sanity/lib/client";

export type HubPageContent = {
  _id: string;
  title: string;
  slug: string;
  hubType?: string;
  hero?: {
    titleline1?: string;
    titlehighlight?: string;
    description?: string;
    backgroundImageUrl?: string | null;
    backgroundImageAlt?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImageUrl?: string | null;
    noIndex?: boolean;
  };
};

function normalizeHubSlug(slug: string) {
  const value = String(slug || "").trim();

  if (!value) return "/";
  if (!value.startsWith("/")) return `/${value}`;

  return value.length > 1 ? value.replace(/\/$/, "") : value;
}

export async function getHubPageBySlug(
  slug: string
): Promise<HubPageContent | null> {
  const normalizedSlug = normalizeHubSlug(slug);
  const cleanSlug = normalizedSlug.replace(/^\//, "");

  return client.withConfig({ useCdn: false }).fetch<HubPageContent | null>(
    `
    *[
      _type == "hubPage" &&
      (
        slug == $normalizedSlug ||
        slug == $cleanSlug ||
        slug.current == $normalizedSlug ||
        slug.current == $cleanSlug
      )
    ][0] {
      _id,
      title,
      "slug": select(
        defined(slug.current) => slug.current,
        defined(slug) => slug
      ),
      hubType,
      hero {
        titleline1,
        titlehighlight,
        description,
        "backgroundImageUrl": backgroundImage.asset->url,
        "backgroundImageAlt": coalesce(backgroundImage.alt, "")
      },
      seo {
        title,
        description,
        canonical,
        "ogImageUrl": ogImage.asset->url,
        noIndex
      }
    }
    `,
    {
      normalizedSlug,
      cleanSlug,
    }
  );
}