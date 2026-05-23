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

const ctaStyle = {
    display: "inline-flex",
    visibility: "visible",
    opacity: 1,
    backgroundColor: "#facc15",
    color: "#050505",
    boxShadow:
        "0 0 22px rgba(250, 204, 21, 0.85), 0 0 80px rgba(250, 204, 21, 0.42)",
    border: "1px solid rgba(254, 240, 138, 0.95)",
} as const;

const ctaClassName =
    "relative z-30 min-w-[230px] items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 hover:brightness-110";

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
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <img
                    src={media.imageFile.asset.url}
                    alt={media.imageFile.alt || title}
                    className="aspect-video w-full object-cover"
                />
            </div>
        );
    }

    if (media?.type === "video" && media.videoFile?.asset?.url) {
        return (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <video
                    src={media.videoFile.asset.url}
                    controls
                    playsInline
                    className="aspect-video w-full object-cover"
                />
            </div>
        );
    }

    if (embedUrl) {
        return (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <iframe
                    src={embedUrl}
                    title={title}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="flex aspect-video items-center justify-center rounded-[2rem] border border-white/10 bg-neutral-950 px-6 text-center">
            <div>
                {media?.type === "video" ? (
                    <Video className="mx-auto mb-4 size-11 text-[#facc15] drop-shadow-[0_0_18px_rgba(250,204,21,0.85)]" />
                ) : media?.type === "image" ? (
                    <ImageIcon className="mx-auto mb-4 size-11 text-[#facc15] drop-shadow-[0_0_18px_rgba(250,204,21,0.85)]" />
                ) : (
                    <PlayCircle className="mx-auto mb-4 size-11 text-[#facc15] drop-shadow-[0_0_18px_rgba(250,204,21,0.85)]" />
                )}

                <p className="text-sm font-medium text-white">
                    Ajoute un média dans Sanity
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                    YouTube, vidéo fichier ou image fichier.
                </p>
            </div>
        </div>
    );
}

export function FeatureHero({ data }: FeatureHeroProps) {
    const ctaLabel = data.ctaLabel || "Accéder au dashboard";
    const ctaHref = data.ctaHref || "/login";

    return (
        <section
            id={data.slug}
            className="relative z-20 mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24"
        >
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className="relative z-20">
                    <h1 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                        {data.title}
                    </h1>

                    {data.description ? (
                        <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">
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
                                style={ctaStyle}
                            >
                                {ctaLabel}
                                <ArrowRight className="size-4" />
                            </a>
                        ) : (
                            <Link
                                href={ctaHref}
                                className={ctaClassName}
                                style={ctaStyle}
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