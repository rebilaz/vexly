import Link from "next/link";
import { ArrowRight, ImageIcon, PlayCircle, Video } from "lucide-react";


type HeroMedia = {
    type?: "youtube" | "video" | "image";
    youtubeUrl?: string;
    videoFile?: {
        asset?: {
            url?: string;
            mimeType?: string;
            originalFilename?: string;
        };
    };
    imageFile?: {
        asset?: {
            url?: string;
        };
        alt?: string;
    };
};

type Advantage = {
    title: string;
    description?: string;
    image?: {
        asset?: {
            url?: string;
        };
        alt?: string;
    };
};

type FeaturesSectionData = {
    title: string;
    slug?: string;
    description?: string;

    heroMedia?: HeroMedia;

    /**
     * Ancien champ gardé en fallback.
     * Tu pourras le supprimer plus tard si tu n'en as plus besoin.
     */
    youtubeUrl?: string;

    ctaLabel?: string;
    ctaHref?: string;
    advantages?: Advantage[];
};

type FeatureHeroProps = {
    data: FeaturesSectionData;
};

function getYoutubeEmbedUrl(url?: string) {
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname.includes("youtu.be")) {
            const videoId = parsedUrl.pathname.replace("/", "").split("?")[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }

        if (parsedUrl.hostname.includes("youtube.com")) {
            if (parsedUrl.pathname.includes("/embed/")) {
                return url;
            }

            if (parsedUrl.pathname.includes("/shorts/")) {
                const shortsId = parsedUrl.pathname
                    .split("/shorts/")[1]
                    ?.split("/")[0];

                return shortsId
                    ? `https://www.youtube.com/embed/${shortsId}`
                    : null;
            }

            const videoId = parsedUrl.searchParams.get("v");

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        return null;
    } catch {
        return null;
    }
}

function isExternalLink(href?: string) {
    return href?.startsWith("http");
}

const ctaClassName =
    "relative z-30 inline-flex min-w-[230px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(88,80,236,0.35)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_rgba(88,80,236,0.45)] hover:brightness-110 active:scale-[0.98]";

function HeroMediaRenderer({
    media,
    title,
    legacyYoutubeUrl,
}: {
    media?: HeroMedia;
    title: string;
    legacyYoutubeUrl?: string;
}) {
    const youtubeUrl =
        media?.type === "youtube" ? media.youtubeUrl : legacyYoutubeUrl;

    const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

    if (media?.type === "image" && media.imageFile?.asset?.url) {
        return (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-xl">
                <img
                    src={media.imageFile.asset.url}
                    alt={media.imageFile.alt || title}
                    className="aspect-video w-full rounded-[1.6rem] object-cover"
                />
            </div>
        );
    }

    if (media?.type === "video" && media.videoFile?.asset?.url) {
        return (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-xl">
                <video
                    src={media.videoFile.asset.url}
                    controls
                    playsInline
                    className="aspect-video w-full rounded-[1.6rem] object-cover"
                />
            </div>
        );
    }

    if (embedUrl) {
        return (
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-xl">
                <iframe
                    src={embedUrl}
                    title={title}
                    className="aspect-video w-full rounded-[1.6rem]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="flex aspect-video items-center justify-center rounded-[2rem] border border-slate-200 bg-slate-50 px-6 text-center shadow-sm">
            <div>
                {media?.type === "video" ? (
                    <Video className="mx-auto mb-4 size-11 text-indigo-500 filter drop-shadow-[0_4px_10px_rgba(99,102,241,0.2)]" />
                ) : media?.type === "image" ? (
                    <ImageIcon className="mx-auto mb-4 size-11 text-indigo-500 filter drop-shadow-[0_4px_10px_rgba(99,102,241,0.2)]" />
                ) : (
                    <PlayCircle className="mx-auto mb-4 size-11 text-indigo-500 filter drop-shadow-[0_4px_10px_rgba(99,102,241,0.2)]" />
                )}

                <p className="text-sm font-semibold text-slate-800">
                    Média de l'expertise
                </p>
                <p className="mt-2 text-xs text-slate-500">
                    Ajoutez une vidéo YouTube, un fichier MP4 ou une image dans Sanity.
                </p>
            </div>
        </div>
    );
}

export function FeatureHero({ data }: FeatureHeroProps) {
    const ctaLabel = data.ctaLabel || "Parler de mon projet";
    const ctaHref = data.ctaHref || "/#formulaire";

    return (
        <section
            id={data.slug}
            className="relative z-20 mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16"
        >
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className="relative z-20">
                    <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            {data.title}
                        </span>
                    </h1>

                    {data.description ? (
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
                            {data.description}
                        </p>
                    ) : null}

                    <div className="relative z-30 mt-9 flex items-center">
                        {isExternalLink(ctaHref) ? (
                            <a
                                href={ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={ctaClassName}
                            >
                                {ctaLabel}
                                <ArrowRight className="size-4" />
                            </a>
                        ) : (
                            <Link
                                href={ctaHref}
                                className={ctaClassName}
                            >
                                {ctaLabel}
                                <ArrowRight className="size-4" />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="relative z-10">
                    <HeroMediaRenderer
                        media={data.heroMedia}
                        title={data.title}
                        legacyYoutubeUrl={data.youtubeUrl}
                    />
                </div>
            </div>
        </section>
    );
}