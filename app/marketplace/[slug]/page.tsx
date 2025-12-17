import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { getListing, getAllListingSlugs } from "@/lib/marketplace";

import { Image as SaaSImage } from "@/components/marketplace/Images";
import { ListingHeader } from "@/components/marketplace/ListingHeader";
import { TrafficChart } from "@/components/marketplace/TrafficChart";
import { CheckoutCard } from "@/components/marketplace/CheckoutCard";
import { TechStack } from "@/components/marketplace/TechStack";

export async function generateStaticParams() {
  const listings = getAllListingSlugs();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return;
  return { title: `${listing.name} - Marketplace` };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);

  if (!listing) return notFound();

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans text-slate-900">
      {/* Top sticky nav */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/marketplace"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200">
              <ArrowLeft size={16} />
            </div>
            <span>Retour au catalogue</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-700">
              Disponible au développement
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left */}
          <div className="space-y-8 lg:col-span-8">
            {/* ✅ Image AU-DESSUS (comme ton screenshot) */}
            <SaaSImage image={listing.image} name={listing.name} />

            {/* ✅ Titre + étoiles + verified */}
            <ListingHeader listing={listing} />

            {/* ✅ Chart juste dessous */}
            <TrafficChart data={listing.monthly_visits} growth={listing.growth_rate} />

            {/* Concept */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900">
                Le Concept en détail
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {listing.content}
              </p>
            </section>

            {/* MVP Features */}
            {Array.isArray(listing.mvp_features) && listing.mvp_features.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Fonctionnalités Clés du MVP
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {listing.mvp_features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <TechStack stack={listing.stack_guess} />
            </section>
          </div>

          {/* Right sticky column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* ✅ On enlève le chart ici */}
              <CheckoutCard listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
