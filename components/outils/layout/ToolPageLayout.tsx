import type { ToolPage } from "@/sanity/lib/outils";

import { ToolHeroSection } from "./ToolHeroSection";
import { ToolDetailsSection } from "./ToolDetailsSection";
import { ToolScenariosSection } from "./ToolScenariosSection";
import { ToolResourcesSection } from "./ToolResourcesSection";
import { ToolFinalCtaSection } from "./ToolFinalCtaSection";

type ToolPageLayoutProps = {
  tool: ToolPage;
};

export function ToolPageLayout({
  tool,
}: ToolPageLayoutProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-950">
      <ToolHeroSection tool={tool} />

      <ToolDetailsSection tool={tool} />

      <ToolScenariosSection
        section={tool.scenariosSection}
      />

      <ToolResourcesSection tool={tool} />

      <ToolFinalCtaSection cta={tool.cta} />
    </main>
  );
}