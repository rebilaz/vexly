"use client";

import React from "react";
import type { FormData } from "./types";
import { StepShell, Field, UnderlineInput, MinimalTextarea } from "./ui";

export default function Step04MvpScope({
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
  const canContinue =
    data.problem.trim().length >= 20 &&
    data.userStories.trim().length >= 30 &&
    data.integrations.trim().length >= 3;

  return (
    <StepShell
      stepLabel="Step 4 of 5"
      title="Scope the build."
      subtitle="Provide the blueprint for your application."
      back={{ onClick: onBack }}
      next={{ onClick: onNext, disabled: !canContinue }}
    >
      <Field label="Core feature (one sentence)">
        <UnderlineInput
          value={data.problem}
          onChange={(e) => update("problem", e.target.value)}
          placeholder="e.g. Users upload a PDF and receive a structured summary."
        />
      </Field>

      <Field label="User flow description">
        <MinimalTextarea
          value={data.userStories}
          onChange={(e) => update("userStories", e.target.value)}
          placeholder="As a user, I click..., then..., then..."
          className="min-h-[120px]"
        />
      </Field>

      <Field
        label="Visual reference"
        hint="Figma link or Drive link (mockups, diagram, even hand-drawn)."
      >
        <UnderlineInput
          value={data.designLink || ""}
          onChange={(e) => update("designLink", e.target.value)}
          placeholder="https://figma.com/... or https://drive.google.com/..."
        />
      </Field>

      <Field
        label="Integrations (APIs / tools)"
        hint='If unsure, write: "Not sure yet" + mention payment / email / AI / maps.'
      >
        <MinimalTextarea
          value={data.integrations}
          onChange={(e) => update("integrations", e.target.value)}
          placeholder="Stripe, Resend, Google OAuth, OpenAI..."
          className="min-h-[100px]"
        />
      </Field>
    </StepShell>
  );
}
