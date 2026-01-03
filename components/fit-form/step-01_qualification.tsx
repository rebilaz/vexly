"use client";

import React from "react";
import type { FormData } from "./types";
import { computeOffer } from "./logic";
import { StepShell, Field, UnderlineInput, RadioCard } from "./ui";

const BUDGETS: Array<{ value: FormData["budget"]; label: string }> = [
  { value: "<500", label: "Under €500" },
  { value: "500-1500", label: "€500 — €1.5k" },
  { value: "1500-5000", label: "€1.5k — €5k" },
  { value: "5000+", label: "€5k+" },
];

export default function Step01Qualification({
  data,
  update,
  onNext,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onNext: () => void;
}) {
  const offer = computeOffer(data);
  const blocked = offer === "EXIT_LOW_BUDGET" || offer === "EXIT_NOT_READY";

  const canContinue =
    data.fullName.trim().length >= 2 &&
    data.email.includes("@") &&
    data.companyOrProject.trim().length >= 2 &&
    !!data.budget;

  return (
    <StepShell
  title="Let's start with the basics."
  progress={20}
  next={{ ... }}
>

      <div className="grid gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Full name">
            <UnderlineInput
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </Field>

          <Field label="Professional email">
            <UnderlineInput
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="name@company.com"
              type="email"
            />
          </Field>
        </div>

        <Field label="SaaS project name">
          <UnderlineInput
            value={data.companyOrProject}
            onChange={(e) => update("companyOrProject", e.target.value)}
            placeholder="e.g. InvoiceFlow"
          />
        </Field>

        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
            Confirmed budget
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {BUDGETS.map((b) => (
              <RadioCard
                key={b.value}
                title={b.label}
                checked={data.budget === b.value}
                onClick={() => update("budget", b.value)}
              />
            ))}
          </div>

          {offer === "EXIT_LOW_BUDGET" && (
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              Projects under €500 are not accepted.
            </div>
          )}

          {offer === "EXIT_NOT_READY" && (
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              Too early (exploration). Come back with a clear core feature and user stories.
            </div>
          )}
        </div>
      </div>
    </StepShell>
  );
}
