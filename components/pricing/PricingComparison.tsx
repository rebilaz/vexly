"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Row = {
  label: string;
  starter: "check" | "cancel" | React.ReactNode;
  growth: "check" | "cancel" | React.ReactNode;
  custom: "check" | "cancel" | React.ReactNode;
};

const ROWS: Row[] = [
  { label: "Code Source React/Node.js", starter: "check", growth: "check", custom: "check" },
  { label: "Intégration Stripe", starter: "check", growth: "check", custom: "check" },
  { label: "Design System Custom", starter: "cancel", growth: "check", custom: "check" },
  { label: "Pages Marketing (SEO)", starter: "cancel", growth: "3 pages", custom: "Illimité" },
  { label: "Support Technique", starter: "Email J+2", growth: <>Chat &<br />Email J+1</>, custom: "Slack Dédié" },
];

function ValueCell({
  value,
  emphasize,
}: {
  value: Row["starter"];
  emphasize?: boolean;
}) {
  const isCheck = value === "check";
  const isCancel = value === "cancel";

  return (
    <td className={cx("relative px-8 py-6 text-center align-middle", emphasize && "text-indigo-200")}>
      {/* Accent Growth (dégradé venant de la droite) */}
      {emphasize && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-indigo-500/14 via-indigo-500/7 to-transparent" />
      )}

      <div className="relative z-10 flex items-center justify-center">
        {isCheck ? (
          <CheckCircle2 className={cx("h-5 w-5", emphasize ? "text-indigo-300" : "text-indigo-400")} />
        ) : isCancel ? (
          <XCircle className="h-5 w-5 text-white/18" />
        ) : (
          <span className={cx("text-sm", emphasize ? "font-medium text-indigo-200" : "text-white/70")}>
            {value}
          </span>
        )}
      </div>
    </td>
  );
}

export function PricingComparison() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto mt-12 max-w-6xl">
      {/* Bouton unique */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cx(
            "inline-flex items-center gap-2",
            "rounded-full px-4 py-2",
            "border border-indigo-500/25 bg-indigo-900/10",
            "text-sm font-semibold text-indigo-200",
            "backdrop-blur hover:bg-indigo-900/15 transition",
          )}
        >
          {open ? "Masquer le comparatif" : "Voir le comparatif détaillé"}
          <ChevronDown className={cx("h-4 w-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        <div
          className={cx(
            "relative mt-8 overflow-hidden rounded-3xl",
            "border border-white/12 bg-white/[0.035] backdrop-blur-xl",
            "shadow-[0_24px_90px_rgba(0,0,0,0.55)]",
          )}
        >
          {/* highlights internes premium */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_420px_at_50%_-55%,rgba(255,255,255,0.10),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%)]" />

          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="text-[11px] uppercase tracking-widest text-white/55">
                <tr className="border-b border-white/10">
                  <th className="px-8 py-6 font-semibold text-white/70">Fonctionnalités</th>
                  <th className="px-8 py-6 text-center font-semibold text-white/70">Starter</th>

                  {/* Growth header (accent à droite) */}
                  <th className="relative px-8 py-6 text-center font-semibold text-indigo-200">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-indigo-500/18 to-transparent" />
                    <span className="relative z-10">Growth</span>
                  </th>

                  <th className="px-8 py-6 text-center font-semibold text-white/70">Custom</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {ROWS.map((r) => (
                  <tr key={r.label} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-8 py-7 font-semibold text-white/85">{r.label}</td>
                    <ValueCell value={r.starter} />
                    <ValueCell value={r.growth} emphasize />
                    <ValueCell value={r.custom} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
