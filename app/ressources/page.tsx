import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import RessourcesClient from "@/components/ressources/RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources – Vexly",
  description: "Articles et parcours guidés pour construire et monétiser ton projet SaaS.",
  alternates: { canonical: "/ressources" },
};

function toTs(a: { frontmatter: any }) {
  const fm = a.frontmatter ?? {};
  const raw = (fm.date && String(fm.date).trim()) || (fm.updated_at && String(fm.updated_at).trim()) || "";
  const t = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

export default async function RessourcesPage() {
  const articles = await getAllArticles();

  // ✅ Derniers articles (date > updated_at > 0)
  const latest = [...articles]
    .sort((a, b) => toTs(b) - toTs(a))
    .slice(0, 6);

  return <RessourcesClient latestArticles={latest} />;
}
