"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Target,
  CreditCard,
  Settings,
  MonitorSmartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

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

export default function FeaturesSection() {
  const items: Item[] = [
    { icon: "Rocket", label: "MVP vendable" },
    { icon: "Target", label: "Positionnement clair" },
    { icon: "CreditCard", label: "Paiements intégrés" },
    { icon: "Settings", label: "Back-office administrateur" },
    { icon: "MonitorSmartphone", label: "Interface Web & Mobile" },
    { icon: "Server", label: "Déploiement scalable" },
  ];

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
        INCLUS
      </h2>

      {/* GRID */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
