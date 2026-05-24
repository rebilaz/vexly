// app/expertises/[slug]/page.tsx

import type { Metadata } from "next";
import { getFeaturesSection } from "@/sanity/lib/features";
import { FeaturesLayout } from "@/components/features/FeaturesLayout";

const SITE_URL = "https://www.vexly.fr";
const FEATURES_BASE_PATH = "/expertises";

function buildCanonicalUrl(slug?: string) {
    const cleanSlug = slug?.trim().replace(/^\/+|\/+$/g, "");

    if (!cleanSlug) {
        return `${SITE_URL}${FEATURES_BASE_PATH}`;
    }

    if (cleanSlug.startsWith("expertises/")) {
        return `${SITE_URL}/${cleanSlug}`;
    }

    return `${SITE_URL}${FEATURES_BASE_PATH}/${cleanSlug}`;
}

// Typage des props de la page pour Next.js 15 (où params est une Promesse)
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; // Récupération dynamique du slug de l'URL
    const featuresSection = await getFeaturesSection(slug); // On passe le slug à Sanity

    const title = featuresSection?.title || "Noxal";
    const description = featuresSection?.description || undefined;
    const canonicalUrl = buildCanonicalUrl(featuresSection?.slug || slug);

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "website",
        },
        twitter: {
            title,
            description,
            card: "summary_large_image",
        },
    };
}

export default async function HomePage({ params }: Props) {
    const { slug } = await params; // Récupération dynamique du slug de l'URL
    const featuresSection = await getFeaturesSection(slug); // On passe le slug à Sanity

    return <FeaturesLayout data={featuresSection} />;
}