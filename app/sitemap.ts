import type { MetadataRoute } from "next";

import { getAllArticleSlugs } from "@/sanity/lib/articles";
import { getAllFeaturesSlugs } from "@/sanity/lib/features";
import { getAllRealisationSlugs } from "@/sanity/lib/realisations";
import { client } from "@/sanity/lib/client";

const SITE_URL = "https://www.vexly.fr";

const STATIC_PATHS = [
  "/",
  "/contact",
  "/tarifs",
  "/a-propos",
  "/ressources",
  "/realisations",
  "/articles",
  "/architecture-technique-saas",
  "/politique-de-confidentialite",
  "/mentions-legales",
  "/conditions-generales",
  "/technique/stripe",
  "/technique/supabase",
  "/technique/sanity",
  "/technique/nextjs",
  "/outils/idee-saas",
] as const;

function toUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [featurePages, articleSlugs, realisationSlugs, toolSlugs] =
    await Promise.all([
      getAllFeaturesSlugs(),
      getAllArticleSlugs(),
      getAllRealisationSlugs(),
      client.withConfig({ useCdn: false }).fetch<string[]>(`
        *[
          _type in ["tool", "toolPage"] &&
          defined(slug.current)
        ].slug.current
      `),
    ]);

  const paths = new Set<string>(STATIC_PATHS);

  for (const page of featurePages || []) {
    if (page.slug) paths.add(`/${page.slug}`);
  }

  for (const slug of articleSlugs || []) {
    paths.add(`/articles/${slug}`);
  }

  for (const slug of realisationSlugs || []) {
    paths.add(`/realisations/${slug}`);
  }

  for (const slug of toolSlugs || []) {
    paths.add(`/outils/${slug}`);
  }

  return Array.from(paths)
    .sort((a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b, "fr");
    })
    .map((path) => ({
      url: toUrl(path),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority:
        path === "/"
          ? 1
          : path === "/tarifs" ||
              path === "/contact" ||
              path === "/realisations"
            ? 0.9
            : path.startsWith("/realisations/") ||
                path.startsWith("/articles/") ||
                path.startsWith("/agence-")
              ? 0.8
              : 0.7,
    }));
}
