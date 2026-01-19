import Link from "next/link";
import { ArrowRight, Compass, Shield, Sparkles } from "lucide-react";

export type Entry = {
    title: string;
    description: string;
    href: string;
    tone?: "indigo" | "amber" | "emerald";
    icon?: "compass" | "shield" | "sparkles";
};

function pickStyle(tone: NonNullable<Entry["tone"]>) {
    if (tone === "amber") {
        return {
            bg: "from-amber-50 to-white",
            ring: "ring-amber-200/60",
            iconBg: "bg-amber-100 text-amber-800",
            cta: "bg-amber-600 hover:bg-amber-700",
        };
    }
    if (tone === "emerald") {
        return {
            bg: "from-emerald-50 to-white",
            ring: "ring-emerald-200/60",
            iconBg: "bg-emerald-100 text-emerald-800",
            cta: "bg-emerald-600 hover:bg-emerald-700",
        };
    }
    return {
        bg: "from-indigo-50 to-white",
        ring: "ring-indigo-200/60",
        iconBg: "bg-indigo-100 text-indigo-700",
        cta: "bg-indigo-600 hover:bg-indigo-700",
    };
}

function Icon({ name }: { name?: Entry["icon"] }) {
    if (name === "shield") return <Shield className="size-5" />;
    if (name === "sparkles") return <Sparkles className="size-5" />;
    return <Compass className="size-5" />;
}

export default function EntryCards({
    title = "Choisis ton point de départ",
    entries,
}: {
    title?: string;
    entries: Entry[];
}) {
    return (
        <section className="mb-12">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                {title}
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
                {entries.map((e) => {
                    const tone = e.tone ?? "indigo";
                    const s = pickStyle(tone);

                    return (
                        <Link
                            key={e.href}
                            href={e.href}
                            className={[
                                "group relative overflow-hidden rounded-3xl border border-slate-200",
                                "bg-gradient-to-br",
                                s.bg,
                                "p-7",
                                "shadow-sm hover:shadow-md hover:shadow-slate-900/5 transition",
                                "ring-1",
                                s.ring,
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-60",
                                    tone === "amber"
                                        ? "bg-amber-200"
                                        : tone === "emerald"
                                            ? "bg-emerald-200"
                                            : "bg-indigo-200",
                                ].join(" ")}
                            />

                            <div className="relative flex items-start gap-4">
                                <span
                                    className={[
                                        "inline-flex size-12 items-center justify-center rounded-2xl",
                                        s.iconBg,
                                    ].join(" ")}
                                >
                                    <Icon name={e.icon} />
                                </span>

                                <div className="min-w-0">
                                    <p className="text-xl font-semibold text-slate-900 leading-snug">
                                        {e.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {e.description}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-7 flex justify-end">
                                <span
                                    className={[
                                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white",
                                        s.cta,
                                        "transition",
                                    ].join(" ")}
                                >
                                    Ouvrir
                                    <ArrowRight className="size-4" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
