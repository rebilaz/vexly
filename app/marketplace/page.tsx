"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Layers, Zap, LayoutTemplate, Box } from "lucide-react";

// --- TYPES ---
type Stage = "Idea" | "MVP" | "Live";
type Pricing = "Free" | "Paid";
type Category = "All" | "Templates" | "MVP" | "Modules";

type Listing = {
  slug: string;
  title: string;
  description: string;
  image: string;
  stage: Stage;
  pricing: Pricing;
  tags: string[];
  stack: string[]; // Tech stack (React, Stripe, etc.)
  featured?: boolean; // Mettre en avant en haut de page
  category: Category; // Pour le filtrage par onglets
};

// --- DATA ---
const LISTINGS: Listing[] = [
  {
    slug: "vexly-mvp-preview",
    title: "Vexly MVP Starter",
    description: "Le kit de démarrage ultime pour Next.js 14. Auth, Paiements, Dashboard et Landing page pré-configurés pour gagner 2 mois.",
    image: "/marketplace/vexly-mvp-preview.png",
    stage: "MVP",
    pricing: "Paid",
    tags: ["SaaS", "Boilerplate", "Next.js"],
    stack: ["Next.js 14", "Supabase", "Stripe", "Tailwind"],
    featured: true, // C'est lui qui sera en GRAND en haut
    category: "Templates",
  },
  {
    slug: "clientops-hub",
    title: "ClientOps Hub",
    description: "Portail client + onboarding + suivi de livrables. Parfait pour structurer une agence ou une activité freelance.",
    image: "/marketplace/clientops-hub.png",
    stage: "Idea",
    pricing: "Free",
    tags: ["Freelance", "Portal", "Ops"],
    stack: ["Notion API", "React"],
    category: "MVP",
  },
  {
    slug: "creator-billing-lite",
    title: "Creator Billing Lite",
    description: "Système de facturation simplifié pour créateurs : abonnements, liens de paiement, et calcul automatique du MRR.",
    image: "/marketplace/creator-billing-lite.png",
    stage: "Live",
    pricing: "Paid",
    tags: ["Stripe", "Finance", "Creator"],
    stack: ["Stripe Connect", "Node.js"],
    category: "Modules",
  },
  {
    slug: "brief-to-saas",
    title: "Brief to SaaS",
    description: "Transforme un brief client flou en scope MVP clair : écrans, user stories, priorités et estimation de temps.",
    image: "/marketplace/brief-to-saas.png",
    stage: "MVP",
    pricing: "Paid",
    tags: ["Product", "AI", "Scope"],
    stack: ["OpenAI API", "Vercel SDK"],
    category: "MVP",
  },
  // Tu peux ajouter d'autres items ici...
];

// --- COMPOSANTS UI ---

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 ${className}`}>
      {children}
    </span>
  );
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Logique de filtrage (Moteur de recherche interne)
  const filteredListings = useMemo(() => {
    return LISTINGS.filter((item) => {
      // 1. Filtre par Onglet
      // On masque le 'featured' de la grille si on est sur l'onglet "All" pour éviter le doublon avec le Hero
      // Mais si on filtre spécifiquement (ex: Templates), on peut vouloir le voir dans la liste.
      if (activeTab === "All" && item.featured && searchQuery === "") return false;

      const matchesTab = activeTab === "All" || item.category === activeTab || (activeTab === "MVP" && item.stage === "MVP");
      
      // 2. Filtre par Recherche
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Récupération du produit mis en avant pour le Hero
  const featuredItem = LISTINGS.find((i) => i.featured);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* HEADER SIMPLE */}
      <div className="border-b border-slate-100 bg-white pt-8 pb-6">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Marketplace</h1>
          <p className="mt-2 text-sm text-slate-500">
            Découvrez des modules, templates et MVP prêts à l&apos;emploi.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-8">
        
        {/* SECTION HERO SPOTLIGHT (Affiché seulement si pas de recherche active et onglet 'All') */}
        {featuredItem && searchQuery === "" && activeTab === "All" && (
          <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 p-1 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              {/* Image à gauche (Grande) */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-auto md:w-3/5">
                <Image
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm text-slate-800 shadow-sm">
                  ★ Featured Product
                </div>
              </div>

              {/* Contenu à droite */}
              <div className="flex flex-col justify-center p-6 md:p-8 md:w-2/5">
                <div className="mb-4 flex gap-2">
                  <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100">Recommended</Badge>
                  <Badge>{featuredItem.stage}</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{featuredItem.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {featuredItem.description}
                </p>
                
                {/* Stack Icons */}
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
                  {featuredItem.stack.map(tech => (
                    <span key={tech} className="rounded border border-slate-200 bg-white px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link href={`/marketplace/${featuredItem.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Découvrir <ArrowRight size={16} />
                  </Link>
                  <span className="text-lg font-bold text-slate-900">$249</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTROLS (Search & Tabs) */}
        <div className="sticky top-[65px] z-30 mb-8 bg-white/95 py-4 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Rechercher des templates, modules..."
              />
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {(["All", "Templates", "MVP", "Modules"] as Category[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HEADER GRILLE */}
        <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
                {searchQuery ? `Résultats pour "${searchQuery}"` : "Tous les produits"}
            </div>
            <div className="text-xs text-slate-500">
                {filteredListings.length} résultat{filteredListings.length > 1 ? 's' : ''}
            </div>
        </div>

        {/* GRID LISTINGS */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((item) => (
              <Link
                key={item.slug}
                href={`/marketplace/${item.slug}`}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image Card */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-100 border-b border-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                      Voir le détail
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      {item.category === 'Templates' && <LayoutTemplate size={12} />}
                      {item.category === 'Modules' && <Box size={12} />}
                      {item.category === 'MVP' && <Zap size={12} />}
                      {item.category}
                    </div>
                    <span className={`text-xs font-medium ${item.pricing === 'Paid' ? 'text-slate-900' : 'text-green-600'}`}>
                      {item.pricing === 'Free' ? 'Gratuit' : 'Payant'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Footer Card: Stack */}
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-2">
                        {item.stack.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                                {t}
                            </span>
                        ))}
                        {item.stack.length > 3 && (
                             <span className="text-[10px] font-medium text-slate-400 py-0.5">+ {item.stack.length - 3}</span>
                        )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center bg-slate-50/50">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Aucun produit trouvé</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1 text-sm">
              Nous n&apos;avons rien trouvé pour &quot;{searchQuery}&quot;. Essayez un autre terme ou changez de catégorie.
            </p>
            <button 
                onClick={() => {setSearchQuery(""); setActiveTab("All")}}
                className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
                Tout effacer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}