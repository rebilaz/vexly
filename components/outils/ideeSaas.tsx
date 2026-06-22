"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";

import type {
  ToolCalculatorConfig,
} from "@/sanity/lib/outils";

type IdeeSaasCreateurToolProps = {
  config: ToolCalculatorConfig;
};

type FormData = {
  platform: string;
  niche: string;
  audienceSize: string;
  audienceProfile: string;
  problems: string;
  expertise: string;
  existingOffers: string;
  complexity: string;
};

type IdeeSaasResult = {
  productName: string;
  pitch: string;
  targetCustomer: string;
  problemSolved: string;
  valueProposition: string;
  whyItFitsAudience: string;
  suggestedPrice: string;
  businessModel: string;
  score: number;
  mvpFeatures: string[];
  futureFeatures: string[];
  launchPlan: string[];
  risks: string[];
};

const initialForm: FormData = {
  platform: "YouTube",
  niche: "",
  audienceSize: "",
  audienceProfile: "",
  problems: "",
  expertise: "",
  existingOffers: "",
  complexity: "simple",
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#6547FF] focus:ring-4 focus:ring-[#6547FF]/10";

const labelClassName =
  "text-sm font-black text-slate-950";

function NumberedList({
  items,
}: {
  items: string[];
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="flex items-start gap-3"
        >
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#6547FF]/10 text-xs font-black text-[#6547FF]">
            {index + 1}
          </span>

          <span className="text-sm leading-7 text-slate-600">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ResultCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6547FF]">
        {eyebrow}
      </p>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950">
        {title}
      </h3>

      {children}
    </article>
  );
}

