import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";

export type NodeChoice = { label: string; to: string; to_id?: string };

function cx(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function pickVariant(label: string) {
    const l = label.toLowerCase();

    if (l.includes("sponsor") || l.includes("pub") || l.includes("publicit")) {
        return {
            tone: "amber" as const,
            badge: "Dépendance",
            icon: <Shield className="size-5" />,
            bg: "from-amber-50 to-white",
            ring: "ring-amber-200/60",
            iconBg: "bg-amber-100 text-amber-800",
            badgeBg: "bg-amber-100 text-amber-800",
            ctaBg: "bg-amber-600 hover:bg-amber-700",
        };
    }

    return {
        tone: "indigo" as const,
        badge: "Ownership",
        icon: <Sparkles className="size-5" />,
        bg: "from-indigo-50 to-white",
        ring: "ring-indigo-200/60",
        iconBg: "bg-indigo-100 text-indigo-700",
        badgeBg: "bg-indigo-100 text-indigo-700",
        ctaBg: "bg-indigo-600 hover:bg-indigo-700",
    };
}

export default function NodeChoices({
    choices,
    basePath = "/parcours",
    title = "Choisis ta situation",
}: {
    choices: NodeChoice[];
    basePath?: string;
    title?: string;
}) {
    if (!choices?.length) return null;

    return (
        <section className="mt-16">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                {title}
            </h2>

            {/* 2 gros carrés */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {choices.map((c) => {
                    const v = pickVariant(c.label);

                    return (
                        <Link
                            key={c.to}
                            href={`${basePath}/${c.to}`}
                            className={cx(
                                "group relative overflow-hidden rounded-3xl border border-slate-200",
                                "bg-gradient-to-br",
                                v.bg,
                                "p-7 sm:p-8",
                                "shadow-sm hover:shadow-md hover:shadow-slate-900/5 transition",
                                "ring-1",
                                v.ring
                            )}
                        >
                            {/* glow décoratif */}
                            <div
                                className={cx(
                                    "pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-60",
                                    v.tone === "amber" ? "bg-amber-200" : "bg-indigo-200"
                                )}
                            />

                            {/* badge */}
                            <div className="relative">
                                <span
                                    className={cx(
                                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                                        v.badgeBg
                                    )}
                                >
                                    {v.badge}
                                </span>
                            </div>

                            {/* icon + title */}
                            <div className="relative mt-6 flex items-start gap-4">
                                <span
                                    className={cx(
                                        "inline-flex size-12 items-center justify-center rounded-2xl",
                                        v.iconBg
                                    )}
                                >
                                    {v.icon}
                                </span>

                                <p className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
                                    {c.label}
                                </p>
                            </div>

                            {/* CTA uniquement */}
                            <div className="relative mt-8 flex justify-end">
                                <span
                                    className={cx(
                                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white",
                                        v.ctaBg,
                                        "transition"
                                    )}
                                >
                                    Choisir
                                    <ArrowRight className="size-4" />
                                </span>
                            </div>

                            {/* hover border */}
                            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-slate-300/70 transition" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
