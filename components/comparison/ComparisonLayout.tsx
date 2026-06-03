import type { ComparisonPageContent } from "@/sanity/lib/comparisonPage";
import ComparisonHero from "./ComparisonHero";
import ComparisonOptions from "./ComparisonOptions";
import ComparisonCriteriaTable from "./ComparisonCriteriaTable";
import ComparisonExtraSections from "./ComparisonExtraSections";

export default function ComparisonLayout({
  page,
  backHref = "/articles",
}: {
  page: ComparisonPageContent;
  backHref?: string;
}) {
  return (
    <main className="min-h-screen bg-white">
      <ComparisonHero page={page} backHref={backHref} />

      <ComparisonOptions
        left={page.comparison?.left}
        right={page.comparison?.right}
      />

      <ComparisonCriteriaTable criteria={page.criteria ?? []} />

      <ComparisonExtraSections page={page} />
    </main>
  );
}