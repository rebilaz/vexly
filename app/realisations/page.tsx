import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  getAllRealisations,
  type RealisationListItem,
  type RealisationVisual as VisualVariant,
} from "@/sanity/lib/realisations";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Check,
  CreditCard,
  Gauge,
  Layers3,
  LockKeyhole,
  MessagesSquare,
  Rocket,
  Sparkles,
  UsersRound,
  WandSparkles,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos réalisations | Vexly",
  description:
    "Découvrez une sélection de plateformes d’abonnement, MVP SaaS, outils IA et automatisations réalisés par Vexly.",
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    title: "Nos réalisations | Vexly",
    description:
      "Des produits SaaS pensés pour transformer une audience en revenus récurrents.",
    type: "website",
    url: "/realisations",
  },
};

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Project = Partial<RealisationListItem> & {
  eyebrow: string;
  title: string;
  description: string;
  services: string[];
  href: string;
  cta: string;
  visual: VisualVariant;
  surfaceClass: string;
  glowClass: string;
};

const technologies = [
  "Next.js",
  "Stripe",
  "Supabase",
  "Sanity",
  "OpenAI",
  "Vercel",
  "Tailwind",
  "PostHog",
  "Resend",
  "n8n",
  "TypeScript",
  "Trigger.dev",
];

const projects: Project[] = [
  {
    eyebrow: "Plateforme d’abonnement",
    title: "Une expérience premium pour convertir une audience en abonnés",
    description:
      "Une plateforme sur mesure avec espace membre, contenus privés, gestion des droits et abonnements Stripe — pensée pour appartenir pleinement au créateur.",
    services: ["UX/UI", "Next.js", "Stripe", "Espace membre"],
    href: "/contact",
    cta: "Créer un projet similaire",
    visual: "membership",
    surfaceClass:
      "bg-[linear-gradient(135deg,#dbeafe_0%,#e0e7ff_48%,#c4b5fd_100%)]",
    glowClass: "bg-indigo-500/25",
  },
  {
    eyebrow: "MVP SaaS",
    title: "Un cockpit simple pour piloter les revenus récurrents",
    description:
      "Un dashboard qui centralise abonnements, MRR, rétention et activité utilisateur afin de prendre les bonnes décisions sans multiplier les outils.",
    services: ["Product design", "Dashboard", "Analytics", "Supabase"],
    href: "/contact",
    cta: "Lancer mon MVP",
    visual: "analytics",
    surfaceClass:
      "bg-[linear-gradient(135deg,#fef3c7_0%,#fed7aa_48%,#fdba74_100%)]",
    glowClass: "bg-orange-500/20",
  },
  {
    eyebrow: "SaaS avec IA",
    title: "Un assistant IA entraîné sur les contenus du créateur",
    description:
      "Recherche sémantique, réponses contextualisées et recommandations personnalisées : l’expertise existante devient un produit disponible à toute heure.",
    services: ["IA générative", "RAG", "OpenAI", "Base de connaissances"],
    href: "/contact",
    cta: "Ajouter l’IA à mon SaaS",
    visual: "ai",
    surfaceClass:
      "bg-[linear-gradient(135deg,#ede9fe_0%,#ddd6fe_45%,#fbcfe8_100%)]",
    glowClass: "bg-violet-500/25",
  },
  {
    eyebrow: "Communauté premium",
    title: "Un espace membre conçu pour l’engagement, pas seulement l’accès",
    description:
      "Onboarding, progression, contenus, commentaires et notifications réunis dans une interface claire qui donne envie de revenir.",
    services: ["Communauté", "Onboarding", "Notifications", "Responsive"],
    href: "/contact",
    cta: "Imaginer mon espace membre",
    visual: "community",
    surfaceClass:
      "bg-[linear-gradient(135deg,#cffafe_0%,#bfdbfe_50%,#a5b4fc_100%)]",
    glowClass: "bg-cyan-500/20",
  },
  {
    eyebrow: "Monétisation",
    title: "Un parcours d’achat fluide, de l’offre jusqu’au premier contenu",
    description:
      "Pages d’offres, paiement, webhooks, facturation et accès instantané : chaque étape est pensée pour rassurer et réduire la friction.",
    services: ["Conversion", "Stripe", "Webhooks", "Facturation"],
    href: "/contact",
    cta: "Optimiser ma monétisation",
    visual: "checkout",
    surfaceClass:
      "bg-[linear-gradient(135deg,#dcfce7_0%,#d9f99d_48%,#bef264_100%)]",
    glowClass: "bg-lime-500/20",
  },
  {
    eyebrow: "Automatisation",
    title: "Des opérations automatisées pour garder du temps pour la création",
    description:
      "Qualification, onboarding, relances, support et reporting sont reliés dans un workflow robuste, observable et facile à faire évoluer.",
    services: ["Automatisation", "n8n", "CRM", "Agents IA"],
    href: "/contact",
    cta: "Automatiser mes process",
    visual: "automation",
    surfaceClass:
      "bg-[linear-gradient(135deg,#fee2e2_0%,#fecdd3_48%,#f9a8d4_100%)]",
    glowClass: "bg-rose-500/20",
  },
];

