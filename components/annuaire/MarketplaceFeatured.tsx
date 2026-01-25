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

export default function MarketplaceFeatured({ item }: { item: ClientListing }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* LEFT */}
        <div className="p-7 md:col-span-4 md:p-9">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {item.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {item.description}
          </p>

          <div className="mt-7">
            <Link
              href={`/marketplace/${item.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Découvrir {item.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative md:col-span-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/70 via-white to-white" />

          {/* ✅ rend la carte plus "hero" sur desktop */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] lg:min-h-[440px]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 65vw"
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
