// app/page.tsx
import type { Metadata } from "next";
import LandingLayout, { LandingSection } from "@/components/landing/LandingLayout";

export const metadata: Metadata = {
  title: "Vexly – Création de SaaS sur mesure (pensés pour être rentables)",
  description:
    "Je transforme ton idée en SaaS sur mesure avec une logique business claire dès le départ. Tu repars avec un MVP crédible, déployé, et prêt à acquérir tes premiers clients.",
  alternates: { canonical: "/" },
};

const sections: LandingSection[] = [
  {
    id: "for-who",
    title: "Pour qui c’est fait (et pour qui ça ne l’est pas)",
    text: `✅ Si tu as déjà un problème clair + une cible claire (freelances, PME, créateurs, ecom…)
✅ Si tu veux un produit simple, vendable, et itératif

❌ Si tu veux “un SaaS comme X” sans angle / distribution
❌ Si tu cherches une promesse de revenus rapides`,
    bullets: [
      "On part d’un cas d’usage concret, pas d’un pitch vague",
      "On vise un MVP vendable (pas une démo)",
      "On priorise ce qui déclenche l’achat",
    ],
  },
  {
    id: "systems",
    title: "Un SaaS = un actif (pas juste du code)",
    text: `L’objectif : construire une machine simple qui peut générer du revenu. Pas un projet “tech” qui reste dans un tiroir.`,
    bullets: [
      "Positionnement + proposition de valeur (simple et claire)",
      "Fonctionnalités minimales qui déclenchent le paiement",
      "Base solide pour itérer ensuite (sans repartir de zéro)",
    ],
  },
  {
    id: "process",
    title: "Un process simple, orienté business",
    text: `Tu gardes le contrôle. Je t’aide à cadrer, construire et livrer un produit crédible — avec une logique de revenus cohérente.`,
    bullets: [
      "On valide la logique business AVANT de développer",
      "Tu valides chaque étape (maquette → scope → build)",
      "Livré + déployé + prêt à être vendu",
    ],
  },
];

export default function LandingPage() {
  return (
<LandingLayout
  sections={sections}
  finalTitle="Tu veux savoir si ton idée est rentable sur le papier ?"
  finalSubtitle="On échange 30 minutes. Tu repars avec un plan clair."
  primaryCtaLabel="Parler de ton projet"
/>

  );
}
