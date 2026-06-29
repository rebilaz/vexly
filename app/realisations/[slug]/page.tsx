import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RealisationDetailPage } from "@/components/realisations/RealisationDetailPage";
import {
  getAllRealisationSlugs,
  getRealisationBySlug,
} from "@/sanity/lib/realisations";

const SITE_URL = "https://www.vexly.fr";
const BASE_PATH = "/realisations";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

function buildCanonical(slug: string) {
  return `${SITE_URL}${BASE_PATH}/${slug}`;
}

function toAbsoluteUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateStaticParams() {
  const slugs = await getAllRealisationSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getRealisationBySlug(slug);

  if (!project) {
    return {
      title: "Page introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = project.seo?.title || `${project.title} | Vexly`;
  const description =
    project.seo?.description || project.description || project.summary || "";
  const canonical = project.seo?.canonical || buildCanonical(project.slug);
  const ogImage = toAbsoluteUrl(
    project.seo?.ogImageUrl || project.coverImage?.asset?.url
  );

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: project.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: project.coverImage?.alt || project.title,
            },
          ]
        : [],
    },
  };
}

export default async function RealisationSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getRealisationBySlug(slug);

  if (!project) {
    notFound();
  }

  return <RealisationDetailPage project={project} />;
}
