"use client";

import React from "react";
import type { FormData, Offer } from "./types";
import { computeOffer, labelForOffer, stripeLinkFor } from "./logic";
import { StepShell } from "./ui";

export default function Step05Outcome({ data }: { data: FormData }) {
  const offer: Offer = computeOffer(data);

  if (offer === "EXIT_LOW_BUDGET") {
    return (
      <StepShell stepLabel="Step 5 of 5" title="Outcome." subtitle="Next steps based on your answers.">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-sm font-medium text-neutral-900">Not a fit (budget)</p>
          <p className="mt-2 text-sm text-neutral-700">
            Under €500, we can’t deliver cleanly without risk.
          </p>
        </div>
      </StepShell>
    );
  }

  if (offer === "EXIT_NOT_READY") {
    return (
      <StepShell stepLabel="Step 5 of 5" title="Outcome." subtitle="Next steps based on your answers.">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-sm font-medium text-neutral-900">Too early (exploration)</p>
          <p className="mt-2 text-sm text-neutral-700">
            Come back with a clear core feature and user flow.
          </p>
        </div>
      </StepShell>
    );
  }

  const link = stripeLinkFor(offer);

  return (
    <StepShell stepLabel="Step 5 of 5" title="Outcome." subtitle="Next steps based on your answers.">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
          Recommended
        </div>
        <div className="mt-2 text-lg font-semibold text-neutral-900">{labelForOffer(offer)}</div>
        <p className="mt-2 text-sm text-neutral-600">
          We’ll proceed based on your inputs. If it fits the frame, you can start immediately.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={link}
            className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Pay & start
          </a>

          <a
            href={`mailto:${encodeURIComponent(
              data.email
            )}?subject=${encodeURIComponent("Fit form — extra detail")}&body=${encodeURIComponent(
              "Add any important detail here."
            )}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Add detail by email
          </a>
        </div>
      </div>
    </StepShell>
  );
}
