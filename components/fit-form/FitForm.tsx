"use client";

import React, { useMemo, useState } from "react";
import { DEFAULT_DATA, type FormData } from "./types";
import { computeOffer } from "./logic";

import Step01 from "./step-01_qualification";
import Step02 from "./step-02-technical-routing";
import Step03 from "./step-03-design-routing";
import Step04 from "./step-04-mvp-scope";
import Step05 from "./step-05_outcome";

import AnalysisPanel from "./AnalysisPanel";

type Step = 1 | 2 | 3 | 4 | 5;

export default function FitForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(DEFAULT_DATA);
  const offer = useMemo(() => computeOffer(data), [data]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function go(s: Step) {
    setStep(s);
  }

  function nextWithSkips() {
    if (step === 2) {
      if (data.needCustom === "YES") return go(4);
      return go(3);
    }
    if (step === 3) return go(5);
    if (step === 4) return go(5);
    if (step === 1) return go(2);
    return go(5);
  }

  const showPanelLater = step >= 4; // <-- Tu peux mettre >=5 si tu veux encore plus tard

  return (
    <div className={showPanelLater ? "grid gap-8 lg:grid-cols-[1fr_360px]" : ""}>
      {/* LEFT */}
      <div>
        {step === 1 && (
          <Step01
            data={data}
            update={update}
            onNext={() => {
              const o = computeOffer(data);
              if (o === "EXIT_LOW_BUDGET" || o === "EXIT_NOT_READY") return go(5);
              return go(2);
            }}
          />
        )}

        {step === 2 && (
          <Step02 data={data} update={update} onBack={() => go(1)} onNext={nextWithSkips} />
        )}

        {step === 3 && (
          <Step03 data={data} update={update} onBack={() => go(2)} onNext={nextWithSkips} />
        )}

        {step === 4 && (
          <Step04 data={data} update={update} onBack={() => go(2)} onNext={nextWithSkips} />
        )}

        {step === 5 && <Step05 data={data} />}
      </div>

      {/* RIGHT — affiché plus tard */}
      {showPanelLater ? (
        <div className="hidden lg:block">
          <AnalysisPanel data={data} offer={offer} step={step} />
        </div>
      ) : null}
    </div>
  );
}
