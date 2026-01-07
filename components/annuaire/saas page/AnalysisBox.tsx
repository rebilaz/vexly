import React from "react";
import Link from "next/link";
import { Banknote, Layers3, ShieldCheck, Globe2, ArrowUpRight } from "lucide-react";
import type { Listing } from "@/lib/marketplace";

/* =======================
   Types (UI)
======================= */

type Pillar = {
  title: string;
  description: string;
  icon?: "bank" | "suite" | "security" | "global";
};

/* =======================
   Utils
======================= */

function pickIcon(key?: Pillar["icon"]) {
  switch (key) {
    case "bank":
      return Banknote;
    case "suite":
      return Layers3;
    case "security":
      return ShieldCheck;
    case "global":
      return Globe2;
    default:
      return Layers3;
  }
}

function truncate(text: string, max = 220) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/**
 * Supprime UNIQUEMENT une ligne markdown de type :
 * "# qonto.com"
 */
function stripMarkdownTitleLine(text: string, name?: string) {
  if (!text || !name) return text;

  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^\\s*#\\s*${escaped}\\s*$`, "im");

  return text.replace(regex, "").trim();
}

function derive(listing: Listing) {
  const cleanedContent = listing.content
    ? stripMarkdownTitleLine(listing.content, listing.name)
    : "";

  const summary = cleanedContent ? truncate(cleanedContent, 230) : "";

  const pillars: Pillar[] =
    listing.mvp_features && listing.mvp_features.length
      ? listing.mvp_features.slice(0, 3).map((f, i) => ({
        title: i === 0 ? "Point fort" : i === 1 ? "Cas d’usage" : "Bénéfice",
        description: truncate(String(f), 90),
        icon: i === 0 ? "suite" : i === 1 ? "bank" : "global",
      }))
      : [];

  const facts = listing.facts ?? {};
  return { summary, pillars, facts };
}

/* =======================
   Small UI primitives
======================= */

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-sm font-semibold text-slate-900 text-right break-words max-w-[60%]">
        {value}
      </div>
    </div>
  );
}

/* =======================
   Component
======================= */

export function ConceptOverview({ listing }: { listing: Listing }) {
  const { summary, pillars, facts } = derive(listing);

  const hasFacts = !!facts.pricing || !!facts.coverage || !!facts.status || !!facts.note;

  // ✅ On enlève volontairement stack_guess de la “tech card”
  const hasAnyTech =
    hasFacts ||
    !!listing.pricing_url ||
    !!listing.login_url ||
    !!listing.proof_of_saas ||
    !!listing.niche_category ||
    !!listing.discovered_at;

  if (!summary && pillars.length === 0 && !hasAnyTech) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Technique
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Les infos essentielles, sans bruit.
          </p>
        </div>

        {listing.url && (
          <Link
            href={listing.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Fiche
            <ArrowUpRight className="h-4 w-4 text-slate-500" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Gauche */}
        <div className="lg:col-span-7">
          {summary && (
            <p className="text-base leading-relaxed text-slate-700">{summary}</p>
          )}

          {pillars.length > 0 && (
            <div className="mt-6 grid gap-4">
              {pillars.map((p, i) => {
                const Icon = pickIcon(p.icon);
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900">
                          {p.title}
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          {p.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Droite */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Fiche technique
              </div>
              {/* ❌ Mature supprimé */}
            </div>

            <div className="mt-4 divide-y divide-slate-200">
              {/* ✅ Prix (info clé) */}
              {facts.pricing ? (
                <Row
                  label={<span className="font-medium text-slate-700">Prix</span>}
                  value={
                    <span className="rounded-md bg-indigo-50 px-2 py-1 text-sm font-bold text-indigo-700">
                      {facts.pricing}
                    </span>
                  }
                />
              ) : null}

              {facts.coverage ? <Row label="Couverture" value={facts.coverage} /> : null}

              {/* ✅ Fallbacks propres */}
              {listing.login_url ? <Row label="Login" value="Oui" /> : null}
              {listing.pricing_url ? <Row label="Page pricing" value="Oui" /> : null}
            </div>

            {/* Note en footer soft */}
            {facts.note ? (
              <div className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Note</span>
                <span>{facts.note}</span>
              </div>
            ) : null}

            {/* Si vraiment rien */}
            {!hasFacts && !listing.login_url && !listing.pricing_url ? (
              <div className="mt-4 text-sm text-slate-500">
                Aucune donnée technique disponible pour ce produit.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
