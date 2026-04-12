// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import LayoutChrome from "@/components/LayoutChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vexly.fr"), 
  title: "Systèmes & Dashboards",
  description:
    "Je connecte tes outils, j’automatise tes process et je crée des dashboards pour piloter ton entreprise simplement.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${GeistSans.variable} font-sans min-h-screen bg-white text-slate-900`}
      >
        {/* ✅ Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KN4N4JCC');
          `}
        </Script>

        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KN4N4JCC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ✅ WRAPPER CONDITIONNEL (Header/Footer cachés sur /saas/seo-mindmap) */}
        <LayoutChrome>
          {children}
        </LayoutChrome>
      </body>
    </html>
  );
}
