// app/page.tsx
import type { Metadata } from "next";
import LandingLayout from "@/components/landing/LandingLayout";

export const metadata: Metadata = {
  title: "Vexly – Création de SaaS sur mesure",
  description:
    "Je transforme ton idée en SaaS sur mesure avec une logique business claire dès le départ. Tu repars avec un MVP crédible, déployé, et prêt à acquérir tes premiers clients.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <main>
     <LandingLayout
        finalTitle="Tu veux savoir si ton idée est rentable sur le papier ?"
        finalSubtitle="On échange 30 minutes. Tu repars avec un plan clair."
        primaryCtaLabel="Parler de ton projet"
      />
    </main>
  );
}
