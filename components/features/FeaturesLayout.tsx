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
        <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
            <main className="space-y-16 py-10 sm:space-y-24 sm:py-16 lg:space-y-32">
                <FeatureHero data={data} />
                
                <FeatureAdvantages advantages={advantages} />
                
                <FeatureSeoContent data={data.seoContent} />
                
                <FeatureFAQ data={data.faq} />
                
                <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
                    <FinalCTASection 
                        title={data.title ? `Lancez votre projet : ${data.title}` : "Prêt à générer des revenus récurrents ?"}
                        subtitle={data.description || "Transformez votre idée de SaaS en un actif digital durable et rentable en 21 jours."}
                        primaryCtaLabel={data.ctaLabel || "Créer mon SaaS →"}
                    />
                </div>
            </main>
        </div>
    );
}