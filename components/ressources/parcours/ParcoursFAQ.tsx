"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const FAQ = [
    {
        q: "À quoi servent les parcours Vexly ?",
        a: "Les parcours sont des guides décisionnels. Ils t’aident à clarifier un problème précis, à comprendre tes options, et à choisir une direction sans te disperser.",
    },
    {
        q: "Est-ce que les parcours sont adaptés aux débutants ?",
        a: "Oui. Ils ne supposent pas de connaissances techniques avancées. L’objectif est la clarté, pas la complexité.",
    },
    {
        q: "Pourquoi certains parcours sont indiqués comme “bientôt” ?",
        a: "Ils sont en cours de finalisation. Les afficher permet de rendre la roadmap visible et de poser le cadre des problématiques couvertes.",
    },
    {
        q: "Est-ce que je dois suivre tous les parcours ?",
        a: "Non. Chaque parcours est indépendant. Tu choisis uniquement celui qui correspond à ton problème actuel.",
    },
];

export function ParcoursFAQ() {
    const [open, setOpen] = React.useState<number>(1); // ✅ 1 item ouvert par défaut (comme ton exemple)

    return (
        <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
                {FAQ.map((item, i) => {
                    const isOpen = open === i;

                    return (
                        <div
                            key={i}
                            className={[
                                "rounded-2xl border bg-white transition",
                                isOpen ? "border-slate-900 shadow-sm" : "border-slate-200",
                            ].join(" ")}
                        >
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                aria-expanded={isOpen}
                            >
                                <span className="text-sm sm:text-base font-semibold text-slate-900">
                                    {item.q}
                                </span>

                                <ChevronDown
                                    className={[
                                        "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200",
                                        isOpen ? "rotate-180" : "rotate-0",
                                    ].join(" ")}
                                />
                            </button>

                            {/* Content */}
                            <div
                                className={[
                                    "grid transition-[grid-template-rows] duration-200 ease-out",
                                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                                ].join(" ")}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-sm leading-relaxed text-slate-600">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* mini footer optionnel, discret */}
            <p className="mt-6 text-center text-xs text-slate-500">
                Une question ? Tu peux proposer un parcours ou un sujet.
            </p>
        </div>
    );
}
