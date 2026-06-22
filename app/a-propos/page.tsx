import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BrainCircuit,
  Check,
  Code2,
  Layers3,
  Rocket,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

const stats = [
  {
    value: "Studio",
    label: "indépendant et spécialisé",
  },
  {
    value: "SaaS",
    label: "MVP et abonnements",
  },
  {
    value: "Produit",
    label: "de l’idée à la production",
  },
  {
    value: "Next.js",
    label: "Supabase et Stripe",
  },
];

const story = [
  {
    label: "Le point de départ",
    title: "Construire des produits, pas seulement du code",
    description:
      "Vexly est né d’une conviction simple : un bon SaaS ne repose pas uniquement sur une base technique solide. Il doit résoudre un vrai problème, proposer une expérience claire et disposer d’un modèle économique cohérent.",
    icon: Rocket,
  },
  {
    label: "Notre méthode",
    title: "Concevoir, lancer, mesurer et améliorer",
    description:
      "Chaque projet est pensé comme un produit vivant. Nous avançons par étapes, priorisons les fonctionnalités essentielles et confrontons rapidement le produit à ses futurs utilisateurs.",
    icon: Target,
  },
  {
    label: "Aujourd’hui",
    title: "Un studio spécialisé dans les produits SaaS",
    description:
      "Vexly accompagne les créateurs et entrepreneurs digitaux dans la conception de MVP, de plateformes d’abonnement et de produits SaaS prêts à évoluer.",
    icon: Sparkles,
  },
];

const differences = [
  {
    title: "On construit vraiment",
    description:
      "Nous ne nous limitons pas aux maquettes et aux recommandations. Nous concevons des produits fonctionnels, connectés aux paiements, aux données et aux utilisateurs.",
    icon: Blocks,
  },
  {
    title: "Spécialistes du SaaS",
    description:
      "Authentification, abonnements, tableaux de bord, rôles utilisateurs, automatisations et métriques produit font partie de notre quotidien.",
    icon: Layers3,
  },
  {
    title: "Le produit avant la complexité",
    description:
      "Nous privilégions les fonctionnalités qui apportent une valeur immédiate plutôt que d’accumuler des développements coûteux et inutiles.",
    icon: BrainCircuit,
  },
  {
    title: "Une approche impliquée",
    description:
      "Nous challengeons le positionnement, le parcours utilisateur et le modèle économique afin de construire un produit cohérent, pas simplement une application.",
    icon: BadgeCheck,
  },
];

const expertise = [
  "Création de MVP SaaS",
  "Plateformes d’abonnement",
  "Paiements et facturation Stripe",
  "Authentification et espaces membres",
  "Tableaux de bord et back-offices",
  "Intégration d’intelligence artificielle",
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Stripe",
  "Sanity",
];

