"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export type Category = "Templates" | "MVP" | "Modules";

export type ClientListing = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  stack: string[];
  featured?: boolean;
  category: Category;
  niche_category?: string;
  discovered_at?: string | null;
};

function MetaDot() {
  return <span className="mx-2 text-slate-300">•</span>;
}

export default function MarketplaceGrid({
  items,
  onReset,
}: {
  items: ClientListing[];
  onReset: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">Aucun résultat</h3>
        <p className="mt-1 text-sm text-slate-600">
          Essaie un autre terme ou change de catégorie.
        </p>
        <button
          onClick={onReset}
          className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
        >
          Réinitialiser
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const hasStack = (item.stack?.length ?? 0) > 0;

        return (
          <Link
            key={item.slug}
            href={`/marketplace/${item.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative bg-slate-100">
              <div className="relative aspect-[16/9]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                    Aperçu indisponible
                  </div>
                )}
              </div>
            </div>

            {/* Text */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-extrabold leading-snug text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <ArrowRight className="mt-1 h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>

              {/* Meta line (discret) */}
              <div className="mt-4 text-[11px] font-medium text-slate-500">
                <span className="uppercase tracking-wide">{item.category}</span>
                {hasStack && (
                  <>
                    <MetaDot />
                    <span>{item.stack.length} stack</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
