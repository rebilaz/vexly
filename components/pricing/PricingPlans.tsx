"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, Rocket, MessageSquare, ArrowRight, Shield } from "lucide-react";
import type { PricingPlan } from "./PricingClient";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function euro(n: number) {
  return `${n}€`;
}

type FeatureRow = {
  label: string;
  enabled: boolean;
  tone?: "indigo" | "emerald" | "muted";
};

export function PricingPlans({
  plans,
  withMaintenance,
}: {
  plans: PricingPlan[];
  withMaintenance: boolean;
  onToggleMaintenance: (v: boolean) => void; // compat, non utilisé ici
}) {
  return (
    <section className="mx-auto mt-10">
      {/* même largeur et même “respiration” que Gemini */}
      <div className="grid gap-7 md:grid-cols-3 md:gap-8 md:items-stretch">
        {plans.map((plan) => {
          const featured = Boolean(plan.featured);

          // Base features depuis tes données
          let features: FeatureRow[] = plan.features.map((f) => ({
            label: f,
            enabled: true,
            tone: "indigo",
          }));

          // Starter : ligne barrée branding (comme Gemini)
          if (plan.name === "Starter") {
            features = [
              ...features.slice(0, 3),
              { label: "Personnalisation Branding", enabled: false, tone: "muted" },
              ...features.slice(3),
            ];
          }

          // Maintenance : items “sécurité/support”
          if (withMaintenance && plan.name === "Starter") {
            features = [
              ...features,
              { label: "Mises à jour sécurité (Mensuel)", enabled: true, tone: "emerald" },
            ];
          }

          if (withMaintenance && plan.name === "Growth") {
            const already = features.some((x) => x.label === "Support prioritaire 24/7");
            if (!already) {
              features = [
                ...features,
                { label: "Support prioritaire 24/7", enabled: true, tone: "emerald" },
              ];
            }
          }

          // Dédupe (sécurité)
          const seen = new Set<string>();
          features = features.filter((f) => {
            if (seen.has(f.label)) return false;
            seen.add(f.label);
            return true;
          });

          const showMaint =
            withMaintenance && typeof plan.maintenanceMonthly === "number" && plan.basePrice !== null;

          // Wrapper Growth : contour violet uniquement
          const OuterWrapper = ({ children }: { children: React.ReactNode }) => {
            if (!featured) return <>{children}</>;

            return (
              <div className="relative overflow-visible md:-translate-y-4">
                {/* glow externe léger */}
                <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(99,102,241,0.22),transparent_65%)] blur-2xl" />
                {/* border gradient 1px */}
                <div className="relative rounded-[28px] bg-[linear-gradient(90deg,rgba(99,102,241,0.9),rgba(168,85,247,0.75),rgba(99,102,241,0.9))] p-[1px]">
                  <div className="rounded-[27px] ring-1 ring-indigo-300/20">{children}</div>
                </div>
              </div>
            );
          };

          // Card (contenu) — FIX DIMENSIONS: même silhouette sur les 3
          const CardInner = (
            <div
              className={cx(
                "relative overflow-visible rounded-[27px] border backdrop-blur-xl",
                "shadow-[0_22px_90px_rgba(0,0,0,0.55)]",
                "transition-colors duration-300",
                featured ? "bg-[#070E22] border-transparent" : "bg-white/[0.035] border-white/12 hover:border-white/18",
              )}
            >
              {/* Badge — dégradé + nowrap + centré au-dessus */}
              {featured && (
                <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                  <span className="
                    inline-flex items-center justify-center whitespace-nowrap
                    rounded-full px-4 py-1.5
                    text-[11px] font-black uppercase tracking-[0.16em] text-white
                    bg-gradient-to-r from-indigo-500/80 via-indigo-500 to-violet-500
                    shadow-lg shadow-indigo-900/40
                    shadow-[inset_-12px_0_20px_rgba(255,255,255,0.12)]
                  ">
                    LE PLUS POPULAIRE
                  </span>
                </div>
              )}

              {/* highlights internes (propre, léger) */}
              <div className="pointer-events-none absolute inset-0 rounded-[27px]">
                <div className="absolute inset-0 rounded-[27px] bg-[radial-gradient(1200px_420px_at_50%_-55%,rgba(255,255,255,0.10),transparent_55%)]" />
                <div className="absolute inset-0 rounded-[27px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%)]" />
                {featured && <div className="absolute inset-0 rounded-[27px] bg-indigo-500/5" />}
              </div>

              {/* FIX DIMENSIONS */}
              <div
                className={cx(
                  "relative flex h-full min-h-[560px] flex-col", // <- même taille globale
                  "p-7 md:p-8",
                  featured && "pt-10",
                )}
              >
                {/* Header */}
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{plan.highlight}</p>
                </div>

                {/* Price */}
                <div className="mt-6">
                  {plan.basePrice === null ? (
                    <div className="text-4xl font-black tracking-tight text-white">Sur devis</div>
                  ) : (
                    <div className="flex items-end gap-2">
                      <span className={cx("font-black tracking-tight text-white", featured ? "text-5xl" : "text-4xl")}>
                        {euro(plan.basePrice)}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-white/45">/ projet</span>
                    </div>
                  )}

                  {showMaint && (
                    <div className="mt-2 text-sm font-semibold text-indigo-200">
                      + {euro(plan.maintenanceMonthly!)} <span className="text-white/45">/ mois</span>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-white/40">
                    {plan.name === "Growth"
                      ? "Tout inclus, pas de frais cachés"
                      : plan.name === "Custom"
                        ? "Facturation flexible"
                        : "Paiement unique au démarrage"}
                  </p>
                </div>

                {/* CTA (mêmes dimensions) */}
                <div className="mt-6">
                  {plan.ctaHref ? (
                    <Link
                      href={plan.ctaHref}
                      className={cx(
                        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition",
                        featured
                          ? "bg-white text-slate-900 hover:bg-white/90 shadow-lg shadow-indigo-900/20"
                          : "border border-white/12 bg-white/[0.06] text-white hover:bg-white/[0.09]",
                      )}
                    >
                      <MessageSquare className="h-4 w-4" />
                      {plan.ctaLabel}
                      <ArrowRight className="h-4 w-4 opacity-70" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={cx(
                        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition active:scale-[0.99]",
                        featured
                          ? "bg-white text-slate-900 hover:bg-white/90 shadow-lg shadow-indigo-900/20"
                          : "border border-white/12 bg-white/[0.06] text-white hover:bg-white/[0.09]",
                      )}
                    >
                      {featured ? <Rocket className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      {plan.ctaLabel}
                    </button>
                  )}
                </div>

                {/* Features (flex-1 => égalise les hauteurs) */}
                <div className="mt-7 flex-1 space-y-3">
                  {features.map((f, idx) => {
                    const Icon = f.enabled ? CheckCircle2 : XCircle;

                    const iconClass =
                      f.tone === "emerald"
                        ? "text-emerald-300"
                        : f.enabled
                          ? featured
                            ? "text-indigo-200"
                            : "text-indigo-300"
                          : "text-white/25";

                    const textClass = f.enabled
                      ? featured
                        ? "text-white/80"
                        : "text-white/70"
                      : "text-white/35 line-through";

                    return (
                      <div
                        key={`${plan.name}-${f.label}-${idx}`}
                        className={cx("flex items-start gap-3", !f.enabled && "opacity-70")}
                      >
                        <Icon className={cx("mt-0.5 h-5 w-5 shrink-0", iconClass)} />
                        <span className={cx("text-sm leading-relaxed", textClass)}>{f.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom line (SLA) — collé en bas, comme Gemini */}
                {plan.name === "Custom" && withMaintenance && (
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-200">
                    <Shield className="h-4 w-4 text-emerald-300" />
                    Contrat de maintenance SLA
                  </div>
                )}
              </div>
            </div>
          );

          // Render
          return (
            <div key={plan.name} className="relative">
              {featured ? <OuterWrapper>{CardInner}</OuterWrapper> : CardInner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
