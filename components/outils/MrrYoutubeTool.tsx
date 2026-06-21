"use client";

import { useMemo, useState } from "react";

import type { ToolCalculatorConfig } from "@/sanity/lib/outils";

type MrrYoutubeToolProps = {
  config: ToolCalculatorConfig;
};

export function MrrYoutubeTool({
  config,
}: MrrYoutubeToolProps) {
  const monthlyPrice = config.monthlyPrice ?? 49;
  const conversionRate = config.conversionRate ?? 0.2;

  const minValue = config.minValue ?? 1000;
  const maxValue = config.maxValue ?? 1_000_000;
  const step = config.step ?? 1000;
  const defaultValue = config.defaultValue ?? 50_000;

  const [views, setViews] = useState(defaultValue);

  const clients = useMemo(() => {
    return Math.round(
      views * (conversionRate / 100),
    );
  }, [views, conversionRate]);

  const mrr = clients * monthlyPrice;

  return (
    <div className="rounded-[2.5rem] bg-[#061A33] p-6">
      <div className="rounded-[2rem] bg-white p-8">
        <p className="text-xs font-black uppercase text-indigo-600">
          {config.eyebrow ?? "Simulation"}
        </p>

        <h2 className="mt-2 text-3xl font-black">
          {config.title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ResultCard
            label={
              config.inputResultLabel ??
              "Vues YouTube"
            }
            value={formatNumber(views)}
          />

          <ResultCard
            label={
              config.clientsResultLabel ??
              "Clients estimés"
            }
            value={formatNumber(clients)}
          />

          <ResultCard
            label={
              config.revenueResultLabel ??
              "MRR estimé"
            }
            value={formatCurrency(mrr)}
          />
        </div>

        <div className="mt-8 rounded-3xl bg-slate-100 p-6">
          <div className="flex justify-between gap-4">
            <label
              htmlFor="youtube-views"
              className="font-black"
            >
              {config.inputLabel ??
                "Nombre de vues mensuelles"}
            </label>

            <span className="font-bold text-slate-500">
              {formatNumber(views)}
            </span>
          </div>

          <input
            id="youtube-views"
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={views}
            onChange={(event) => {
              setViews(Number(event.target.value));
            }}
            className="mt-5 w-full accent-indigo-600"
          />

          {config.quickValues?.length ? (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {config.quickValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setViews(value)}
                  className="rounded-full border bg-white px-4 py-2 text-sm font-bold"
                >
                  {formatNumber(value)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-100 p-5 text-center">
      <p className="text-xs font-black uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-4 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}