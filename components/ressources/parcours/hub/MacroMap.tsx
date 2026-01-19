import { Compass, Layers, Target, Zap } from "lucide-react";

export type MacroZone = {
    title: string;
    description: string;
    bullets: string[];
    icon?: "compass" | "target" | "layers" | "zap";
};

function Icon({ name }: { name?: MacroZone["icon"] }) {
    if (name === "target") return <Target className="size-5" />;
    if (name === "layers") return <Layers className="size-5" />;
    if (name === "zap") return <Zap className="size-5" />;
    return <Compass className="size-5" />;
}

export default function MacroMap({
    title = "Carte du parcours",
    subtitle = "Tu n’as pas besoin de tout faire. Le but est de trouver ton chemin.",
    zones,
}: {
    title?: string;
    subtitle?: string;
    zones: MacroZone[];
}) {
    return (
        <section className="mb-12">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {title}
                </h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
                {zones.map((z) => (
                    <div
                        key={z.title}
                        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700">
                                <Icon name={z.icon} />
                            </span>
                            <div className="min-w-0">
                                <p className="text-lg font-semibold text-slate-900">{z.title}</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {z.description}
                                </p>
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm text-slate-700">
                            {z.bullets.map((b) => (
                                <li key={b} className="flex gap-2">
                                    <span className="mt-1.5 size-1.5 rounded-full bg-slate-300" />
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
