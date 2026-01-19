import React from "react";

export default function HubShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12 sm:py-14">
                {children}
            </div>
        </main>
    );
}
