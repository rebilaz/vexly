"use client";

import { useEffect, useRef, useState } from "react";

const SLUG = "calculateur-roi";

export default function CalculateurRoiEmbedPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [gain, setGain] = useState(1000);
  const [cout, setCout] = useState(300);

  const roi = cout > 0 ? ((gain - cout) / cout) * 100 : 0;

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const sendHeight = () => {
      const rect = element.getBoundingClientRect();

      window.parent.postMessage(
        {
          type: "vexly-embed-height",
          slug: SLUG,
          height: rect.height,
        },
        window.location.origin
      );
    };

    sendHeight();

    const observer = new ResizeObserver(sendHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="w-full bg-transparent">
      <div className="w-full space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Calculateur ROI
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Estime rapidement le retour sur investissement d’une action.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Gain généré
          </label>
          <input
            type="number"
            value={gain}
            onChange={(event) => setGain(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Coût investi
          </label>
          <input
            type="number"
            value={cout}
            onChange={(event) => setCout(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">ROI estimé</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {roi.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}