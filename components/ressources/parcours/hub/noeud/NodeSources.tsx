import { ParcoursNode } from "@/lib/parcours/nodes";
import { ExternalLink, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

type NodeSourcesProps = {
    node: ParcoursNode;
};

export default function NodeSources({ node }: NodeSourcesProps) {
    // For now, we'll show canonical URL if available
    // You can extend this to parse sources from content or add a sources field to ParcoursNode
    const hasCanonicalUrl = node.canonical_url && node.canonical_url !== "";
    const hasSeoIntent = node.seo_intent && node.seo_intent !== "";

    // If no sources to display, don't render anything
    if (!hasCanonicalUrl && !hasSeoIntent) {
        return null;
    }

    return (
        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-200">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6">
                <BookOpen className="size-5 text-slate-600" />
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                    Ressources & Références
                </h2>
            </div>

            {/* Sources Grid */}
            <div className="grid gap-4 sm:gap-5">
                {/* Canonical URL */}
                {hasCanonicalUrl && (
                    <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 hover:bg-white hover:shadow-md hover:shadow-slate-900/5 transition">
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                                <FileText className="size-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-slate-900 mb-1">
                                    Page officielle
                                </h3>
                                <a
                                    href={node.canonical_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium group-hover:underline"
                                >
                                    <span className="truncate">{node.canonical_url}</span>
                                    <ExternalLink className="size-4 shrink-0" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO Intent (for context) */}
                {hasSeoIntent && (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                            Intent de recherche
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {node.seo_intent}
                        </p>
                    </div>
                )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 p-6">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">📚</div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">
                            Envie d'aller plus loin ?
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Explore nos autres ressources et parcours pour approfondir tes connaissances.
                        </p>
                        <Link
                            href="/ressources"
                            className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                            Voir toutes les ressources
                            <ExternalLink className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
