import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default async function ArticlesIndexPage() {
  const articles = await getAllArticles();

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ul className="space-y-4">
        {articles.map(({ frontmatter, slug }) => (
          <li key={slug} className="border-b border-slate-200 pb-4">
            <Link
              href={`/articles/${slug}`}
              className="text-xl font-semibold hover:text-indigo-600"
            >
              {frontmatter.title}
            </Link>
            {frontmatter.description && (
              <p className="text-sm text-slate-600 mt-1">
                {frontmatter.description}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {frontmatter.date} {frontmatter.readingTime && `· ${frontmatter.readingTime}`}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
