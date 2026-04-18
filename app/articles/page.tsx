// app/articles/page.tsx
import { getAllArticles } from "@/lib/articles";
import ArticlesIndexClient from "@/components/ressources/articles/ArticlesLayout";

export const revalidate = 1800;

export const metadata = {
  title: "Articles – Vexly",
  description: "Tous les articles SaaS, automatisation, IA et business.",
  alternates: { canonical: "/" },
};

export default async function ArticlesIndexPage() {
  const articles = await getAllArticles();
  return <ArticlesIndexClient articles={articles} />;
}
