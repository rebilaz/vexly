import { AlertTriangle, Quote, HelpCircle } from "lucide-react";

function Card({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="inline-flex size-7 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                    {icon}
                </span>
                <span>{label}</span>
            </div>

            <div className="mt-3 text-sm leading-relaxed text-slate-700">
                {children}
            </div>
        </div>
    );
}

export default function NodeHeader({
    eyebrow = "Parcours",
    title,
    problem,
    question,
    shock,
    example,
}: {
    eyebrow?: string;
    title: string;
    problem?: string;
    question?: string;
    shock?: string;
    example?: string;
}) {
    const hasPanels = Boolean(shock || example || question);

    return (
        <header className="mb-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {eyebrow}
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Diagnostic
                </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                {title}
            </h1>

            {/* Problem */}
            {problem && (
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                    {problem}
                </p>
            )}

            {/* Panels */}
            {hasPanels && (
                <div className="mt-7 grid gap-3 sm:gap-4">
                    {shock && (
                        <Card
                            label="Le point dur"
                            icon={<AlertTriangle className="size-4" />}
                        >
                            {shock}
                        </Card>
                    )}

                    {example && (
                        <Card label="Exemple concret" icon={<Quote className="size-4" />}>
                            {example}
                        </Card>
                    )}

                    {question && (
                        <Card
                            label="Ta question à trancher"
                            icon={<HelpCircle className="size-4" />}
                        >
                            {question}
                        </Card>
                    )}
                </div>
            )}
        </header>
    );
}
