import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type DirectLink = {
    title: string;
    href: string;
    label?: string; // Diagnostic | Dépendance | Décision | Stabilité
};

export default function DirectLinks({
    title = "Entrer par un problème précis",
    subtitle = "Ces pages répondent chacune à une situation réelle. Tu peux commencer par celle qui te concerne le plus.",
    links,
}: {
    title?: string;
    subtitle?: string;
    links: DirectLink[];
}) {
    return (
        <section>
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {title}
                </h2>
                <p className="text-sm text-slate-600 max-w-3xl">
                    {subtitle}
                </p>
            </div>

            {/* Links */}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 hover:bg-slate-50 transition"
                    >
                        <div className="min-w-0">
                            {l.label && (
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {l.label}
                                </p>
                            )}
                            <p className="mt-1 font-semibold text-slate-900 leading-snug">
                                {l.title}
                            </p>
                        </div>

                        <span className="inline-flex items-center gap-2 text-slate-400 group-hover:text-slate-700 transition">
                            <ArrowRight className="size-4" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
