// components/ressources/articles/ArticlesHero.tsx
import { Search } from "lucide-react";

export default function ArticlesHero({
  query,
  selectedCluster,
}: {
  query: string;
  selectedCluster: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-slate-100 bg-white min-h-[75vh] flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.35]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-slate-900 mb-10 leading-[1.02]">
            Explorez, apprenez, <span className="text-indigo-600">bâtissez.</span>
          </h1>

          <p className="text-xl sm:text-2xl leading-relaxed text-slate-600 max-w-2xl mb-16">
            Des guides pratiques et des retours d&apos;expérience pour accélérer sur le Design, le Code et le Business.
          </p>

          <form action="/articles" method="get" className="relative max-w-xl group">
            {/* on conserve le cluster dans l’URL */}
            <input type="hidden" name="c" value={selectedCluster || "all"} />

            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>

            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un sujet..."
              className="block w-full rounded-2xl py-5 pl-12 pr-4 text-base text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 bg-white/90 backdrop-blur"
            />
          </form>

          {query && (
            <div className="mt-4">
              <a
                href={`/articles?c=${encodeURIComponent(selectedCluster || "all")}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Effacer la recherche
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
