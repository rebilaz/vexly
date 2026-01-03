"use client";

import React from "react";

/** ===== Step Shell (même UX partout) ===== */
export function StepShell({
  stepLabel,
  title,
  subtitle,
  children,
  progress, // 0..100
  back,
  next,
}: {
  stepLabel?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  progress?: number; // ex: 20, 40, 60...
  back?: { label?: string; onClick: () => void };
  next?: { label?: string; onClick: () => void; disabled?: boolean };
}) {
  return (
    <section className="mx-auto max-w-[820px] px-2 py-12">
      {/* Progress only */}
      {typeof progress === "number" ? (
        <div className="mx-auto mb-12 h-[3px] w-full max-w-[420px] rounded-full bg-neutral-200">
          <div
            className="h-[3px] rounded-full bg-neutral-900 transition-all"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      ) : null}

      {/* Step label (small, above title) */}
      {stepLabel ? (
        <div className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          {stepLabel}
        </div>
      ) : null}

      {/* Big centered title (Geist) */}
      <h1
        className="text-center text-5xl font-semibold tracking-tight text-neutral-900"
        style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui" }}
      >
        {title}
      </h1>

      {/* Subtitle (below title) */}
      {subtitle ? (
        <p className="mt-4 text-center text-base text-neutral-600">
          {subtitle}
        </p>
      ) : null}

      {/* Content */}
      <div className="mt-14 space-y-8">{children}</div>

      {/* Footer nav */}
      {(back || next) && (
        <div className="mt-12 flex items-center justify-between">
          {back ? (
            <button
              type="button"
              onClick={back.onClick}
              className="rounded-md border border-neutral-900/20 px-4 py-2 text-xs font-medium text-neutral-900 hover:bg-neutral-50"
            >
              {back.label ?? "Back"}
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              type="button"
              onClick={next.onClick}
              disabled={!!next.disabled}
              className={[
                "rounded-full px-10 py-3 text-sm font-medium shadow-sm",
                next.disabled
                  ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                  : "bg-neutral-900 text-white hover:bg-neutral-800",
              ].join(" ")}
            >
              {next.label ?? "Continue"}
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}

/** ===== Form primitives ===== */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </div>
      <div className="mt-2">{children}</div>
      {hint ? <div className="mt-2 text-xs text-neutral-500">{hint}</div> : null}
    </label>
  );
}

export function UnderlineInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "w-full border-b border-neutral-200 bg-transparent py-2 text-base text-neutral-900 outline-none",
        "placeholder:text-neutral-300 focus:border-neutral-900",
        className ?? "",
      ].join(" ")}
    />
  );
}

export function MinimalTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={[
        "w-full rounded-xl border border-neutral-200 bg-white p-3 text-sm text-neutral-900 outline-none",
        "placeholder:text-neutral-300 focus:border-neutral-900",
        className ?? "",
      ].join(" ")}
    />
  );
}

export function RadioCard({
  title,
  description,
  checked,
  onClick,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative w-full rounded-xl border p-4 text-left transition",
        checked ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-400",
      ].join(" ")}
    >
      <div className="pr-8">
        <div className="text-sm font-medium text-neutral-900">{title}</div>
        {description ? (
          <div className="mt-1 text-xs leading-relaxed text-neutral-500">
            {description}
          </div>
        ) : null}
      </div>

      <div
        className={[
          "absolute right-4 top-4 h-4 w-4 rounded-full border",
          checked ? "border-neutral-900" : "border-neutral-300",
        ].join(" ")}
      >
        {checked ? (
          <div className="m-[3px] h-2 w-2 rounded-full bg-neutral-900" />
        ) : null}
      </div>
    </button>
  );
}
