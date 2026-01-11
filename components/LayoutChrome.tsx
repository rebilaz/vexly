"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMindmap = pathname?.startsWith("/saas/seo-mindmap");

    React.useEffect(() => {
        if (!isMindmap) return;

        const prevHtml = document.documentElement.style.overflow;
        const prevBody = document.body.style.overflow;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = prevHtml;
            document.body.style.overflow = prevBody;
        };
    }, [isMindmap]);

    if (isMindmap) {
        return <div className="h-[100dvh] w-[100vw] overflow-hidden bg-slate-50">{children}</div>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
