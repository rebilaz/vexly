type FeatureSeoContentProps = {
    data?: {
        title?: string;
        paragraphs?: string[];
        items?: {
            title?: string;
        }[];
    };
};

export function FeatureSeoContent({ data }: FeatureSeoContentProps) {
    const paragraphs = data?.paragraphs || [];
    const items = data?.items || [];

    if (!data?.title && paragraphs.length === 0 && items.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
            <div className="border-t border-white/10 pt-24">
                <div className="mx-auto max-w-4xl text-center">
                    {data?.title && (
                        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                            {data.title}
                        </h2>
                    )}

                    {paragraphs.length > 0 && (
                        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-base leading-8 text-neutral-300 sm:text-lg">
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
                        {items.map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center transition hover:border-white/20 hover:bg-white/[0.07]"
                            >
                                <div
                                    className="pointer-events-none absolute inset-x-8 top-0 h-px"
                                    style={{
                                        background:
                                            "linear-gradient(to right, transparent, rgba(214,178,94,0.5), transparent)",
                                    }}
                                />

                                <p className="text-sm font-semibold text-white">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}