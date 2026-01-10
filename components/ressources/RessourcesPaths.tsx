import Link from "next/link";
import { ArrowRight, GraduationCap, TrendingUp, Brain } from "lucide-react";

type PathItem = {
  title: string;
  description: string;
  href: string;
  cta: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconBgClass: string; // ex: "bg-emerald-100 text-emerald-700"
  ctaClass: string; // ex: "text-emerald-700 hover:text-emerald-800"
};

type RessourcesPathsProps = {
  title?: string;
  subtitle?: string;
  items?: PathItem[];
};

export default function RessourcesPaths({
  title = "Par où commencer ?",
  subtitle = "Des parcours conçus pour votre niveau d'expertise.",
  items,
}: RessourcesPathsProps) {
  const paths: PathItem[] =
    items ??
    [
      {
        title: "Les Fondamentaux",
        description:
          "Comprenez les bases de l’analytics et créez votre premier dashboard en moins de 30 minutes.",
        href: "/parcours/fondamentaux",
        cta: "Voir le parcours",
        Icon: GraduationCap,
        iconBgClass: "bg-emerald-100 text-emerald-700",
        ctaClass: "text-emerald-700 hover:text-emerald-800",
      },
      {
        title: "Techniques Avancées",
        description:
          "SQL personnalisée, intégrations API et nettoyage de données pour les analystes confirmés.",
        href: "/parcours/avance",
        cta: "Explorer les guides",
        Icon: TrendingUp,
        iconBgClass: "bg-indigo-100 text-indigo-700",
        ctaClass: "text-indigo-700 hover:text-indigo-800",
      },
      {
        title: "Leadership & Stratégie",
        description:
          "Comment construire une culture data-driven et mesurer le ROI de vos initiatives.",
        href: "/parcours/strategie",
        cta: "Lire les analyses",
        Icon: Brain,
        iconBgClass: "bg-violet-100 text-violet-700",
        ctaClass: "text-violet-700 hover:text-violet-800",
      },
    ];

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-8 py-12 sm:py-14">
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-slate-600">{subtitle}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {paths.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group relative rounded-3xl border border-slate-200/70 bg-slate-50/40 p-7 sm:p-8 shadow-sm hover:bg-white hover:shadow-md hover:shadow-slate-900/5 transition"
          >
            <div
              className={`inline-flex size-12 items-center justify-center rounded-2xl ${p.iconBgClass}`}
            >
              <p.Icon className="size-6" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
              {p.title}
            </h3>

            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              {p.description}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              <span className={`${p.ctaClass} transition-colors`}>
                {p.cta}
              </span>
              <ArrowRight className={`size-4 ${p.ctaClass}`} />
            </div>

            {/* hover outline subtil */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-slate-200/80 transition" />
          </Link>
        ))}
      </div>
    </section>
  );
}
