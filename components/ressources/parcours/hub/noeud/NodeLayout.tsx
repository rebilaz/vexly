import React from "react";

export default function NodeLayout({
    hero,
    children,
}: {
    hero?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* ===== HERO FULL WIDTH ===== */}
            {hero && (
                <section className="relative w-full bg-slate-50/60 border-b border-slate-200">
                    <div className="mx-auto max-w-7xl px-6 sm:px-10 py-4 sm:py-6">
                        {hero}
                    </div>
                </section>

            )}

            {/* ===== CONTENT ===== */}
            <section className="mx-auto max-w-3xl px-6 sm:px-8 py-14 sm:py-16">
                {children}
            </section>
        </main>
    );
}