const AboutVexly: React.FC = () => {
  return (
    <main className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, rgba(99,102,241,0.22), transparent 34%), radial-gradient(circle at 85% 25%, rgba(139,92,246,0.18), transparent 30%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
                <Sparkles size={14} aria-hidden="true" />
                Le studio Vexly
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Nous construisons des SaaS pensés pour{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  devenir de vrais produits.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Vexly accompagne les créateurs et entrepreneurs digitaux dans
                la conception, le lancement et l’évolution de produits SaaS,
                de MVP et de plateformes d’abonnement.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Parler de votre projet
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>

                <Link
                  href="/realisations"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-white/[0.07] hover:text-white"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>

            {/* Illustration produit */}
            <div className="relative mx-auto w-full max-w-xl">
              <div
                className="absolute -inset-12 rounded-full bg-indigo-500/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 p-3 shadow-2xl shadow-indigo-950/60 backdrop-blur">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white">
                        <Code2 size={18} aria-hidden="true" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Vexly Product
                        </p>
                        <p className="text-xs text-slate-500">
                          Tableau de bord SaaS
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      En ligne
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-5">
                    {[
                      ["MRR", "12 480 €", "+18,4 %"],
                      ["Utilisateurs", "1 284", "+92"],
                      ["Rétention", "92,4 %", "+3,1 %"],
                    ].map(([label, value, change]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-[11px] text-slate-500">{label}</p>
                        <p className="mt-2 text-base font-semibold text-white sm:text-lg">
                          {value}
                        </p>
                        <p className="mt-1 text-[11px] text-emerald-400">
                          {change}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 pb-5">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            Revenus récurrents
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Démonstration avec données fictives
                          </p>
                        </div>

                        <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">
                          12 mois
                        </span>
                      </div>

                      <div className="flex h-36 items-end gap-2">
                        {[30, 42, 38, 55, 48, 65, 58, 72, 68, 82, 78, 94].map(
                          (height, index) => (
                            <div
                              key={`${height}-${index}`}
                              className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400"
                              style={{
                                height: `${height}%`,
                                opacity: 0.45 + index * 0.045,
                              }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Repères */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-9 sm:grid-cols-4 lg:mt-20">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p className="text-xl font-semibold text-indigo-300 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="px-6 py-24 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Notre histoire
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Pourquoi Vexly existe.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Pour rapprocher la stratégie produit, le design et la technologie
              au sein d’un même studio.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div
              className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-indigo-500 via-indigo-200 to-transparent sm:left-8"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {story.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="relative flex gap-6 sm:gap-10"
                  >
                    <div className="relative z-10 flex w-12 flex-shrink-0 justify-center sm:w-16">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-600 text-white shadow-lg shadow-indigo-200 sm:h-16 sm:w-16">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="pb-3 pt-1 sm:pt-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                        {item.label}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Différences */}
      <section className="bg-slate-50 px-6 py-24 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Ce qui nous différencie
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Plus qu’un prestataire technique.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Nous intervenons sur le produit dans son ensemble, de la première
              décision stratégique jusqu’à sa mise en production.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differences.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-indigo-300 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={23} aria-hidden="true" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 sm:py-28 lg:px-8">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 75% 50%, rgba(99,102,241,0.2), transparent 35%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Notre philosophie
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Un bon produit commence par les bonnes décisions.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Écrire du code est une partie du travail. Avant cela, il faut
              identifier le bon problème, construire une offre compréhensible
              et définir une expérience suffisamment simple pour être adoptée.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
              Notre rôle est aussi de vous aider à éliminer ce qui ralentit le
              lancement afin de concentrer les ressources sur ce qui crée
              réellement de la valeur.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-9">
            <p className="text-sm font-medium text-indigo-300">
              Les expertises mobilisées
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {expertise.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
                >
                  <Check
                    size={17}
                    className="mt-0.5 flex-shrink-0 text-indigo-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="px-6 py-24 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-slate-950 p-10">
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(99,102,241,0.32), transparent 40%)",
                  }}
                />

                <div className="relative">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500 to-violet-600 text-6xl font-semibold text-white shadow-2xl shadow-indigo-950">
                    G
                  </div>

                  <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 shadow-xl">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Fondateur de Vexly
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12 lg:p-14">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  <UserRound size={16} aria-hidden="true" />
                  Derrière Vexly
                </div>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Gabriel, fondateur et product builder.
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-600">
                  Je conçois des produits SaaS en réunissant stratégie,
                  expérience utilisateur et développement. Mon objectif est de
                  transformer une idée en produit clair, utilisable et capable
                  d’évoluer.
                </p>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  À travers Vexly, j’accompagne les créateurs et entrepreneurs
                  qui souhaitent lancer un produit numérique sans multiplier
                  les intermédiaires.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    href="/gabriel"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Découvrir mon parcours
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>

                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                  >
                    Lire mes articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 sm:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-indigo-600 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.17), transparent 30%), radial-gradient(circle at 85% 80%, rgba(76,29,149,0.32), transparent 35%)",
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Construisons votre produit
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Une idée de SaaS à transformer en produit ?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-100">
              Présentez-nous votre projet. Nous identifierons ensemble le
              périmètre essentiel, les priorités et la meilleure approche pour
              le lancer.
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
            >
              Discuter de mon projet
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutVexly;