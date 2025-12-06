"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Clock,
  TrendingUp,
  Sparkles,
  Zap,
  Brain,
  Briefcase,
  Palette,
  DollarSign,
  BookOpen,
} from "lucide-react";

import type { Article } from "@/lib/articles";

type Props = {
  articles: Article[];
};

type ClusterId = "all" | "automation" | "ai" | "freelance" | "design" | "business";

const CLUSTERS: {
  id: ClusterId | string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  intro?: string;
}[] = [
  {
    id: "all",
    label: "Tous les articles",
    icon: BookOpen,
    color: "from-slate-600 to-slate-700",
  },
  {
    id: "automation",
    label: "Automatisation",
    icon: Zap,
    color: "from-indigo-500 to-indigo-600",
    intro: "Workflows, optimisation et gains de productivité.",
  },
  {
    id: "ai",
    label: "Intelligence Artificielle",
    icon: Brain,
    color: "from-purple-500 to-purple-600",
    intro: "IA générative, ML et applications concrètes.",
  },
  {
    id: "freelance",
    label: "Freelance",
    icon: Briefcase,
    color: "from-emerald-500 to-emerald-600",
    intro: "Stratégies et outils pour indépendants.",
  },
  {
    id: "design",
    label: "Design / UX",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    intro: "Interface, expérience utilisateur et ergonomie.",
  },
  {
    id: "business",
    label: "Business / Pricing",
    icon: DollarSign,
    color: "from-amber-500 to-amber-600",
    intro: "Modèles économiques et stratégies de monétisation.",
  },
];

const ArticlesIndexClient: React.FC<Props> = ({ articles }) => {
  const [selectedCluster, setSelectedCluster] = React.useState<ClusterId | string>("all");
  const [query, setQuery] = React.useState("");

  // Normalisation : on dérive un "clusterId" cohérent par article
  const enriched = React.useMemo(
    () =>
      articles.map((article) => {
        const fm = article.frontmatter as any;
        // On privilégie frontmatter.cluster, sinon on tombe sur niche, sinon "autres"
        const rawCluster: string =
          fm.cluster || fm.niche || "autres";

        const normalizedCluster = rawCluster.toLowerCase().trim();

        return {
          ...article,
          _clusterId: normalizedCluster as ClusterId | string,
        };
      }),
    [articles],
  );

  // Filtrage cluster + recherche
  const filteredArticles = React.useMemo(() => {
    let list = enriched;

    if (selectedCluster !== "all") {
      list = list.filter((a) => a._clusterId === selectedCluster);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(({ frontmatter }) => {
        const { title, description, niche, tags = [] } = frontmatter as any;

        const haystack = [
          title ?? "",
          description ?? "",
          niche ?? "",
          ...tags,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    // Tri par date desc si dispo
    return [...list].sort((a, b) => {
      const da = a.frontmatter.date
        ? new Date(a.frontmatter.date as string).getTime()
        : 0;
      const db = b.frontmatter.date
        ? new Date(b.frontmatter.date as string).getTime()
        : 0;
      return db - da;
    });
  }, [enriched, selectedCluster, query]);

  // Article "en vedette"
  const featuredArticle = React.useMemo(() => {
    const withFlag = filteredArticles.find(
      (a) =>
        (a.frontmatter as any).is_featured === true ||
        (a.frontmatter as any).featured === true,
    );
    return withFlag ?? filteredArticles[0];
  }, [filteredArticles]);

  const standardArticles = React.useMemo(
    () =>
      featuredArticle
        ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug)
        : filteredArticles,
    [filteredArticles, featuredArticle],
  );

  const activeCluster =
    CLUSTERS.find((c) => c.id === selectedCluster) ?? CLUSTERS[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HERO / HEADER */}
      <header className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                Articles
              </h1>
            </div>

            <p className="text-slate-700 text-lg leading-relaxed max-w-3xl mb-8">
              Conseils actionnables, stratégies et analyses pour créer,
              développer et monétiser vos projets SaaS, IA et automatisation.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-900 text-base">
                  {articles.length} article
                  {articles.length > 1 ? "s publiés" : " publié"}
                </span>
              </div>

              {/* Barre de recherche */}
              <div className="relative flex-1 w-full sm:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher par mot-clé, sujet, tag..."
                  className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-slate-200 bg-white
                             text-slate-900 placeholder:text-slate-400 text-sm sm:text-base
                             focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                             shadow-sm hover:border-slate-300 transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* CLUSTER FILTERS */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto py-5 scrollbar-hide">
            {CLUSTERS.map((cluster, index) => {
              const Icon = cluster.icon;
              const isActive = selectedCluster === cluster.id;

              return (
                <motion.button
                  key={cluster.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedCluster(cluster.id)}
                  className={`
                    relative flex items-center gap-2.5 px-6 py-3 rounded-xl whitespace-nowrap
                    text-sm sm:text-[15px]
                    transition-all duration-300 group
                    ${
                      isActive
                        ? `bg-gradient-to-r ${cluster.color} text-white shadow-lg shadow-indigo-500/20`
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }
                  `}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-700"
                    }`}
                  />
                  <span>{cluster.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16 flex-1">
        <AnimatePresence mode="wait">
          {filteredArticles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center justify-center py-24 px-6"
            >
              <div className="p-6 bg-slate-100 rounded-full mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-slate-900 text-xl mb-3">
                Aucun article trouvé
              </h3>
              <p className="text-slate-600 text-center max-w-md text-base">
                Essayez avec d&apos;autres mots-clés ou sélectionnez un autre
                cluster.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCluster + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header de section cluster */}
              {activeCluster.id !== "all" && (
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-3">
                    {React.createElement(activeCluster.icon, {
                      className: "w-7 h-7 text-indigo-600",
                    })}
                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                      {activeCluster.label}
                    </h2>
                  </div>
                  {activeCluster.intro && (
                    <p className="text-slate-600 text-base sm:text-lg">
                      {activeCluster.intro}
                    </p>
                  )}
                </div>
              )}

              {/* Article en vedette */}
              {featuredArticle && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-12 lg:mb-16"
                >
                  <Link
                    href={`/articles/${featuredArticle.slug}`}
                    className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-12 shadow-2xl shadow-slate-900/20 hover:shadow-3xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.12),transparent_60%)]" />

                    <div className="relative z-10 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs sm:text-sm uppercase tracking-wide shadow-lg shadow-indigo-500/30">
                          Article en vedette
                        </span>
                        {((featuredArticle.frontmatter as any).tags || [])
                          .slice(0, 3)
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs sm:text-sm border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-5 leading-tight group-hover:text-indigo-200 transition-colors duration-300">
                        {featuredArticle.frontmatter.title}
                      </h3>

                      {featuredArticle.frontmatter.description && (
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                          {featuredArticle.frontmatter.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm sm:text-base">
                        {featuredArticle.frontmatter.date && (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4.5 h-4.5" />
                            <span>
                              {featuredArticle.frontmatter.date as string}
                            </span>
                          </span>
                        )}
                        {featuredArticle.frontmatter.date &&
                          featuredArticle.frontmatter.readingTime && (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          )}
                        {featuredArticle.frontmatter.readingTime && (
                          <span>
                            {featuredArticle.frontmatter.readingTime} de lecture
                          </span>
                        )}
                        <span className="ml-auto px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm group-hover:bg-white/20 transition-colors duration-300">
                          Lire l&apos;article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Grille des autres articles */}
              {standardArticles.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {standardArticles.map((article, index) => {
                    const fm = article.frontmatter as any;
                    const clusterConfig =
                      CLUSTERS.find((c) => c.id === article._clusterId) ??
                      CLUSTERS[0];

                    return (
                      <motion.article
                        key={article.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                      >
                        <Link
                          href={`/articles/${article.slug}`}
                          className="group block h-full relative"
                        >
                          <div
                            className={`absolute -inset-0.5 bg-gradient-to-r ${
                              clusterConfig.color ||
                              "from-slate-400 to-slate-500"
                            } rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}
                          />

                          <div className="relative h-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                            {/* Badge de cluster */}
                            {clusterConfig && (
                              <div className="mb-4">
                                <span
                                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r ${clusterConfig.color} text-white rounded-full text-[11px] sm:text-xs uppercase tracking-wide shadow-sm`}
                                >
                                  {React.createElement(clusterConfig.icon, {
                                    className: "w-3.5 h-3.5",
                                  })}
                                  {clusterConfig.label}
                                </span>
                              </div>
                            )}

                            <h4 className="text-slate-900 text-base sm:text-lg font-semibold mb-3 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                              {fm.title}
                            </h4>

                            {fm.description && (
                              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-5 flex-1 line-clamp-3">
                                {fm.description}
                              </p>
                            )}

                            <div className="flex items-center gap-3 pt-5 border-t border-slate-100 text-slate-500 text-xs sm:text-sm">
                              {fm.date && (
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4" />
                                  {fm.date}
                                </span>
                              )}
                              {fm.date && fm.readingTime && (
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                              )}
                              {fm.readingTime && <span>{fm.readingTime}</span>}
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="h-10" />
    </div>
  );
};

export default ArticlesIndexClient;
