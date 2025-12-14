// app/articles/page.tsx
import { getAllArticles } from "@/lib/articles";
import ArticlesIndex from "@/components/ressources/articles/ArticlesIndex";

export const revalidate = 1800;

export const metadata = {
  title: "Articles – Vexly",
  description: "Tous les articles SaaS, automatisation, IA et business.",
  alternates: { canonical: "https://www.vexly.fr/articles" },
};

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams?: { q?: string; c?: string };
}) {
  const articles = await getAllArticles();
  return <ArticlesIndex articles={articles} searchParams={searchParams} />;
}
