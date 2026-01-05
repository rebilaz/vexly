// components/cta/ProjectCTA.tsx
import React from "react";

export default function ProjectCTA({
  kicker = "Crée ton",
  title = "SaaS",
  subtitle = "De l’idée au produit prêt à vendre",
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold tracking-tight text-slate-500">
        {kicker}
      </div>

      <div className="mt-2 font-geist text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
        {title}
      </div>

      {subtitle ? (
        <div className="mt-3 text-sm font-medium text-slate-500 sm:text-base">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
