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
        <header className="mb-24">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
                >
                    <ArrowLeft className="size-4" />
                    {backLabel}
                </Link>

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600">
                    {eyebrow}
                </span>
            </div>

            {/* Centered hero */}
            <div className="mt-20 flex flex-col items-center text-center">
                <h1 className="max-w-5xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.04]">
                    <span className="text-slate-900">
                        YouTubeur : sortir de
                    </span>{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        l’instabilité des revenus
                    </span>
                </h1>

                {subtitle && (
                    <div className="mt-8 max-w-3xl">
                        <p className="text-[15px] sm:text-[16px] leading-[1.8] text-slate-600">
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
}
