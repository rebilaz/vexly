"use client";

import React from "react";
import type { FormData } from "./types";
import { StepShell, RadioCard } from "./ui";

export default function Step03DesignRouting({
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
  // Cette étape est utile surtout pour standard (needCustom = NO)
  const canContinue = data.needCustom === "YES" || data.brandingNeeded === "YES" || data.brandingNeeded === "NO";

  return (
    <StepShell
      stepLabel="Step 3 of 5"
      title="Visuals & experience."
      subtitle="How will the interface be handled?"
      back={{ onClick: onBack }}
      next={{ onClick: onNext, disabled: !canContinue }}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <RadioCard
          title="Autonomous"
          description="You provide assets. We focus on execution."
          checked={data.brandingNeeded === "NO"}
          onClick={() => update("brandingNeeded", "NO")}
        />

        <RadioCard
          title="Done-for-you"
          description="We integrate branding and content for a polished launch."
          checked={data.brandingNeeded === "YES"}
          onClick={() => update("brandingNeeded", "YES")}
        />
      </div>
    </StepShell>
  );
}
