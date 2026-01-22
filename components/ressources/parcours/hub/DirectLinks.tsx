import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type DirectLink = {
    title: string;
    href: string;
    label?: string; // Diagnostic | Dépendance | Décision | Stabilité
};

export default function DirectLinks({
    title = "Entrer par un problème précis",
    subtitle = "Choisis la situation qui te correspond le plus.",
    links,
}: {
    title?: string;
    subtitle?: string;
    links: DirectLink[];
}) {
    // Optionnel : Si tu veux forcer la limitation à 4 choix max pour ne pas surcharger
    const displayedLinks = links.slice(0, 4);

    return (
        <section className="py-10">
            <div className="mx-auto max-w-4xl px-4">

                {/* Header centré */}
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {title}
                    </h2>
                    <p className="mt-2 text-slate-500">
                        {subtitle}
                    </p>
                </div>

                {/* Grille aérée */}
                <div className="grid gap-6 md:grid-cols-2">
                    {displayedLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-3">
                                    {/* Badge Label (plus discret) */}
                                    {l.label && (
                                        <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                            {l.label}
                                        </span>
                                    )}

                                    {/* Titre du lien */}
                                    <span className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {l.title}
                                    </span>
                                </div>

                                {/* Bouton flèche interactif */}
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-[-45deg] md:group-hover:rotate-0">
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}