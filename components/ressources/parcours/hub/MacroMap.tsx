import { Compass, Layers, Target, Zap, Check } from "lucide-react";

export type MacroZone = {
    title: string;
    description?: string;
    bullets?: string[];
    icon?: "compass" | "target" | "layers" | "zap";
};

// Composant Icone simplifié et stylisé
function Icon({ name }: { name?: MacroZone["icon"] }) {
    const iconProps = { className: "size-6 text-indigo-600" }; // Couleur accentuée pour guider l'œil

    if (name === "target") return <Target {...iconProps} />;
    if (name === "layers") return <Layers {...iconProps} />;
    if (name === "zap") return <Zap {...iconProps} />;
    return <Compass {...iconProps} />;
}

export default function MacroMap({
    title = "Carte du parcours",
    subtitle = "Trouve ton chemin, étape par étape.",
    zones,
}: {
    title?: string;
    subtitle?: string;
    zones: MacroZone[];
}) {
    return (
        <section className="py-20 bg-slate-50/50">
            <div className="mx-auto max-w-6xl px-6">

                {/* Header centré et épuré */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Grille aérée */}
                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    {zones.map((z, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col items-start rounded-3xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                        >
                            {/* En-tête de la carte */}
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-50 transition-colors group-hover:bg-indigo-100">
                                    <Icon name={z.icon} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">
                                    {z.title}
                                </h3>
                            </div>

                            {/* Contenu textuel allégé visuellement */}
                            <div className="flex-1 space-y-6">
                                {z.description && (
                                    <p className="text-base leading-relaxed text-slate-500">
                                        {z.description}
                                    </p>
                                )}

                                {/* Bullets points stylisés (Checkmarks) */}
                                {z.bullets && z.bullets.length > 0 && (
                                    <ul className="space-y-3">
                                        {z.bullets.map((b, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="mt-1 size-4 shrink-0 text-indigo-400" />
                                                <span className="text-sm font-medium text-slate-600">
                                                    {b}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}