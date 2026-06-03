import { Check, Minus } from "lucide-react"; // Optionnel : utilise des icônes pour plus de lisibilité
import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";

type Criteria = ComparisonPageContent["criteria"];

function WinnerBadge({ winner }: { winner?: string | null }) {
  if (!winner || winner === "tie") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Minus className="w-3 h-3" /> Égalité
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
      <Check className="w-3 h-3" /> Gagnant
    </span>
  );
}

export default function ComparisonCriteriaTable({ criteria }: { criteria: Criteria }) {
  if (!criteria?.length) return null;

  return (
    <section id="comparaison" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-geist font-semibold tracking-tighter text-slate-950 mb-12">
        Analyse détaillée
      </h2>

      <div className="flex flex-col border-t border-slate-200">
        {criteria.map((criterion, index) => (
          <div
            key={criterion._key ?? criterion.label}
            className="group grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_0.5fr] gap-6 py-8 border-b border-slate-100 hover:bg-slate-50/50 transition-colors px-4 -mx-4 rounded-lg"
          >
            {/* Colonne Critère */}
            <div>
              <h3 className="text-sm font-semibold text-slate-950">{criterion.label}</h3>
              {criterion.description && (
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-sm">
                  {criterion.description}
                </p>
              )}
            </div>

            {/* Colonne Gauche */}
            <div className="text-sm text-slate-600 md:self-center font-medium">
              <span className="md:hidden text-xs text-slate-400 uppercase tracking-wider block mb-1">Formation</span>
              {criterion.leftValue}
            </div>

            {/* Colonne Droite (SaaS - Mise en avant) */}
            <div className="text-sm text-slate-900 md:self-center font-semibold">
              <span className="md:hidden text-xs text-slate-400 uppercase tracking-wider block mb-1">SaaS</span>
              {criterion.rightValue}
            </div>

            {/* Résultat */}
            <div className="md:self-center">
              <WinnerBadge winner={criterion.winner} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}