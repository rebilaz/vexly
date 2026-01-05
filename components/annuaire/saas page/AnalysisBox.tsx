import React from "react";
import Link from "next/link";
import { Banknote, Layers3, ShieldCheck, Globe2 } from "lucide-react";

/* =======================
   Types
======================= */

type Pillar = {
  title: string;
  description: string;
  icon?: "bank" | "suite" | "security" | "global";
};

type Facts = {
  pricing?: string;
  coverage?: string;
  status?: string;
  note?: string;
};

type ListingLike = {
  name: string;
  url?: string;

  summary?: string | null;
  pillars?: Pillar[] | null;
  facts?: Facts | null;

  content?: string | null;
  mvp_features?: string[] | null;
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

function derive(listing: ListingLike) {
  const cleanedContent = listing.content
    ? stripMarkdownTitleLine(listing.content, listing.name)
    : "";

  const summary =
    (listing.summary && listing.summary.trim()) ||
    (cleanedContent ? truncate(cleanedContent, 230) : "");

  const pillars: Pillar[] =
    listing.pillars && listing.pillars.length
      ? listing.pillars.slice(0, 3)
      : (listing.mvp_features || []).slice(0, 2).map((f, i) => ({
        title: i === 0 ? "Point fort" : "Ce que ça apporte",
        description: truncate(f, 90),
        icon: i === 0 ? "suite" : "bank",
      }));

  return { summary, pillars, facts: listing.facts || {} };
}

/* =======================
   Component
======================= */

export function ConceptOverview({ listing }: { listing: ListingLike }) {
  const { summary, pillars, facts } = derive(listing);

  if (!summary && pillars.length === 0 && !facts) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
          Technique
        </h2>

        {listing.url && (
          <Link
            href={listing.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Fiche technique
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Gauche */}
        <div className="lg:col-span-7">
          {summary && (
            <p className="text-base leading-relaxed text-slate-700">
              {summary}
            </p>
          )}

          {pillars.length > 0 && (
            <div className="mt-6 space-y-4">
              {pillars.map((p, i) => {
                const Icon = pickIcon(p.icon);
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {p.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {p.description}
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
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Fiche technique
            </div>

            <div className="space-y-3 text-sm">
              {facts.pricing && (
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Pricing</span>
                  <span className="text-slate-900">{facts.pricing}</span>
                </div>
              )}

              {facts.coverage && (
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Couverture</span>
                  <span className="text-slate-900">{facts.coverage}</span>
                </div>
              )}

              {facts.status && (
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Statut</span>
                  <span className="text-slate-900">{facts.status}</span>
                </div>
              )}
            </div>

            {facts.note && (
              <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
                {facts.note}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
