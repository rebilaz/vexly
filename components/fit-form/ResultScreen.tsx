// components/fit-form/ResultScreen.tsx
"use client";

import React from "react";
import type { FormData, Offer } from "./types";
import { labelForOffer, stripeLinkFor } from "./logic";

export default function ResultScreen({ data, offer }: { data: FormData; offer: Offer }) {
  if (offer === "EXIT_LOW_BUDGET") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Pas le bon cadre</h2>
        <p className="text-sm text-neutral-700">
          Avec un budget &lt; 500€, je ne peux pas livrer proprement sans risque (pour toi et pour moi).
        </p>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <p className="font-medium">Alternative :</p>
          <ul className="mt-2 list-disc pl-5 text-neutral-700">
            <li>Boilerplate / template à installer</li>
            <li>Ressources pour cadrer ton MVP</li>
          </ul>
        </div>
      </div>
    );
  }

  if (offer === "EXIT_NOT_READY") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Trop tôt (exploration)</h2>
        <p className="text-sm text-neutral-700">
          Si tu n’as pas encore une feature centrale claire, tu risques de payer pour du flou.
        </p>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <p className="font-medium">Reviens quand tu as :</p>
          <ul className="mt-2 list-disc pl-5 text-neutral-700">
            <li>1 phrase : problème + cible + résultat</li>
            <li>3 user stories minimum</li>
            <li>Une liste d’exclusions</li>
          </ul>
        </div>
      </div>
    );
  }

  const link = stripeLinkFor(offer);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold tracking-tight">
        Merci — Offre recommandée : {labelForOffer(offer)}
      </h2>
      <p className="text-sm text-neutral-700">
        Je valide la faisabilité à partir de tes réponses. Si c’est OK, tu peux démarrer via paiement.
      </p>

      <div className="rounded-2xl border border-neutral-200 p-4">
        <p className="text-sm font-medium">Résumé</p>
        <div className="mt-2 grid gap-1 text-sm text-neutral-700">
          <div>
            <span className="text-neutral-500">Projet :</span> {data.companyOrProject}
          </div>
          <div>
            <span className="text-neutral-500">Budget :</span> {data.budget}
          </div>
          <div>
            <span className="text-neutral-500">Custom :</span> {data.needCustom}
          </div>
          <div>
            <span className="text-neutral-500">WhatsApp :</span>{" "}
            {data.whatsappPreferred === "YES" ? data.whatsappNumber || "Oui" : "Non"}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={link}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white"
        >
          Payer et démarrer
        </a>

        <a
          href={`mailto:${encodeURIComponent(
            data.email
          )}?subject=${encodeURIComponent("Confirmation — Vérification de faisabilité")}&body=${encodeURIComponent(
            "Merci. Réponds à cet email si tu veux ajouter un détail important."
          )}`}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 px-5 text-sm"
        >
          Ajouter un détail par email
        </a>
      </div>

      <p className="text-xs text-neutral-500">
        Si ça dépasse le cadre (ex: MVP &gt; 5 jours), je propose Extension Pack ou audit.
      </p>
    </div>
  );
}
