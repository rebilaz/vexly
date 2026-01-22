import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Shield, Sparkles } from "lucide-react";
import { Geist } from "next/font/google";

const geist = Geist({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
});

export type Entry = {
    title: string;
    description: string;
    href: string;

    tone?: "indigo" | "amber" | "emerald";
    icon?: "compass" | "shield" | "sparkles";

    imageSrc?: string;
    ctaLabel?: string;
};

function pickStyle(tone: NonNullable<Entry["tone"]>) {
    if (tone === "amber") {
        return {
            iconBg: "bg-amber-100 text-amber-800",
            link: "text-amber-700 hover:text-amber-900",
            arrow: "text-amber-600 group-hover:text-amber-800",
            imageBg: "bg-amber-50/60",
            ringHover: "group-hover:ring-amber-200/60",
        };
    }
    if (tone === "emerald") {
        return {
            iconBg: "bg-emerald-100 text-emerald-800",
            link: "text-emerald-700 hover:text-emerald-900",
            arrow: "text-emerald-600 group-hover:text-emerald-800",
            imageBg: "bg-emerald-50/60",
            ringHover: "group-hover:ring-emerald-200/60",
        };
    }
    return {
        iconBg: "bg-indigo-100 text-indigo-700",
        link: "text-indigo-700 hover:text-indigo-900",
        arrow: "text-indigo-600 group-hover:text-indigo-800",
        imageBg: "bg-indigo-50/60",
        ringHover: "group-hover:ring-indigo-200/60",
    };
}

function Icon({ name }: { name?: Entry["icon"] }) {
    if (name === "shield") return <Shield className="size-5" />;
    if (name === "sparkles") return <Sparkles className="size-5" />;
    return <Compass className="size-5" />;
}

export default function EntryCards({
    title = "Choisis ton point de départ",
    subtitle = "Des parcours conçus pour votre niveau d’expertise.",
    entries,
}: {
    title?: string;
    subtitle?: string;
    entries: Entry[];
}) {
    return (
        <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <header className="mx-auto max-w-2xl text-center">
                    <h2
                        className={[
                            geist.className,
                            "text-3xl sm:text-4xl",
                            "font-semibold tracking-tight",
                            "text-slate-900 leading-[1.06]",
                        ].join(" ")}
                    >
                        {title}
                    </h2>

                    {subtitle ? (
                        <p className="mx-auto mt-3 text-[15px] sm:text-base leading-relaxed text-slate-600">
                            {subtitle}
                        </p>
                    ) : null}
                </header>

                {/* Grid */}
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {entries.map((e) => {
                        const tone = e.tone ?? "indigo";
                        const s = pickStyle(tone);

                        return (
                            <Link
                                key={e.href}
                                href={e.href}
                                className={[
                                    "group relative overflow-hidden rounded-3xl",
                                    // surface premium
                                    "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
                                    // border + ring très subtil
                                    "ring-1 ring-slate-200/70",
                                    s.ringHover,
                                    // shadow plus “soft”
                                    "shadow-[0_1px_0_rgba(15,23,42,0.04),0_10px_30px_rgba(15,23,42,0.06)]",
                                    "transition-all duration-300",
                                    "hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_16px_45px_rgba(15,23,42,0.10)]",
                                    // focus
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40",
                                ].join(" ")}
                            >
                                {/* Illustration */}
                                <div
                                    className={[
                                        "relative h-[150px] w-full overflow-hidden",
                                        "flex items-center justify-center",
                                        s.imageBg,
                                    ].join(" ")}
                                >
                                    {e.imageSrc ? (
                                        <Image
                                            src={e.imageSrc}
                                            alt=""
                                            width={720}
                                            height={360}
                                            className="h-full w-full object-contain px-7 py-6"
                                            priority={false}
                                        />
                                    ) : (
                                        <div className="h-full w-full" />
                                    )}

                                    {/* voile bas (matière) */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/70" />
                                </div>

                                {/* Content */}
                                <div className="px-7 pb-7 pt-6">
                                    <div className="flex items-start gap-4">
                                        <span
                                            className={[
                                                "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl",
                                                "ring-1 ring-black/5",
                                                s.iconBg,
                                            ].join(" ")}
                                        >
                                            <Icon name={e.icon} />
                                        </span>

                                        <div className="min-w-0">
                                            <p className="text-[18px] sm:text-[19px] font-semibold tracking-tight text-slate-900 leading-snug">
                                                {e.title}
                                            </p>
                                            <p className="mt-2 text-[13.5px] sm:text-sm leading-relaxed text-slate-600">
                                                {e.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                                        <span className={s.link}>{e.ctaLabel ?? "Ouvrir"}</span>
                                        <ArrowRight
                                            className={[
                                                "size-4 transition-transform duration-200",
                                                "group-hover:translate-x-0.5",
                                                s.arrow,
                                            ].join(" ")}
                                        />
                                    </div>
                                </div>

                                {/* séparateur très subtil */}
                                <div
                                    aria-hidden
                                    className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent"
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
