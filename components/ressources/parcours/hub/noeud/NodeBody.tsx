import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function NodeBody({ content }: { content: string }) {
    return (
        <article
            className={cx(
                "prose prose-slate max-w-none",

                // texte
                "prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base",
                "prose-li:my-2 prose-li:text-slate-700",
                "prose-strong:text-slate-900 prose-strong:font-semibold",

                // liens
                "prose-a:text-indigo-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline",

                // séparateurs
                "prose-hr:my-12 prose-hr:border-slate-200",

                // code inline
                "prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-slate-900",

                // on neutralise blockquote par défaut (si tu veux en faire des cards)
                "prose-blockquote:not-italic prose-blockquote:border-0 prose-blockquote:p-0"
            )}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // liens internes/externes
                    a: ({ href, children, ...props }) => {
                        const url = href ?? "";
                        const isExternal = /^https?:\/\//.test(url);

                        if (!url) return <span>{children}</span>;

                        if (isExternal) {
                            return (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-indigo-700 hover:underline"
                                    {...props}
                                >
                                    {children}
                                </a>
                            );
                        }

                        return (
                            <Link
                                href={url}
                                className="font-medium text-indigo-700 hover:underline"
                                {...(props as any)}
                            >
                                {children}
                            </Link>
                        );
                    },

                    // ✅ H2 forcés (GROS + GRAS) — ça ne peut pas être ignoré
                    h2: ({ children }) => (
                        <h2 className="mt-14 mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-3 scroll-mt-28">
                            {children}
                        </h2>
                    ),

                    // H3 un peu plus marqué aussi
                    h3: ({ children }) => (
                        <h3 className="mt-10 mb-4 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                            {children}
                        </h3>
                    ),

                    // option : blockquote en “card”
                    blockquote: ({ children }) => (
                        <div className="my-10 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                            <div className="text-base leading-relaxed text-slate-700">
                                {children}
                            </div>
                        </div>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
