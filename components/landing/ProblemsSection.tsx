import { ShieldAlert, TrendingDown, Ban, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal.client";

const ICONS = {
    Ban,
    TrendingDown,
    ShieldAlert,
} satisfies Record<string, LucideIcon>;

type ProblemItem = {
    icon: keyof typeof ICONS;
    title: string;
    description: string;
};

type ProblemsSectionProps = {
    title: string;
    description: string;
    items: readonly ProblemItem[];
};

export default function ProblemsSection({ title, description, items }: ProblemsSectionProps) {
    return (
        <section className="mx-auto max-w-6xl px-4">
            {/* HEADER */}
            <div className="text-center mb-16">
                <h2 className="font-geist text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    {title}
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* GRID DES POINTS DE DOULEUR */}
            <div className="grid gap-8 md:grid-cols-3">
                {items.map((item, index) => {
                    const Icon = ICONS[item.icon];
                    return (
                        <Reveal key={item.title} delay={index * 100}>
                            <div className="h-full rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-8 transition hover:bg-white hover:border-indigo-100 hover:shadow-xl group">
                                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Icon className="size-6" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}