import type { Metadata } from "next";
import HubLayout from "@/components/ressources/articles/HubLayout";
import {
  getHubPageBySlug,
  type HubPageContent,
} from "@/sanity/lib/hubPage";
import { getHubItemsByHubSlug } from "@/sanity/lib/hubItems";

const EXPERTISES_HUB_SLUG = "/expertises";

export const revalidate = 0;
export const dynamic = "force-dynamic";

function getFallbackExpertisesHub(): HubPageContent {
  return {
    _id: "fallback-expertises-hub",
    title: "Expertises",
    slug: EXPERTISES_HUB_SLUG,
    hubType: "solutions",
    hero: {
      titleline1: "Nos expertises",
      titlehighlight: "pour accélérer votre business",
      description:
        "Découvrez les solutions et expertises que nous pouvons construire pour vous.",
      backgroundImageUrl: "/Gemini_Generated_Image_vdi976vdi976vdi9.webp",
      backgroundImageAlt: "",
    },
    seo: {
      title: "Expertises",
      description:
        "Découvrez nos expertises pour créateurs, SaaS et business digitaux.",
      canonical: EXPERTISES_HUB_SLUG,
      ogImageUrl: null,
    },
  };
}

async function getExpertisesHub() {
  const hub = await getHubPageBySlug(EXPERTISES_HUB_SLUG);
  return hub ?? getFallbackExpertisesHub();
}

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getExpertisesHub();

  const title = hub.seo?.title ?? "Expertises";
  const description = hub.seo?.description ?? "";
  const canonical = hub.seo?.canonical ?? EXPERTISES_HUB_SLUG;
  const ogImage = hub.seo?.ogImageUrl ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ExpertisesPage() {
  const [hub, items] = await Promise.all([
    getExpertisesHub(),
    getHubItemsByHubSlug(EXPERTISES_HUB_SLUG),
  ]);

  return <HubLayout articles={items} content={hub} basePath="/expertises" />;
}