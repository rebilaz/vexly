import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    Car,
    CircleDollarSign,
    ClipboardCheck,
    FileText,
    FolderKanban,
    Gauge,
    Receipt,
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Wrench,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllFeaturesSections } from "@/sanity/lib/features";

export const metadata: Metadata = {
    title: "Fonctionnalités | Noxal",
    description:
        "Découvrez les fonctionnalités Noxal pour gérer votre stock automobile, suivre vos véhicules, vos frais, vos documents et vos marges.",
    alternates: {
        canonical: "https://www.noxal.fr/fonctionnalites",
    },
    openGraph: {
        title: "Fonctionnalités | Noxal",
        description:
            "Découvrez les fonctionnalités Noxal pour gérer votre stock automobile, suivre vos véhicules, vos frais, vos documents et vos marges.",
        url: "https://www.noxal.fr/fonctionnalites",
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

const BRAND = {
    yellow: "#d6b25e",
    yellowSoft: "rgba(214, 178, 94, 0.1)",
    yellowBorder: "rgba(214, 178, 94, 0.28)",
    yellowGlow: "rgba(214, 178, 94, 0.14)",
};

const iconMap = [
    Car,
    Gauge,
    FolderKanban,
    CircleDollarSign,
    Receipt,
    TrendingUp,
    FileText,
    ClipboardCheck,
    Smartphone,
    Wrench,
    BarChart3,
    ShieldCheck,
];

function getFeatureIcon(index: number) {
    return iconMap[index % iconMap.length];
}

function PrimaryButton() {
    return (
        <Link
            href="/login"
            style={{
                backgroundColor: BRAND.yellow,
                color: "#070707",
            }}
            className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition hover:brightness-110"
        >
            Accéder au dashboard
            <ArrowRight className="size-4" />
        </Link>
    );
}

function SecondaryButton() {
    return (
        <Link
            href="/formation"
            className="inline-flex min-w-44 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
            Voir la formation
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
    const href = `/fonctionnalites/${feature.slug}`;
    const imageUrl = feature.heroMedia?.imageFile?.asset?.url;

    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
            style={{
                boxShadow: `0 35px 120px ${BRAND.yellowGlow}`,
            }}
        >
            <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(214,178,94,0.55), transparent)",
                }}
            />

            {imageUrl ? (
                <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <img
                        src={imageUrl}
                        alt={
                            feature.heroMedia?.imageFile?.alt ||
                            feature.title
                        }
                        className="aspect-video w-full object-cover opacity-90"
                    />
                </div>
            ) : (
                <div
                    style={{
                        backgroundColor: BRAND.yellowSoft,
                        borderColor: BRAND.yellowBorder,
                    }}
                    className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                >
                    <Icon
                        style={{ color: BRAND.yellow }}
                        className="size-6"
                    />
                </div>
            )}

            <h3 className="text-2xl font-semibold tracking-tight text-white">
                {feature.title}
            </h3>

            {feature.description ? (
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-300">
                    {feature.description}
                </p>
            ) : null}

            <div
                style={{ color: BRAND.yellow }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
            >
                Découvrir
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}

export default async function FonctionnalitesPage() {
    const features = await getAllFeaturesSections();

    return (
        <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
            <Header />

            <main>
                <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:pt-28 lg:px-8 lg:pt-32">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                            Toutes les fonctionnalités pour piloter votre activité d’achat-revente auto.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            Retrouvez les pages fonctionnalités Noxal : suivi des véhicules,
                            gestion du stock, frais, marges, documents et pilotage de votre
                            activité automobile.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <PrimaryButton />
                            <SecondaryButton />
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8">
                    <div className="border-t border-white/10 pt-20 sm:pt-24">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                                Explorez les fonctionnalités Noxal.
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
                                Chaque fonctionnalité dispose de sa propre page détaillée,
                                alimentée depuis Sanity.
                            </p>
                        </div>

                        {features?.length ? (
                            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                            <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                                <h3 className="text-xl font-semibold text-white">
                                    Aucune fonctionnalité publiée pour le moment.
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    Ajoute des documents de type fonctionnalité dans Sanity
                                    pour les afficher automatiquement ici.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                    <div className="border-t border-white/10 pt-20 text-center sm:pt-24">
                        <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                            Gérez mieux votre stock. Suivez mieux vos marges. Vendez avec plus de clarté.
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
                            Noxal aide les marchands auto à gagner du temps, mieux structurer
                            leur activité et prendre de meilleures décisions.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <PrimaryButton />
                            <SecondaryButton />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}