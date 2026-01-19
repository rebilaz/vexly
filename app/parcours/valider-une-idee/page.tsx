import HubShell from "@/components/ressources/parcours/hub/HubShell";
import HubHero from "@/components/ressources/parcours/hub/HubHero";
import EntryCards, { Entry } from "@/components/ressources/parcours/hub/EntryCards";
import MacroMap, { MacroZone } from "@/components/ressources/parcours/hub/MacroMap";
import DirectLinks, { DirectLink } from "@/components/ressources/parcours/hub/DirectLinks";

/* =========================
   POINTS D’ENTRÉE (YouTubeurs)
   ========================= */

const ENTRIES: Entry[] = [
  {
    title: "Mes revenus YouTube sont instables",
    description:
      "AdSense et sponsors font le yo-yo. Je veux comprendre pourquoi et ce que je peux changer.",
    href: "/parcours/revenus-instables-createur-diagnostic",
    tone: "indigo",
    icon: "compass",
  },
  {
    title: "Je veux un revenu mensuel en plus de YouTube",
    description:
      "Abonnement, communauté ou outil : je cherche une base stable, pas seulement des pics.",
    href: "/parcours/abonnement-revenu-recurrent-avantages",
    tone: "emerald",
    icon: "sparkles",
  },
  {
    title: "Je dépends trop des sponsors",
    description:
      "Je veux mesurer le risque réel et décider si je dois construire un plan B maintenant.",
    href: "/parcours/monetisation-sponsors-dependance",
    tone: "amber",
    icon: "shield",
  },
];

/* =========================
   CARTE DU PARCOURS (macro)
   ========================= */

const ZONES: MacroZone[] = [
  {
    title: "Dépendance à YouTube et aux annonceurs",
    description:
      "Comprendre pourquoi les revenus publicitaires et sponsoring sont instables par nature.",
    bullets: [
      "algorithmes hors de ton contrôle",
      "CPM variables selon les périodes",
      "annonceurs qui peuvent disparaître",
    ],
    icon: "target",
  },
  {
    title: "Plan B pour YouTubeur",
    description:
      "Identifier des revenus qui ne dépendent pas directement de YouTube.",
    bullets: [
      "produits one-shot (formation, ebook)",
      "services liés à l’audience",
      "première reprise de contrôle",
    ],
    icon: "layers",
  },
  {
    title: "Revenu récurrent (MRR)",
    description:
      "Transformer une partie de ton audience YouTube en base mensuelle stable.",
    bullets: [
      "abonnement",
      "communauté payante",
      "outil ou service utile",
    ],
    icon: "zap",
  },
  {
    title: "Choix techniques pour créateurs",
    description:
      "Plateformes existantes, no-code ou développement sur mesure : décider sans se piéger.",
    bullets: [
      "lancer vite ≠ tenir longtemps",
      "dette technique",
      "qualité d’expérience pour l’audience",
    ],
    icon: "compass",
  },
];

/* =========================
   ACCÈS DIRECT (SEO / libre)
   ========================= */

const LINKS: DirectLink[] = [
  {
    title: "Revenus YouTube instables : faites le diagnostic de votre modèle",
    href: "/parcours/revenus-instables-createur-diagnostic",
    label: "Diagnostic",
  },
  {
    title: "« Louer » son audience : limites des pubs et sponsors",
    href: "/parcours/monetisation-sponsors-dependance",
    label: "Dépendance",
  },
  {
    title: "Revenus pub et sponsors : un modèle risqué sans plan B",
    href: "/parcours/risque-revenus-sponsors-plan-b",
    label: "Risque",
  },
  {
    title: "Ventes uniques : des pics de revenus… sans stabilité",
    href: "/parcours/ventes-pas-recurring-instabilite",
    label: "Constat",
  },
  {
    title: "Abonnement : construire un revenu mensuel récurrent",
    href: "/parcours/abonnement-revenu-recurrent-avantages",
    label: "Stabilité",
  },
  {
    title: "Créer un outil ou SaaS pour son audience YouTube : choix techniques",
    href: "/parcours/outil-saas-createur-choix-tech",
    label: "Décision tech",
  },
];

/* =========================
   PAGE
   ========================= */

export default function Page() {
  return (
    <HubShell>
      <HubHero
        title="YouTubeur : sortir de l’instabilité des revenus"
        subtitle="Ce parcours s’adresse aux YouTubeurs qui gagnent déjà de l’argent avec AdSense et les sponsors, mais qui subissent des revenus irréguliers. Il t’aide à comprendre la dépendance à YouTube, à construire un plan B, puis à décider si un revenu récurrent (abonnement, communauté, outil) est pertinent pour toi."
        backHref="/parcours"
        backLabel="Tous les parcours"
      />

      <EntryCards entries={ENTRIES} />

      <MacroMap zones={ZONES} />

      <DirectLinks links={LINKS} />
    </HubShell>
  );
}
