import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Rocket,
    Target,
    Settings,
    BarChart3,
    ShieldCheck,
    CreditCard,
    MonitorSmartphone,
    Server,
    Layers,
    Cpu,
    Zap,
    Users,
    LucideIcon
} from "lucide-react";

import { getAllFeaturesSections } from "@/sanity/lib/features";

export const metadata: Metadata = {
    title: "Expertises & Solutions SaaS | Vexly",
    description:
        "Découvrez nos expertises techniques et fonctionnelles pour concevoir, développer et lancer votre projet SaaS clé en main en 21 jours.",
    alternates: {
        canonical: "https://www.vexly.fr/expertises",
    },
    openGraph: {
        title: "Expertises & Solutions SaaS | Vexly",
        description:
            "Découvrez nos expertises techniques et fonctionnelles pour concevoir, développer et lancer votre projet SaaS clé en main en 21 jours.",
        url: "https://www.vexly.fr/expertises",
        type: "website",
    },
};

type FeatureHubItem = {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    heroMedia?: {
        imageFile?: {
            asset?: {
                url?: string;
            };
            alt?: string;
        };
    };
};

const iconMap = [
    Rocket,
    Target,
    Settings,
    CreditCard,
    MonitorSmartphone,
    Server,
    Layers,
    Cpu,
    Zap,
    Users,
    BarChart3,
    ShieldCheck,
];

function getFeatureIcon(index: number): LucideIcon {
    return iconMap[index % iconMap.length];
}

function PrimaryButton() {
    return (
        <Link
            href="/#formulaire"
            className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.35)] transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
        >
            Créer mon SaaS
            <ArrowRight className="size-4" />
        </Link>
    );
}

function SecondaryButton() {
    return (
        <Link
            href="/tarifs"
            className="inline-flex min-w-44 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98]"
        >
            Découvrir nos tarifs
        </Link>
    );
}

function FeatureCard({
    feature,
    index,
}: {
    feature: FeatureHubItem;
    index: number;
}) {
    const Icon = getFeatureIcon(index);
    const href = `/expertises/${feature.slug}`;
    const imageUrl = feature.heroMedia?.imageFile?.asset?.url;

    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition group-hover:opacity-100"
            />

            {imageUrl ? (
                <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <img
                        src={imageUrl}
                        alt={
                            feature.heroMedia?.imageFile?.alt ||
                            feature.title
                        }
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div
                    className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600"
                >
                    <Icon
                        className="size-6"
                    />
                </div>
            )}

            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                {feature.title}
            </h3>

            {feature.description ? (
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                </p>
            ) : null}

            <div
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
            >
                Découvrir l'expertise
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}

export default async function ExpertisesPage() {
    const features = await getAllFeaturesSections();

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
            <main className="space-y-16 py-10 sm:space-y-24 sm:py-16 lg:space-y-32">
                <section className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700 border border-indigo-100/80 mb-6">
                            Nos Spécifications
                        </span>
                        
                        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                            Nos expertises pour donner vie à{" "}
                            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                                votre futur SaaS.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                            De l'ergonomie UX/UI au paiement Stripe en passant par une infrastructure
                            Cloud scalable, nous maîtrisons toutes les couches techniques pour lancer
                            votre logiciel en 21 jours.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <PrimaryButton />
                            <SecondaryButton />
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="border-t border-slate-200 pt-16 sm:pt-24">
                        <div className="mx-auto max-w-3xl text-center mb-14">
                            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Explorez nos solutions sur-mesure
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
                                Chaque pilier technique dispose de sa propre étude détaillée et de spécifications gérées en temps réel depuis notre CMS Sanity.
                            </p>
                        </div>

                        {features?.length ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {features.map(
                                    (
                                        feature: FeatureHubItem,
                                        index: number
                                    ) => (
                                        <FeatureCard
                                            key={feature._id}
                                            feature={feature}
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-slate-200/80 bg-white p-8 text-center shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900">
                                    Aucune expertise publiée pour le moment.
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                    Ajoutez des documents de type "featuresSection" dans votre interface Sanity Studio
                                    pour les afficher automatiquement ici.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
                    <div className="border-t border-slate-200 pt-16 text-center sm:pt-24">
                        <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Transformez votre audience en revenus récurrents.
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
                            Vexly est l'agence de création de SaaS par excellence pour les créateurs de contenu.
                            Générez de la valeur dès aujourd'hui.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <PrimaryButton />
                            <SecondaryButton />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}