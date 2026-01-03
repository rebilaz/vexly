// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact | Vexly",
    description:
        "Contactez Vexly : question, partenariat, support. Réponse sous 24–48h.",
    alternates: { canonical: "https://www.vexly.fr/contact" },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#F9FAFB] px-4 py-14 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Nous contacter
                    </h1>
                    <p className="mt-3 text-base text-slate-600">
                        Une question, une demande de partenariat, un bug à signaler ?
                        Écrivez-nous et on revient vers vous rapidement.
                    </p>
                </header>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <form className="space-y-5" action="/api/contact" method="POST">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Nom
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                    placeholder="vous@domaine.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Sujet
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                required
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                placeholder="Partenariat / Support / Question..."
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                                placeholder="Décrivez votre demande en quelques lignes…"
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                En envoyant ce formulaire, vous acceptez d’être recontacté par
                                email.{" "}
                                <Link href="/privacy" className="underline hover:text-slate-700">
                                    Politique de confidentialité
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-xs text-slate-500">
                                Réponse généralement sous 24–48h.
                            </p>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-[0.99]"
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                </section>

                <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm sm:p-8">
                    <h2 className="text-base font-bold text-slate-900">
                        Autres moyens de contact
                    </h2>

                    <div className="mt-4 grid gap-3">
                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                            <span className="font-medium">Email</span>
                            <a
                                href="mailto:contact@vexly.fr"
                                className="font-semibold text-violet-600 hover:underline"
                            >
                                contact@vexly.fr
                            </a>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                            <span className="font-medium">Partenariats</span>
                            <a
                                href="mailto:partners@vexly.fr"
                                className="font-semibold text-violet-600 hover:underline"
                            >
                                partners@vexly.fr
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
