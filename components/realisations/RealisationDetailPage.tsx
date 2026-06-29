import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

import FinalCTASection from "@/components/FinalCTASection";
import type { RealisationDetail } from "@/sanity/lib/realisations";

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="font-semibold text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
    >
      {children}
    </Link>
  );
}

function CoverVisual({ project }: { project: RealisationDetail }) {
  const imageUrl = project.coverImage?.asset?.url;

  if (imageUrl) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_35px_100px_rgba(0,0,0,0.28)]">
        <img
          src={imageUrl}
          alt={project.coverImage?.alt || project.title}
          className="aspect-[4/3] h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/15 ${project.surfaceClass} shadow-[0_35px_100px_rgba(0,0,0,0.24)]`}
    >
      <div className={`absolute -right-20 -top-20 size-72 rounded-full blur-3xl ${project.glowClass}`} />
      <div className="absolute inset-6 rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur">
        <div className="flex h-10 items-center gap-2 border-b border-slate-200 pb-4">
          <span className="size-2.5 rounded-full bg-rose-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-slate-100" />
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_140px]">
          <div className="rounded-2xl bg-[#071a33] p-5 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-indigo-200">
              Experience produit
            </p>
            <div className="mt-4 h-8 w-4/5 rounded-lg bg-white/90" />
            <div className="mt-3 h-2.5 w-3/5 rounded-full bg-white/30" />
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[72, 48, 88].map((width) => (
                <div key={width} className="rounded-xl bg-white/[0.08] p-3">
                  <div className="h-2 rounded-full bg-indigo-300" style={{ width: `${width}%` }} />
                  <div className="mt-3 h-2 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="h-20 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500" />
            <div className="mt-4 h-3 w-full rounded-full bg-slate-800" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children?: string;
}) {
  if (!children) return null;

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">{children}</p>
    </article>
  );
}

export function RealisationDetailPage({
  project,
}: {
  project: RealisationDetail;
}) {
  const metaItems = [
    ["Client", project.client],
    ["Annee", project.year?.toString()],
    ["Duree", project.duration],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const hasContent = Boolean(project.content?.length);
  const gallery = project.gallery?.filter((image) => image.asset?.url) || [];

  return (
    <main className="overflow-hidden bg-[#F8FAFC] text-slate-950">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#061A33_0%,#0B1F3A_52%,#171B4B_100%)] px-6 pb-20 pt-24 text-white sm:px-8 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-[-18rem] size-[38rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-36 size-[34rem] rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-sm font-black text-slate-300 transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Retour aux realisations
            </Link>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-200 backdrop-blur">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {project.eyebrow || project.category || "Realisation Vexly"}
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.4rem]">
              {project.title}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {project.description || project.summary}
            </p>

            {project.services?.length ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-bold text-slate-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(88,80,236,0.40)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Creer un projet similaire
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.055] px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:border-indigo-300/[0.35] hover:bg-white/[0.09]"
                >
                  Voir le site
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>

          <CoverVisual project={project} />
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            {metaItems.length ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
                  Projet
                </p>
                <dl className="mt-5 space-y-4">
                  {metaItems.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6">
                      <dt className="text-sm font-bold text-slate-500">{label}</dt>
                      <dd className="text-right text-sm font-black text-slate-950">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {project.metrics?.length ? (
              <div className="grid gap-3">
                {project.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
                  >
                    <p className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </aside>

          <div className="grid gap-5">
            <DetailBlock title="Challenge">{project.challenge}</DetailBlock>
            <DetailBlock title="Solution">{project.solution}</DetailBlock>
            <DetailBlock title="Resultats">{project.results}</DetailBlock>
          </div>
        </div>
      </section>

      {hasContent ? (
        <section className="px-6 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-10">
            <PortableText
              value={project.content || []}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-10 text-3xl font-black tracking-[-0.04em] text-slate-950 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-8 text-xl font-black text-slate-950">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="mb-5 text-base leading-8 text-slate-600">
                      {children}
                    </p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="mb-6 ml-5 list-disc space-y-2 text-base leading-7 text-slate-600">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="mb-6 ml-5 list-decimal space-y-2 text-base leading-7 text-slate-600">
                      {children}
                    </ol>
                  ),
                },
                marks: {
                  link: ({ children, value }) => (
                    <ProjectLink href={value?.href || "#"}>{children}</ProjectLink>
                  ),
                },
                types: {
                  image: ({ value }) => {
                    const src = value?.asset?.url;
                    if (!src) return null;

                    return (
                      <figure className="my-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                        <img
                          src={src}
                          alt={value?.alt || ""}
                          className="h-auto w-full object-cover"
                        />
                        {value?.caption ? (
                          <figcaption className="px-4 py-3 text-sm text-slate-500">
                            {value.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  },
                },
              }}
            />
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="px-6 pb-20 sm:px-8 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
              Apercus
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {gallery.map((image, index) => (
                <figure
                  key={`${image.asset?.url}-${index}`}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.07)]"
                >
                  <img
                    src={image.asset?.url}
                    alt={image.alt || project.title}
                    className="aspect-video h-full w-full object-cover"
                  />
                  {image.caption ? (
                    <figcaption className="px-5 py-4 text-sm font-medium text-slate-500">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCTASection
        eyebrow="Votre projet peut etre le prochain"
        title="Transformons votre idee en un SaaS que votre audience voudra utiliser."
        subtitle="Vexly vous aide a cadrer, designer et developper une premiere version solide, vendable et prete a evoluer."
        primaryCtaLabel="Discuter de mon projet"
        href="/contact"
      />
    </main>
  );
}
