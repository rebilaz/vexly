import {
    BarChart3,
    Car,
    CircleDollarSign,
    Gauge,
    ShieldCheck,
} from "lucide-react";

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

type FeatureAdvantagesProps = {
    advantages?: Advantage[];
};

const BRAND = {
    yellow: "#d6b25e",
    yellowSoft: "rgba(214, 178, 94, 0.1)",
    yellowBorder: "rgba(214, 178, 94, 0.28)",
    yellowGlow: "rgba(214, 178, 94, 0.12)",
};

function getAdvantageIcon(index: number) {
    const icons = [Car, CircleDollarSign, Gauge, BarChart3, ShieldCheck];

    return icons[index % icons.length];
}

function isExternalUrl(href: string) {
    return href.startsWith("http://") || href.startsWith("https://");
}

export function FeatureAdvantages({ advantages }: FeatureAdvantagesProps) {
    if (!advantages?.length) return null;

    return (
        <section
            id="noxal-avantages"
            style={{
                paddingBottom: "12rem",
            }}
            className="mx-auto w-full max-w-7xl px-6 pt-16 sm:px-8 lg:px-10"
        >
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                    Des fonctionnalités pensées pour piloter ton activité.
                </h2>
            </div>

            <div
                style={{
                    marginTop: "9rem",
                }}
                className="flex flex-col"
            >
                {advantages.map((advantage, index) => {
                    const Icon = getAdvantageIcon(index);
                    const imageUrl = advantage.image?.asset?.url;
                    const imageOnRight = index % 2 === 0;

                    const linkHref = advantage.linkHref?.trim();
                    const linkLabel = advantage.linkLabel?.trim() || "En savoir plus";
                    const hasLink = Boolean(linkHref);
                    const isExternal = linkHref ? isExternalUrl(linkHref) : false;

                    const textBlock = (
                        <div
                            key="text"
                            className="flex min-h-[360px] flex-col justify-center p-8 sm:p-10 lg:min-h-[420px] lg:p-14"
                        >
                            <h3 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                                {advantage.title}
                            </h3>

                            {advantage.description ? (
                                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                                    {advantage.description}
                                </p>
                            ) : null}

                            {hasLink ? (
                                <a
                                    href={linkHref}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-300/40 hover:bg-white/[0.08]"
                                >
                                    {linkLabel}
                                    <span className="ml-2 text-yellow-300">
                                        →
                                    </span>
                                </a>
                            ) : null}
                        </div>
                    );

                    const imageBlock = (
                        <div
                            key="image"
                            className={`relative min-h-[320px] overflow-hidden border-t border-white/10 bg-black/40 md:min-h-[360px] md:border-t-0 lg:min-h-[420px] ${
                                imageOnRight ? "md:border-l" : "md:border-r"
                            }`}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={advantage.image?.alt || advantage.title}
                                    className="h-full w-full object-cover opacity-90"
                                />
                            ) : (
                                <div
                                    className="flex h-full w-full items-center justify-center"
                                    style={{
                                        background:
                                            "radial-gradient(circle at center, rgba(214,178,94,0.2), transparent 42%)",
                                    }}
                                >
                                    <div
                                        className="flex size-28 items-center justify-center rounded-[2rem] border"
                                        style={{
                                            backgroundColor: BRAND.yellowSoft,
                                            borderColor: BRAND.yellowBorder,
                                        }}
                                    >
                                        <Icon
                                            className="size-12"
                                            style={{ color: BRAND.yellow }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div
                                className={`absolute inset-0 ${
                                    imageOnRight
                                        ? "bg-gradient-to-l from-transparent via-black/10 to-black/30"
                                        : "bg-gradient-to-r from-transparent via-black/10 to-black/30"
                                }`}
                            />
                        </div>
                    );

                    return (
                        <article
                            key={`${advantage.title}-${index}`}
                            style={{
                                marginTop: index === 0 ? 0 : "9rem",
                                boxShadow: `0 35px 120px ${BRAND.yellowGlow}`,
                            }}
                            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:bg-white/[0.065]"
                        >
                            <div
                                className="absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100"
                                style={{
                                    background:
                                        "linear-gradient(to right, transparent, rgba(214,178,94,0.45), transparent)",
                                }}
                            />

                            <div
                                className="absolute right-0 top-0 h-80 w-80 translate-x-32 -translate-y-32 rounded-full blur-3xl"
                                style={{
                                    backgroundColor: BRAND.yellowSoft,
                                }}
                            />

                            <div className="relative grid overflow-hidden rounded-[2.5rem] md:grid-cols-2">
                                {imageOnRight ? (
                                    <>
                                        {textBlock}
                                        {imageBlock}
                                    </>
                                ) : (
                                    <>
                                        {imageBlock}
                                        {textBlock}
                                    </>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}