export function IdeeSaasCreateurTool({
  config,
}: IdeeSaasCreateurToolProps) {
  const [form, setForm] =
    useState<FormData>(initialForm);

  const [result, setResult] =
    useState<IdeeSaasResult | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const resultRef =
    useRef<HTMLDivElement | null>(null);

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "/api/outils/idee-saas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const payload = (await response.json()) as {
        success?: boolean;
        result?: IdeeSaasResult;
        error?: string;
      };

      if (!response.ok || !payload.result) {
        throw new Error(
          payload.error ??
            "Impossible de générer votre idée de SaaS.",
        );
      }

      setResult(payload.result);

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur est survenue.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative mx-auto mt-10 max-w-6xl">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[#6547FF]/10 blur-3xl" />

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
        <header className="border-b border-slate-100 bg-slate-50 px-6 py-7 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6547FF]">
            {config.eyebrow ?? "Analyse IA"}
          </p>

          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
            {config.title}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Décrivez votre audience et les problèmes
            qu’elle rencontre. L’IA vous proposera une
            idée de SaaS adaptée à votre communauté.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-6 sm:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="platform"
                className={labelClassName}
              >
                Plateforme principale
              </label>

              <select
                id="platform"
                value={form.platform}
                onChange={(event) =>
                  updateField(
                    "platform",
                    event.target.value,
                  )
                }
                className={inputClassName}
              >
                <option value="YouTube">
                  YouTube
                </option>
                <option value="Instagram">
                  Instagram
                </option>
                <option value="TikTok">
                  TikTok
                </option>
                <option value="Newsletter">
                  Newsletter
                </option>
                <option value="Podcast">
                  Podcast
                </option>
                <option value="LinkedIn">
                  LinkedIn
                </option>
                <option value="Communauté privée">
                  Communauté privée
                </option>
                <option value="Plusieurs plateformes">
                  Plusieurs plateformes
                </option>
                <option value="Autre">
                  Autre
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="audienceSize"
                className={labelClassName}
              >
                Taille de l’audience
              </label>

              <input
                id="audienceSize"
                type="text"
                value={form.audienceSize}
                onChange={(event) =>
                  updateField(
                    "audienceSize",
                    event.target.value,
                  )
                }
                placeholder="Exemple : 25 000 abonnés"
                required
                maxLength={100}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="niche"
              className={labelClassName}
            >
              Quelle est votre niche ?
            </label>

            <input
              id="niche"
              type="text"
              value={form.niche}
              onChange={(event) =>
                updateField(
                  "niche",
                  event.target.value,
                )
              }
              placeholder="Exemple : fitness, finance, marketing, cuisine..."
              required
              maxLength={150}
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="audienceProfile"
              className={labelClassName}
            >
              Décrivez votre audience
            </label>

            <textarea
              id="audienceProfile"
              value={form.audienceProfile}
              onChange={(event) =>
                updateField(
                  "audienceProfile",
                  event.target.value,
                )
              }
              placeholder="Qui sont vos abonnés ? Quels sont leurs objectifs, leur métier, leur niveau et leurs habitudes ?"
              required
              minLength={20}
              maxLength={1200}
              rows={5}
              className={inputClassName}
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {form.audienceProfile.length}/1200
            </p>
          </div>

          <div>
            <label
              htmlFor="problems"
              className={labelClassName}
            >
              Quels problèmes rencontrent-ils ?
            </label>

            <textarea
              id="problems"
              value={form.problems}
              onChange={(event) =>
                updateField(
                  "problems",
                  event.target.value,
                )
              }
              placeholder="Listez les questions fréquentes, difficultés et tâches répétitives de votre audience."
              required
              minLength={30}
              maxLength={1800}
              rows={6}
              className={inputClassName}
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {form.problems.length}/1800
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="expertise"
                className={labelClassName}
              >
                Votre expertise
              </label>

              <textarea
                id="expertise"
                value={form.expertise}
                onChange={(event) =>
                  updateField(
                    "expertise",
                    event.target.value,
                  )
                }
                placeholder="Que maîtrisez-vous particulièrement bien ?"
                required
                minLength={20}
                maxLength={900}
                rows={5}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="existingOffers"
                className={labelClassName}
              >
                Produits déjà vendus
              </label>

              <textarea
                id="existingOffers"
                value={form.existingOffers}
                onChange={(event) =>
                  updateField(
                    "existingOffers",
                    event.target.value,
                  )
                }
                placeholder="Formation, coaching, communauté, ebook... Facultatif."
                maxLength={900}
                rows={5}
                className={inputClassName}
              />
            </div>
          </div>

          <fieldset>
            <legend className={labelClassName}>
              Complexité du SaaS souhaitée
            </legend>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: "simple",
                  title: "Simple",
                  description:
                    "Une fonction principale et un lancement rapide.",
                },
                {
                  value: "intermediaire",
                  title: "Intermédiaire",
                  description:
                    "Un espace membre et plusieurs fonctionnalités.",
                },
                {
                  value: "avance",
                  title: "Avancé",
                  description:
                    "IA, automatisations et intégrations externes.",
                },
              ].map((option) => {
                const selected =
                  form.complexity === option.value;

                return (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-2xl border p-5 transition ${
                      selected
                        ? "border-[#6547FF] bg-[#6547FF]/5 shadow-[0_12px_30px_rgba(101,71,255,0.10)]"
                        : "border-slate-200 bg-white hover:border-[#6547FF]/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="complexity"
                      value={option.value}
                      checked={selected}
                      onChange={() =>
                        updateField(
                          "complexity",
                          option.value,
                        )
                      }
                      className="sr-only"
                    />

                    <span className="block font-black text-slate-950">
                      {option.title}
                    </span>

                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      {option.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5 border-t border-slate-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-xs leading-6 text-slate-500">
              La recommandation devra ensuite être
              validée auprès de vrais utilisateurs avant
              de développer le produit.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#6547FF] px-7 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(101,71,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyse de votre audience…
                </>
              ) : (
                <>
                  Générer mon idée de SaaS
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div
        ref={resultRef}
        className="scroll-mt-28"
        aria-live="polite"
      >
        {result && (
          <div className="mt-12">
            <section className="relative overflow-hidden rounded-[2rem] bg-[#071426] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#6547FF]/25 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A99CFF]">
                    Idée de SaaS recommandée
                  </p>

                  <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                    {result.productName}
                  </h2>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                    {result.pitch}
                  </p>
                </div>

                <div className="flex size-28 flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                  <span className="text-3xl font-black">
                    {result.score}
                  </span>

                  <span className="mt-1 text-xs font-bold text-slate-400">
                    / 100
                  </span>
                </div>
              </div>

              <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-[#A99CFF]">
                    Client cible
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    {result.targetCustomer}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-[#A99CFF]">
                    Prix suggéré
                  </p>

                  <p className="mt-3 text-xl font-black">
                    {result.suggestedPrice}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-xs font-black uppercase tracking-wider text-[#A99CFF]">
                    Modèle économique
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    {result.businessModel}
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <ResultCard
                eyebrow="Problème"
                title="Le besoin à résoudre"
              >
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {result.problemSolved}
                </p>
              </ResultCard>

              <ResultCard
                eyebrow="Positionnement"
                title="La proposition de valeur"
              >
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {result.valueProposition}
                </p>
              </ResultCard>

              <ResultCard
                eyebrow="Adéquation"
                title="Pourquoi cette idée correspond à votre audience"
              >
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {result.whyItFitsAudience}
                </p>
              </ResultCard>

              <ResultCard
                eyebrow="MVP"
                title="Fonctionnalités à lancer en premier"
              >
                <NumberedList
                  items={result.mvpFeatures}
                />
              </ResultCard>

              <ResultCard
                eyebrow="Évolution"
                title="Fonctionnalités futures"
              >
                <NumberedList
                  items={result.futureFeatures}
                />
              </ResultCard>

              <ResultCard
                eyebrow="Lancement"
                title="Plan de validation"
              >
                <NumberedList
                  items={result.launchPlan}
                />
              </ResultCard>
            </div>

            <ResultCard
              eyebrow="Points de vigilance"
              title="Risques à vérifier avant de développer"
            >
              <NumberedList items={result.risks} />
            </ResultCard>

            <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[#F1F5FF] p-7 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
                  Vous souhaitez transformer cette idée en
                  MVP ?
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Vexly peut définir les fonctionnalités,
                  concevoir le produit et lancer votre SaaS.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#6547FF]"
              >
                Parler de mon projet
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}