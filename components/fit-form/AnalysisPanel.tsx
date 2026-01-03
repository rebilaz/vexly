"use client";

import React, { useMemo } from "react";
import type { FormData, Offer } from "./types";
import { labelForOffer } from "./logic";

function priceForOffer(offer: Offer) {
  switch (offer) {
    case "KICKSTARTER":
      return 490;
    case "BRANDING":
      return 1490;
    case "MVP":
      return 3990;
    default:
      return 0;
  }
}

function formatEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

export default function AnalysisPanel({
  data,
  offer,
  step,
}: {
  data: FormData;
  offer: Offer;
  step: 1 | 2 | 3 | 4 | 5;
}) {
  const price = useMemo(() => priceForOffer(offer), [offer]);

  const budgetOk = data.budget !== "<500";
  const budgetLabel =
    data.budget === "<500"
      ? "REFUS"
      : data.budget === "500-1500"
      ? "OK (petit)"
      : data.budget === "1500-5000"
      ? "OK"
      : "OK+";

  const complexity =
    data.needCustom === "YES"
      ? "ÉLEVÉE"
      : data.integrations.trim().length > 25
      ? "MOYENNE"
      : "FAIBLE";

  const statusColor =
    offer === "EXIT_LOW_BUDGET" || offer === "EXIT_NOT_READY"
      ? "text-amber-600"
      : offer === "MVP"
      ? "text-blue-600"
      : "text-emerald-600";

  const title =
    step === 1
      ? "Pas de temps à perdre"
      : step === 2
      ? "Le filtre à touristes"
      : step === 3
      ? "Remplacer l’appel"
      : step === 4
      ? "Cadrage"
      : "Décision finale";

  const message =
    step === 1
      ? "Je travaille en async. Si vous ne pouvez pas écrire clairement ce que vous voulez, vous n’êtes pas prêt."
      : step === 2
      ? "Ici on empêche le client de choisir “le moins cher” puis d’exiger du custom."
      : step === 3
      ? "On remplace l’appel par un routing automatique + un cadre."
      : step === 4
      ? "On verrouille le scope : user stories, intégrations, exclusions."
      : "Si c’est validé : vous recevez le lien de paiement. Sinon : je vous dis pourquoi.";

  return (
    <div className="sticky top-6 space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-700">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-neutral-100">🧠</span>
          ANALYSE PRODUCT MANAGER
        </div>

        <h3 className="mt-4 text-xl font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{message}</p>

        <div className="mt-4 border-t border-neutral-200 pt-4">
          <p className="text-xs tracking-widest text-neutral-500">LOGIQUE DE FILTRAGE ACTIVE</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-widest text-neutral-500">ESTIMATION OFFRE</p>
          <p className={`text-xs font-semibold ${statusColor}`}>
            {offer === "EXIT_LOW_BUDGET" || offer === "EXIT_NOT_READY" ? "REFUS" : "OK"}
          </p>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <Row label="Offre" value={labelForOffer(offer)} valueClass="text-neutral-900" />
          <Row
            label="Prix"
            value={price ? formatEUR(price) : "—"}
            valueClass={price ? "text-neutral-900" : "text-neutral-400"}
          />
          <Row
            label="Complexité"
            value={complexity}
            valueClass={complexity === "FAIBLE" ? "text-emerald-600" : complexity === "MOYENNE" ? "text-blue-600" : "text-amber-600"}
          />
          <Row
            label="Budget check"
            value={budgetOk ? budgetLabel : "PENDING"}
            valueClass={budgetOk ? "text-emerald-600" : "text-neutral-400"}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{label}</span>
      <span className={`text-sm font-medium ${valueClass ?? "text-neutral-900"}`}>{value}</span>
    </div>
  );
}
