import Link from "next/link";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";

type Crumb = {
    label: string;
    href?: string;
};

export default function ParcoursBreadcrumb({
    crumbs,
    hubLabel,
    hubHref,
    badge,
}: {
    crumbs: Crumb[];
    hubLabel?: string;
    hubHref?: string;
    badge?: string;
}) {
    if (!crumbs || crumbs.length === 0) return null;

    return (
        <div className="space-y-6">
            {/* ===== Ligne 1 : Retour + breadcrumb + badge ===== */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    {/* Retour */}
                    <Link
                        href={crumbs[0]?.href ?? "/parcours"}
                        className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-slate-900"
                    >
                        <ArrowLeft className="size-4" />
                        Retour
                    </Link>

                    <span className="text-slate-300">|</span>

                    {/* Crumbs */}
                    {crumbs.map((crumb, index) => (
                        <span key={index} className="inline-flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight className="size-4 text-slate-300" />
                            )}

                            {crumb.href && index < crumbs.length - 1 ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-slate-900 transition"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="font-medium text-slate-900 truncate max-w-[360px]">
                                    {crumb.label}
                                </span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Badge contexte */}
                {badge && (
                    <span className="rounded-full bg-indigo-100 text-indigo-700 px-5 py-2 text-xs font-semibold uppercase tracking-wide">
                        {badge}
                    </span>
                )}
            </div>

            {/* ===== Ligne 2 : Hub ===== */}
            {hubLabel && hubHref && (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700">
                    <BookOpen className="size-4 text-slate-500" />
                    <span>
                        Ce guide fait partie du hub :{" "}
                        <Link
                            href={hubHref}
                            className="font-semibold text-indigo-700 hover:underline"
                        >
                            {hubLabel}
                        </Link>
                    </span>
                </div>
            )}
        </div>
    );
}
