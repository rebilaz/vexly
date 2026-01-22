import type { Metadata } from "next";
import ParcoursClient from "@/components/ressources/parcours/ParcoursClient";

export const metadata: Metadata = {
  title: "Parcours – Vexly",
  description:
    "Parcours guidés pour YouTubeurs : sortir de l’instabilité des revenus, réduire la dépendance aux sponsors, construire un plan B et un revenu récurrent.",
  alternates: { canonical: "/parcours" },
};

export default function ParcoursPage() {
  return <ParcoursClient />;
}
