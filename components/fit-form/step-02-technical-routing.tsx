"use client";

import React from "react";
import type { FormData } from "./types";
import { StepShell, RadioCard } from "./ui";

export default function Step02TechnicalRouting({
  data,
  update,
  onBack,
  onNext,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const canContinue = data.needCustom === "YES" || data.needCustom === "NO";

  return (
    <StepShell
      stepLabel="Step 2 of 5"
      title="Define the engine."
      subtitle="What level of technical complexity does your SaaS require?"
      back={{ onClick: onBack }}
      next={{ onClick: onNext, disabled: !canContinue }}
    >
      <div className="grid gap-3">
        <RadioCard
          title="Standard Core"
          description="Auth, database, dashboard, subscriptions, emails. Fast launch."
          checked={data.needCustom === "NO"}
          onClick={() => update("needCustom", "NO")}
        />

        <RadioCard
          title="Custom Architecture"
          description="AI, scraping, marketplace, complex calculations, real-time, custom data model."
          checked={data.needCustom === "YES"}
          onClick={() => update("needCustom", "YES")}
        />
      </div>
    </StepShell>
  );
}
