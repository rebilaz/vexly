// app/page.tsx
import type { Metadata } from "next";
import LandingLayout from "@/components/landing/LandingLayout";
import { landingcontent } from "@/content/landing";

export const metadata: Metadata = {
  title: landingcontent.seo.title,
  description: landingcontent.seo.description,
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <main>
      <LandingLayout />
    </main>
  );
}
