// components/landing/LandingLayout.tsx

import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import FinalCTASection from "./FinalCTASection";
import RevenueProjectionSection from "./RevenueProjectionSection";
import ExecutionMethodSection from "./ExecutionMethodSection";
import MiniLeadForm from "@/components/Form/Form"
import { landingcontent } from "@/content/landing";
import ProblemsSection from "./ProblemsSection";
import FAQSection from "./FAQSection";

export default function LandingLayout() {

  const {
    eyebrow,
    titleline1, titlehighlight,
    description: desc1
  } = landingcontent.hero;

  const {
    title: title3,
    description: desc3,
    clients,
    price,
  } = landingcontent.projection

  const mrr = clients * price;

  const {
    title: title4,
    description: desc4,
    items: items2
  } = landingcontent.problems

  const {
    title: title2,
    description: desc2,
    items
  } = landingcontent.features

  const {
    title: title5,
    description: desc5,
    steps,
  } = landingcontent.method;

  const {
    title: faqTitle,
    items: faqItems,
  } = landingcontent.faq;

  const {
    title: title6,
    subtitle: subtitle6,
    primaryCtaLabel,
  } = landingcontent.finalCta;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">

      <HeroSection
        eyebrow={eyebrow}
        titleline1={titleline1}
        titlehighlight={titlehighlight}
        description={desc1}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 space-y-16 sm:py-24 sm:space-y-24 lg:px-8 lg:space-y-32">
        <RevenueProjectionSection
          title={title3}
          description={desc3}
          clients={clients}
          pricePerMonth={price}
          mrr={mrr}
        />

        <MiniLeadForm />

        <ProblemsSection
          title={title4}
          description={desc4}
          items={items2}
        />

        <FeaturesSection
          title={title2}
          description={desc2}
          items={items}
        />

        <ExecutionMethodSection
          title={title5}
          description={desc5}
          steps={steps}
        />

        <FAQSection
          title={faqTitle}
          items={faqItems}
        />

        <FinalCTASection
          title={title6}
          subtitle={subtitle6}
          primaryCtaLabel={primaryCtaLabel}
        />
      </div>
    </div>
  );
}