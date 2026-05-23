import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { FeatureHero } from "./FeatureHero";
import { FeatureAdvantages } from "./FeatureAdvantages";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { FeatureSeoContent } from "./FeatureSeoContent";
import { FeatureFAQ } from "./FeatureFAQ";

type Advantage = {
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
};

type SeoContent = {
    title?: string;
    paragraphs?: string[];
    items?: {
        title?: string;
    }[];
};

type FaqContent = {
    title?: string;
    description?: string;
    items?: {
        question?: string;
        answer?: string;
    }[];
};

type FeaturesSectionData = {
    title: string;
    slug?: string;
    description?: string;
    youtubeUrl?: string;
    ctaLabel?: string;
    ctaHref?: string;
    advantages?: Advantage[];
    seoContent?: SeoContent;
    faq?: FaqContent;
};

type FeaturesLayoutProps = {
    data: FeaturesSectionData | null;
};

export function FeaturesLayout({ data }: FeaturesLayoutProps) {
    if (!data) return null;

    const advantages = data.advantages || [];

    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-black text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.12),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent" />

            <div className="relative z-10">
                <Header />

                <main>
                    <FeatureHero data={data} />
                    <FeatureAdvantages advantages={advantages} />
                    <FeatureSeoContent data={data.seoContent} />
                    <FeatureFAQ data={data.faq} />
                </main>

                <Footer />
            </div>
        </div>
    );
}