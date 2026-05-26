import "server-only";

import { client } from "@/sanity/lib/client";

export type HubPageContent = {
  _id: string;
  title: string;
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

export async function getHubPageBySlug(
  slug: string
): Promise<HubPageContent | null> {
  const hubType = getHubTypeFromPath(slug);

  return client.withConfig({ useCdn: false }).fetch<HubPageContent | null>(
    `
    *[
      _type == "hubPage" &&
      hubType == $hubType
    ][0] {
      _id,
      title,
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
      hubType,
    }
  );
}