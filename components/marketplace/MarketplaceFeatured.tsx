"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "featured" | "category";
}) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold leading-none";

  if (variant === "featured") {
    return (
      <span className={`${base} border-amber-200 bg-amber-50 text-amber-700`}>
        {children}
      </span>
    );
  }

  if (variant === "category") {
    return (
      <span className={`${base} border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur`}>
        {children}
      </span>
    );
  }

  return <span className={`${base} border-slate-200 bg-white text-slate-700`}>{children}</span>;
}

export default function MarketplaceFeatured({ item }: { item: ClientListing }) {
  return (
    // ✅ plus de max-w ici : la largeur vient du container parent
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* LEFT */}
        <div className="p-7 md:col-span-5 md:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="featured">★ FEATURED</Badge>
            <Badge variant="category">{item.category}</Badge>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            {item.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {item.description}
          </p>

          {/* ✅ Amazon-like : pas de tags/stack ici */}
          <div className="mt-6">
            <Link
              href={`/marketplace/${item.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              Découvrir {item.title} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative md:col-span-7">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/70 via-white to-white" />
          <div className="relative aspect-[16/10] md:h-full md:aspect-auto">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                Aperçu indisponible
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
