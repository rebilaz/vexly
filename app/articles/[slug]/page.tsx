import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/ressources/articles/articles/ArticleLayout";
import { FeaturesLayout } from "@/components/features/FeaturesLayout";
import ComparisonLayout from "@/components/comparison/ComparisonLayout";
import {
  getHubItemByHubAndSlug,
  getHubItemSlugsByHubSlug,
} from "@/sanity/lib/hubItems";

const SITE_URL = "https://www.vexly.fr";
const HUB_SLUG = "/articles";
const BACK_HREF = "/articles";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

function buildCanonical(slug: string) {
  return `${SITE_URL}${HUB_SLUG}/${slug}`;
}

function toAbsoluteUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateStaticParams() {
  const slugs = await getHubItemSlugsByHubSlug(HUB_SLUG);

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

  const item = await getHubItemByHubAndSlug({
    hubSlug: HUB_SLUG,
    slug,
  });

  if (!item) {
    return {
      title: "Page introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (item.type === "article") {
    const fm = item.data.frontmatter;
    const canonical = buildCanonical(item.data.slug);
    const ogImage = toAbsoluteUrl(fm.coverImageUrl);

    return {
      title: fm.title,
      description: fm.description,
      alternates: {
        canonical,
      },
      openGraph: {
        title: fm.title,
        description: fm.description,
        type: "article",
        url: canonical,
        images: ogImage
          ? [
              {
                url: ogImage,
                alt: fm.coverImageAlt || fm.title,
              },
            ]
          : [],
      },
    };
  }

  if (item.type === "comparisonPage") {
    const page = item.data;

    const title =
      page.seo?.title ?? page.hero?.title ?? page.title ?? "Comparaison";

    const description =
      page.seo?.description ?? page.hero?.description ?? undefined;

    const canonical =
      toAbsoluteUrl(page.seo?.canonical) ?? buildCanonical(page.slug);

    const ogImage = toAbsoluteUrl(page.seo?.ogImageUrl);

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots: page.seo?.noIndex
        ? {
            index: false,
            follow: false,
          }
        : undefined,
      openGraph: {
        title: page.seo?.ogTitle ?? title,
        description: page.seo?.ogDescription ?? description,
        type: "website",
        url: canonical,
        images: ogImage
          ? [
              {
                url: ogImage,
                alt: page.seo?.ogTitle ?? title,
              },
            ]
          : [],
      },
    };
  }

  const feature = item.data;
  const canonical = buildCanonical(feature.slug);

  return {
    title: feature.title,
    description: feature.description ?? undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: feature.title,
      description: feature.description ?? undefined,
      type: "website",
      url: canonical,
    },
  };
}

export default async function ArticlesSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const item = await getHubItemByHubAndSlug({
    hubSlug: HUB_SLUG,
    slug,
  });

  if (!item) {
    notFound();
  }

  if (item.type === "article") {
    const fm = item.data.frontmatter;

    return (
      <ArticleLayout
        title={fm.title}
        subtitle={fm.subtitle}
        date={fm.date ?? fm.updatedAt}
        coverImageUrl={fm.coverImageUrl}
        backHref={BACK_HREF}
        content={item.data.content || []}
      />
    );
  }

  if (item.type === "comparisonPage") {
    return <ComparisonLayout page={item.data} backHref={BACK_HREF} />;
  }

  return <FeaturesLayout data={item.data as any} />;
}