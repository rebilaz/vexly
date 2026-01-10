import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

type FeaturedArticle = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tag?: string; // ex: "Tutoriel", "Technique", "Dossier spécial"
  coverImageUrl?: string;
  author?: string; // optionnel si tu l'as
};

type RessourcesFeaturedProps = {
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;

  // 1 gros + 2 petits (si tu passes plus, on coupe)
  items: FeaturedArticle[];
};

function formatMeta(date?: string, readingTime?: string, author?: string) {
  const parts: string[] = [];
  if (readingTime) parts.push(readingTime);
  if (author) parts.push(`Par ${author}`);
  if (date) parts.push(date);
  return parts.join(" • ");
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
      {children}
    </span>
  );
}

export default function RessourcesFeatured({
  title = "À la une cette semaine",
  ctaHref = "/articles",
  ctaLabel = "Voir tout",
  items,
}: RessourcesFeaturedProps) {
  const primary = items?.[0];
  const secondary = items?.slice(1, 3) ?? [];

  if (!primary) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-8 py-10 sm:py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>

        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Carte principale */}
        <Link
          href={`/articles/${primary.slug}`}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-900 shadow-sm lg:col-span-7"
        >
          {/* cover */}
          <div className="absolute inset-0">
            {primary.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primary.coverImageUrl}
                alt={primary.title}
                className="h-full w-full object-cover opacity-75"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-slate-800 to-slate-900" />
            )}
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          </div>

          <div className="relative flex h-[320px] sm:h-[380px] flex-col justify-end p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <TagPill>{primary.tag ?? "Dossier spécial"}</TagPill>
            </div>

            <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              {primary.title}
            </h3>

            {primary.description && (
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200/90">
                {primary.description}
              </p>
            )}

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
              <span className="opacity-90">Lire</span>
              <ArrowRight className="size-4" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/0 group-hover:ring-white/15 transition" />
        </Link>

        {/* Colonne droite */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {secondary.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group rounded-3xl border border-slate-200/70 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md hover:shadow-slate-900/5 transition"
            >
              <div className="flex gap-5">
                {/* mini cover */}
                <div className="mt-1 flex size-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
                  {a.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.coverImageUrl}
                      alt=""
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-[11px] font-medium">No image</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
                    {a.tag ?? "Tutoriel"}
                  </p>

                  <h3 className="mt-2 line-clamp-2 text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                    {a.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="size-3.5" />
                    <span className="truncate">
                      {formatMeta(a.date, a.readingTime, a.author)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-slate-200/80 transition" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
