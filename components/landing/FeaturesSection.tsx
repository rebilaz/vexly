//components\landing\FeaturesSection.tsx

import {
  Rocket,
  Target,
  CreditCard,
  Settings,
  MonitorSmartphone,
  Server,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal.client";

const ICONS = {
  Rocket,
  Target,
  CreditCard,
  Settings,
  MonitorSmartphone,
  Server,
} satisfies Record<string, LucideIcon>;

type Item = {
  icon: keyof typeof ICONS;
  label: string;
};

type FeatureSectionProps = {
  title: String;
  description?: string;
  items: readonly Item[];
}

export default function FeaturesSection({
  title,
  description,
  items,
}: FeatureSectionProps) {
  return (
    <section className="mx-auto max-w-6xl">
      {/* TITRE CENTRÉ DÉGRADÉ */}
      <h2
        className="
          text-center
          font-geist
          text-5xl
          sm:text-6xl
          lg:text-7xl
          font-bold
          tracking-tight
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-indigo-600
          bg-clip-text
          text-transparent
        "
      >
        {title}
      </h2>

      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600">
          {description}
        </p>
      ) : null}

      {/* GRID */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.label}>
              <div
                className="
                  flex
                  items-center
                  gap-5
                  rounded-3xl
                  border-2
                  border-slate-200
                  bg-white
                  px-7
                  py-8
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                  <Icon className="size-6" />
                </div>

                <p className="font-geist text-lg font-semibold text-slate-900">
                  {item.label}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
