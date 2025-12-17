import { Zap, Star, BadgeCheck } from "lucide-react";

export function AnalysisBox({ comment }: { comment?: string }) {
  if (!comment) return null;

  return (
    <div className="space-y-6">
      {/* Avis expert */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 shadow-sm ring-1 ring-amber-200/30">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm">
            <Zap size={16} className="fill-current" />
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-900/50">
              L&apos;avis de l&apos;expert
            </h3>
            <p className="mt-1 text-sm font-medium leading-relaxed text-amber-900/80 italic">
              &quot;{comment}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Stars + Verified */}
      <div className="flex items-center gap-4 px-1">
        <div className="flex items-center gap-2 rounded-xl border border-yellow-100 bg-yellow-50/50 px-3 py-1.5">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < 4 ? "currentColor" : "none"}
                className={i === 4 ? "text-yellow-400" : ""}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-900">4.8</span>
          <span className="text-xs text-slate-400">(124 avis)</span>
        </div>

        <div className="h-4 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
          <BadgeCheck className="text-blue-500" size={18} />
          Vérifié par l&apos;équipe
        </div>
      </div>
    </div>
  );
}
