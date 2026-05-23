type FeatureFAQProps = {
    data?: {
        title?: string;
        description?: string;
        items?: {
            question?: string;
            answer?: string;
        }[];
    };
};

export function FeatureFAQ({ data }: FeatureFAQProps) {
    const faqs = data?.items || [];

    if (!data?.title && !data?.description && faqs.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-6 pb-44 sm:px-8 lg:px-10 lg:pb-56">
            <div className="border-t border-white/10 pt-24">
                <div className="mx-auto max-w-3xl text-center">
                    {data?.title && (
                        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                            {data.title}
                        </h2>
                    )}

                    {data?.description && (
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                            {data.description}
                        </p>
                    )}
                </div>

                {faqs.length > 0 && (
                    <div className="mx-auto mt-14 grid max-w-5xl gap-4">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.07]"
                            >
                                <div
                                    className="pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition group-hover:opacity-100"
                                    style={{
                                        background:
                                            "linear-gradient(to right, transparent, rgba(214,178,94,0.5), transparent)",
                                    }}
                                />

                                <summary className="cursor-pointer list-none text-left text-lg font-semibold text-white">
                                    {faq.question}
                                </summary>

                                {faq.answer && (
                                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-300">
                                        {faq.answer}
                                    </p>
                                )}
                            </details>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}