import {
    BarChart3,
    Rocket,
    Target,
    Settings,
    ShieldCheck,
    LucideIcon
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

function getAdvantageIcon(index: number): LucideIcon {
    const icons = [Rocket, Target, Settings, BarChart3, ShieldCheck];
    return icons[index % icons.length];
}

function isExternalUrl(href: string) {
    return href.startsWith("http://") || href.startsWith("https://");
}

export function FeatureAdvantages({ advantages }: FeatureAdvantagesProps) {
    if (!advantages?.length) return null;

    return (
        <section
            id="vexly-avantages"
            className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10"
        >
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    Des fonctionnalités pensées pour propulser votre activité.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
                    Découvrez en détail les avantages clés de cette expertise et comment elle s'intègre à votre futur SaaS.
                </p>
            </div>

            <div className="mt-16 flex flex-col gap-12 sm:mt-24 lg:mt-32">
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
                            className="flex flex-col justify-center p-8 sm:p-10 lg:p-14"
                        >
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6 border border-indigo-100">
                                <Icon className="size-6" />
                            </div>

                            <h3 className="max-w-xl text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                                {advantage.title}
                            </h3>

                            {advantage.description ? (
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                                    {advantage.description}
                                </p>
                            ) : null}

                            {hasLink ? (
                                <a
                                    href={linkHref}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700"
                                >
                                    {linkLabel}
                                    <span className="ml-2 text-indigo-600">
                                        →
                                    </span>
                                </a>
                            ) : null}
                        </div>
                    );

                    const imageBlock = (
                        <div
                            key="image"
                            className={`relative min-h-[300px] overflow-hidden bg-slate-50 md:min-h-[360px] lg:min-h-[400px] ${
                                imageOnRight ? "md:border-l border-slate-100" : "md:border-r border-slate-100"
                            }`}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={advantage.image?.alt || advantage.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="flex size-24 items-center justify-center rounded-3xl border border-indigo-100 bg-indigo-50/40">
                                        <Icon className="size-10 text-indigo-500" />
                                    </div>
                                </div>
                            )}
                        </div>
                    );

                    return (
                        <article
                            key={`${advantage.title}-${index}`}
                            className="group relative overflow-hidden rounded-[2.5rem] border-2 border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
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