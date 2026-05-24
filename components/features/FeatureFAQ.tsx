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
        <section className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 lg:px-10">
            <div className="border-t border-slate-200 pt-16 sm:pt-24">
                <div className="mx-auto max-w-3xl text-center">
                    {data?.title && (
                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            {data.title}
                        </h2>
                    )}

                    {data?.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
                            {data.description}
                        </p>
                    )}
                </div>

                {faqs.length > 0 && (
                    <div className="mx-auto mt-12 grid gap-4">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-indigo-100 hover:shadow-md"
                            >
                                <summary className="cursor-pointer list-none text-left text-lg font-semibold text-slate-900 select-none">
                                    <div className="flex items-center justify-between gap-4">
                                        <span>{faq.question}</span>
                                        <span className="text-slate-400 transition-transform duration-200 group-open:rotate-45">
                                            +
                                        </span>
                                    </div>
                                </summary>

                                {faq.answer && (
                                    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
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