import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HubHero({
    eyebrow = "Parcours",
    title,
    subtitle,
    backHref = "/parcours",
    backLabel = "Tous les parcours",
}: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    backHref?: string;
    backLabel?: string;
}) {
    return (
        <header className="mb-10">
            <div className="flex items-center justify-between gap-4">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                    <ArrowLeft className="size-4" />
                    {backLabel}
                </Link>

                <span className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">
                    {eyebrow}
                </span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                {title}
            </h1>

            {subtitle && (
                <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
                    {subtitle}
                </p>
            )}
        </header>
    );
}
