// app/articles/page.tsx
import { getAllArticles } from "@/lib/articles";
import ArticlesIndexClient from "@/components/ressources/articles/ArticlesLayout";
import { articlesContent } from "@/content/article";

export const revalidate = 1800;

export const metadata = {
  title: articlesContent.seo.title,
  description: articlesContent.seo.desc,
  alternates: { canonical: "/" },
};

export default async function ArticlesIndexPage() {
  const articles = await getAllArticles();
  return (
    <ArticlesIndexClient
      articles={articles}
      content={articlesContent}
    />
  );
}