const values: Value[] = [
  {
    icon: Rocket,
    title: "Pensé pour lancer",
    description:
      "Nous priorisons ce qui crée de la valeur dès la première version, sans construire une usine à gaz.",
  },
  {
    icon: Gauge,
    title: "Pensé pour convertir",
    description:
      "Les parcours, les messages et les interactions sont conçus pour amener naturellement à l’action.",
  },
  {
    icon: Layers3,
    title: "Pensé pour évoluer",
    description:
      "Une base technique propre permet d’ajouter de nouvelles fonctionnalités sans repartir de zéro.",
  },
];

function ArrowIcon() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
    />
  );
}

function LogoRail({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className={`vexly-logo-rail flex flex-col gap-4 ${
          reverse ? "vexly-logo-rail--reverse" : ""
        }`}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex h-28 shrink-0 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.055] px-5 text-center text-sm font-black tracking-[-0.02em] text-white/70 shadow-[0_20px_45px_rgba(0,0,0,0.12)] backdrop-blur-sm transition duration-300 hover:border-indigo-300/30 hover:bg-white/[0.09] hover:text-white"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[760px] overflow-hidden rounded-[1.65rem] border border-white/70 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.22)]">
      <div className="flex h-11 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
        <span className="size-2.5 rounded-full bg-rose-300" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <div className="ml-3 h-5 flex-1 rounded-full border border-slate-200 bg-white" />
      </div>
      {children}
    </div>
  );
}

function MembershipVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[390px] grid-cols-[92px_1fr] bg-slate-50 sm:grid-cols-[150px_1fr]">
        <aside className="border-r border-slate-200 bg-[#071a33] p-4">
          <div className="mb-8 flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500" />
            <div className="hidden h-2.5 w-12 rounded-full bg-white/70 sm:block" />
          </div>
          <div className="space-y-3">
            {[80, 58, 66, 48].map((width, index) => (
              <div
                key={width}
                className={`h-8 rounded-xl ${
                  index === 0 ? "bg-white/[0.12]" : "bg-white/[0.035]"
                } p-3`}
              >
                <div
                  className="h-2 rounded-full bg-white/[0.35]"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </aside>
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-3 w-24 rounded-full bg-slate-300" />
              <div className="mt-3 h-7 w-44 rounded-lg bg-slate-900" />
            </div>
            <div className="size-10 rounded-full bg-indigo-100" />
          </div>
          <div className="mt-7 overflow-hidden rounded-2xl bg-gradient-to-br from-[#071a33] via-indigo-950 to-violet-800 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-200">
              Programme premium
            </p>
            <div className="mt-3 h-6 w-4/5 rounded-lg bg-white/[0.85]" />
            <div className="mt-3 h-2.5 w-3/5 rounded-full bg-white/[0.35]" />
            <div className="mt-6 h-10 w-32 rounded-full bg-white" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="aspect-video rounded-xl bg-slate-100" />
                <div className="mt-3 h-3 w-4/5 rounded-full bg-slate-800" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function AnalyticsVisual() {
  const bars = [42, 64, 55, 82, 72, 96, 86, 100, 78, 92, 88, 110];

  return (
    <BrowserShell>
      <div className="min-h-[390px] bg-[#071a33] p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="h-3 w-24 rounded-full bg-white/25" />
            <div className="mt-3 h-7 w-48 rounded-lg bg-white/90" />
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-bold text-white/[0.65]">
            30 derniers jours
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["MRR", "24,8 K€"],
            ["Abonnés", "1 284"],
            ["Rétention", "92,4 %"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/[0.45]">
                {label}
              </p>
              <p className="mt-2 text-base font-black sm:text-xl">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="flex items-end justify-between gap-2">
            {bars.map((height, index) => (
              <div
                key={`${height}-${index}`}
                className="flex h-40 flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-300"
                  style={{ height: `${height}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 h-px bg-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-2 rounded-full bg-white/[0.15]" />
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 rounded-full bg-white/[0.15]" />
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function AiVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[390px] bg-slate-50 sm:grid-cols-[1fr_190px]">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <Bot className="size-5" aria-hidden="true" />
            </div>
            <div>
              <div className="h-3 w-28 rounded-full bg-slate-900" />
              <div className="mt-2 h-2 w-20 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="mt-7 space-y-4">
            <div className="ml-auto max-w-[82%] rounded-[1.4rem] rounded-br-md bg-indigo-600 p-4 text-white shadow-lg shadow-indigo-600/15">
              <div className="h-2.5 w-full rounded-full bg-white/[0.85]" />
              <div className="mt-2 h-2.5 w-3/4 rounded-full bg-white/[0.45]" />
            </div>
            <div className="max-w-[92%] rounded-[1.4rem] rounded-bl-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-violet-600">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Réponse basée sur vos contenus
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-slate-200" />
                <div className="h-2.5 w-[92%] rounded-full bg-slate-200" />
                <div className="h-2.5 w-[75%] rounded-full bg-slate-200" />
              </div>
              <div className="mt-5 flex gap-2">
                <div className="h-7 w-20 rounded-full bg-indigo-50" />
                <div className="h-7 w-24 rounded-full bg-violet-50" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <div className="h-3 flex-1 rounded-full bg-slate-100" />
            <div className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </div>
          </div>
        </div>
        <aside className="hidden border-l border-slate-200 bg-white p-5 sm:block">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            Sources
          </p>
          <div className="mt-5 space-y-3">
            {["Cours vidéo", "Newsletter", "PDF premium", "FAQ privée"].map(
              (source, index) => (
                <div
                  key={source}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-7 rounded-lg ${
                        index % 2 === 0 ? "bg-indigo-100" : "bg-violet-100"
                      }`}
                    />
                    <div>
                      <div className="h-2 w-16 rounded-full bg-slate-700" />
                      <div className="mt-2 h-1.5 w-10 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </aside>
      </div>
    </BrowserShell>
  );
}

function CommunityVisual() {
  return (
    <BrowserShell>
      <div className="min-h-[390px] bg-slate-50 p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
          <div className="rounded-2xl bg-[#071a33] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 w-20 rounded-full bg-white/[0.35]" />
                <div className="mt-3 h-6 w-44 rounded-lg bg-white/90" />
              </div>
              <UsersRound className="size-6 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2">
              {[76, 48, 92].map((progress) => (
                <div
                  key={progress}
                  className="rounded-xl border border-white/10 bg-white/[0.055] p-3"
                >
                  <div className="size-8 rounded-full bg-indigo-400/20" />
                  <div className="mt-3 h-2 w-full rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-indigo-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              Progression
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative flex size-16 items-center justify-center rounded-full bg-[conic-gradient(#6366f1_0_78%,#e2e8f0_78%_100%)]">
                <div className="flex size-12 items-center justify-center rounded-full bg-white text-xs font-black text-slate-950">
                  78%
                </div>
              </div>
              <div className="flex-1">
                <div className="h-2.5 w-full rounded-full bg-slate-800" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            [MessagesSquare, "Discussions"],
            [Check, "Missions"],
            [LockKeyhole, "Contenus"],
          ].map(([Icon, label]) => {
            const ItemIcon = Icon as LucideIcon;
            return (
              <div
                key={label as string}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <ItemIcon className="size-4" aria-hidden="true" />
                </div>
                <div className="mt-4 h-3 w-3/4 rounded-full bg-slate-800" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
              </div>
            );
          })}
        </div>
      </div>
    </BrowserShell>
  );
}

function CheckoutVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[390px] bg-slate-50 md:grid-cols-[1fr_260px]">
        <div className="p-5 sm:p-7">
          <div className="h-3 w-20 rounded-full bg-indigo-500" />
          <div className="mt-4 h-8 w-3/4 rounded-lg bg-slate-950" />
          <div className="mt-3 h-2.5 w-1/2 rounded-full bg-slate-200" />
          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ["Mensuel", "29 €"],
              ["Annuel", "290 €"],
            ].map(([plan, price], index) => (
              <div
                key={plan}
                className={`rounded-2xl border p-4 ${
                  index === 1
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-xs font-bold text-slate-500">{plan}</p>
                <p className="mt-2 text-xl font-black text-slate-950">{price}</p>
                <div className="mt-4 space-y-2">
                  {[72, 88, 56].map((width) => (
                    <div
                      key={width}
                      className="h-2 rounded-full bg-slate-200"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="size-5 text-indigo-600" aria-hidden="true" />
              <div className="h-3 w-28 rounded-full bg-slate-800" />
            </div>
            <div className="mt-4 grid grid-cols-[1fr_80px] gap-3">
              <div className="h-10 rounded-xl bg-slate-100" />
              <div className="h-10 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
        <aside className="border-t border-slate-200 bg-white p-5 md:border-l md:border-t-0 sm:p-7">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            Votre commande
          </p>
          <div className="mt-5 rounded-2xl bg-[#071a33] p-4 text-white">
            <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500" />
            <div className="mt-4 h-3 w-4/5 rounded-full bg-white/90" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/30" />
          </div>
          <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-xs font-bold text-slate-500">
            <div className="flex justify-between">
              <span>Abonnement annuel</span>
              <span>290 €</span>
            </div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span>Incluse</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between text-sm font-black text-slate-950">
            <span>Total</span>
            <span>290 €</span>
          </div>
          <div className="mt-5 h-11 rounded-full bg-indigo-600" />
        </aside>
      </div>
    </BrowserShell>
  );
}

function AutomationVisual() {
  const steps = [
    { icon: UsersRound, label: "Nouveau lead", tone: "bg-indigo-100 text-indigo-700" },
    { icon: Workflow, label: "Qualification", tone: "bg-violet-100 text-violet-700" },
    { icon: Bot, label: "Agent IA", tone: "bg-fuchsia-100 text-fuchsia-700" },
    {
      icon: ChartNoAxesCombined,
      label: "CRM mis à jour",
      tone: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <BrowserShell>
      <div className="min-h-[390px] bg-[#071a33] p-5 sm:p-7">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="h-3 w-24 rounded-full bg-white/25" />
            <div className="mt-3 h-7 w-52 rounded-lg bg-white/90" />
          </div>
          <Workflow className="size-6 text-indigo-300" aria-hidden="true" />
        </div>
        <div className="relative mt-8">
          <div className="absolute left-[27px] top-10 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-indigo-400 via-violet-400 to-emerald-400 sm:left-1/2 sm:top-[28px] sm:h-px sm:w-[calc(100%-5rem)] sm:-translate-x-1/2" />
          <div className="relative grid gap-4 sm:grid-cols-4">
            {steps.map(({ icon: Icon, label, tone }, index) => (
              <div
                key={label}
                className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur sm:flex-col sm:text-center"
              >
                <div
                  className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-white">{label}</p>
                  <p className="mt-1 text-[10px] text-white/40">
                    Étape {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_180px]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-indigo-200/60">
              Dernières exécutions
            </p>
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.045] p-3"
                >
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <div className="h-2 flex-1 rounded-full bg-white/[0.15]" />
                  <div className="h-2 w-12 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-indigo-300/20 bg-indigo-500/10 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-indigo-200/70">
              Temps économisé
            </p>
            <p className="mt-4 text-3xl font-black text-white">18 h</p>
            <p className="mt-2 text-xs leading-5 text-white/[0.45]">cette semaine</p>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function ProjectVisual({ variant }: { variant: VisualVariant }) {
  switch (variant) {
    case "membership":
      return <MembershipVisual />;
    case "analytics":
      return <AnalyticsVisual />;
    case "ai":
      return <AiVisual />;
    case "community":
      return <CommunityVisual />;
    case "checkout":
      return <CheckoutVisual />;
    case "automation":
      return <AutomationVisual />;
    default:
      return null;
  }
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-[2rem] border border-slate-200/60 ${project.surfaceClass} shadow-[0_28px_90px_rgba(15,23,42,0.10)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_36px_110px_rgba(15,23,42,0.16)] sm:rounded-[2.75rem]`}
    >
      <div
        className={`pointer-events-none absolute -top-24 size-80 rounded-full blur-3xl ${project.glowClass} ${
          reversed ? "-left-20" : "-right-20"
        }`}
      />
      <div className="relative grid min-h-[610px] lg:grid-cols-[1.18fr_0.82fr]">
        <div
          className={`flex items-center justify-center overflow-hidden p-5 sm:p-8 lg:p-10 ${
            reversed ? "lg:order-2" : ""
          }`}
        >
          <div className="w-full transition duration-500 group-hover:scale-[1.015]">
            <ProjectVisual variant={project.visual} />
          </div>
        </div>

        <div
          className={`flex flex-col justify-between bg-white/[0.78] p-7 backdrop-blur-xl sm:p-10 lg:p-12 xl:p-14 ${
            reversed ? "lg:order-1" : ""
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-indigo-600 shadow-sm">
              <WandSparkles className="size-3.5" aria-hidden="true" />
              {project.eyebrow}
            </div>

            <h2 className="mt-7 text-3xl font-black leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[2.65rem]">
              {project.title}
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {project.description}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Expertises">
              {project.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-slate-200 bg-white/75 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={project.href}
            className="group/link mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#071a33] px-5 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(7,26,51,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-[0_18px_45px_rgba(79,70,229,0.28)]"
          >
            {project.cta}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

function toDisplayProject(project: RealisationListItem): Project {
  return {
    ...project,
    eyebrow: project.eyebrow || project.category || "Realisation Vexly",
    description:
      project.description ||
      project.summary ||
      "Un produit digital concu pour clarifier l'offre, fluidifier l'experience utilisateur et soutenir la croissance.",
    services:
      project.services?.length
        ? project.services
        : project.tags?.length
          ? project.tags
          : project.technologies?.slice(0, 4) || [],
    cta: project.cta || "Decouvrir le projet",
  };
}

export default async function RealisationsPage() {
  const cmsProjects = await getAllRealisations();
  const displayedProjects = cmsProjects.length
    ? cmsProjects.map(toDisplayProject)
    : projects;

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-slate-950">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes vexlyRailUp {
              from { transform: translate3d(0, 0, 0); }
              to { transform: translate3d(0, -33.333333%, 0); }
            }

            @keyframes vexlyRailDown {
              from { transform: translate3d(0, -33.333333%, 0); }
              to { transform: translate3d(0, 0, 0); }
            }

            .vexly-logo-rail {
              animation: vexlyRailUp 24s linear infinite;
              will-change: transform;
            }

            .vexly-logo-rail--reverse {
              animation-name: vexlyRailDown;
              animation-duration: 28s;
            }

            @media (prefers-reduced-motion: reduce) {
              .vexly-logo-rail,
              .vexly-logo-rail--reverse {
                animation: none;
              }
            }
          `,
        }}
      />

      <section className="relative isolate min-h-[760px] overflow-hidden bg-[linear-gradient(135deg,#061A33_0%,#0B1F3A_48%,#171B4B_100%)] text-white">
        <div className="pointer-events-none absolute left-1/2 top-[-15rem] size-[34rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-36 size-[34rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-[28rem] rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute right-8 top-24 hidden h-40 w-40 bg-[radial-gradient(circle,_rgba(199,210,254,0.48)_1px,_transparent_1px)] [background-size:18px_18px] opacity-20 lg:block" />

        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-6 pb-20 pt-24 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:gap-20 lg:px-10 lg:pb-0 lg:pt-0">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-200 backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Nos réalisations
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.7rem]">
              Des produits qui transforment une audience en{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                business récurrent.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Plateformes d’abonnement, MVP SaaS, espaces membres, outils IA et
              automatisations : découvrez le type d’expériences que Vexly
              conçoit pour les créateurs et les business digitaux.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.40)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_22px_55px_rgba(88,80,236,0.50)] active:scale-[0.97]"
              >
                Parlez-nous de votre projet
                <ArrowIcon />
              </Link>

              <a
                href="#projets"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.055] px-7 py-4 text-sm font-black text-white backdrop-blur transition duration-300 hover:border-indigo-300/[0.35] hover:bg-white/[0.09]"
              >
                Voir les projets
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/50 lg:hidden">
              {technologies.slice(0, 8).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="hidden h-[760px] grid-cols-3 gap-4 overflow-hidden lg:grid">
            <LogoRail items={technologies.slice(0, 4)} />
            <LogoRail items={technologies.slice(4, 8)} reverse />
            <LogoRail items={technologies.slice(8, 12)} />
          </div>
        </div>
      </section>

      <section
        id="projets"
        className="relative isolate px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-40 top-16 size-[32rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-40 size-[34rem] rounded-full border border-indigo-100" />

        <div className="relative mx-auto max-w-[1380px]">
          <div className="mb-14 max-w-3xl sm:mb-20">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
              Sélection de projets
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              Du concept au produit utilisé.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Chaque projet combine stratégie produit, design, développement et
              mise en ligne pour créer une expérience claire, robuste et prête
              à évoluer.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project._id || `${project.eyebrow}-${project.title}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#061A33_0%,#0B1F3A_58%,#061A33_100%)] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-indigo-500/[0.15] blur-3xl" />
        <div className="pointer-events-none absolute -right-36 -top-40 size-[32rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-40 size-[36rem] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">
              La méthode Vexly
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Un beau produit ne suffit pas. Il doit vendre, fonctionner et
              durer.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 sm:mt-20">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-300/25 hover:bg-white/[0.07] sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/20 to-violet-400/20 text-indigo-200 ring-1 ring-white/10">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-2xl font-black tracking-[-0.035em] text-white">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#EEF3FC] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-36 -top-36 size-[32rem] rounded-full bg-indigo-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 size-[34rem] rounded-full border border-indigo-200/70" />

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#071a33] px-7 py-12 text-white shadow-[0_35px_100px_rgba(15,23,42,0.22)] sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-64 rounded-full bg-violet-500/[0.15] blur-3xl" />
          <div className="pointer-events-none absolute right-12 top-10 hidden h-28 w-28 bg-[radial-gradient(circle,_rgba(199,210,254,0.42)_1px,_transparent_1px)] [background-size:16px_16px] opacity-25 md:block" />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">
                Votre projet peut être le prochain
              </p>
              <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Transformons votre idée en un SaaS que votre audience voudra
                utiliser.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Expliquez-nous votre audience, votre offre et l’expérience que
                vous voulez créer. Nous vous aiderons à cadrer la meilleure
                première version.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#071a33] shadow-[0_18px_45px_rgba(0,0,0,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Démarrer mon projet
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
