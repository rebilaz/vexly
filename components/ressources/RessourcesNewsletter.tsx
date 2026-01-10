"use client";

import React from "react";

type RessourcesNewsletterProps = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmitEmail?: (email: string) => Promise<void> | void;
};

export default function RessourcesNewsletter({
  title = "Newsletter Hebdo",
  subtitle = "Rejoignez 15,000+ experts data.",
  placeholder = "votre@email.com",
  buttonLabel = "S'inscrire",
  onSubmitEmail,
}: RessourcesNewsletterProps) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState<null | "ok" | "error">(null);

  const submit = async () => {
    setDone(null);
    const v = email.trim();

    // validation minimaliste
    if (!v || !v.includes("@")) {
      setDone("error");
      return;
    }

    try {
      setLoading(true);
      await onSubmitEmail?.(v);
      setDone("ok");
      setEmail("");
    } catch {
      setDone("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-indigo-200/60 bg-indigo-50/60 p-6">
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-indigo-700">{subtitle}</p>

      <div className="mt-4 space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          inputMode="email"
          className="w-full rounded-2xl border border-indigo-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100"
        />

        <button
          type="button"
          disabled={loading}
          onClick={submit}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "..." : buttonLabel}
        </button>

        {done === "ok" && (
          <p className="text-xs text-emerald-700">
            ✅ Inscription prise en compte.
          </p>
        )}
        {done === "error" && (
          <p className="text-xs text-rose-700">
            ⚠️ Email invalide ou erreur.
          </p>
        )}
      </div>
    </div>
  );
}
