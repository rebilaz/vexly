import { PricingHero } from "./PricingHero";
import { PricingPlans } from "./PricingPlans";
import { PricingFaq } from "./PricingFaq";
import TestimonialsMarquee from "./TestimonialsMarquee";
import SeoContent from "./SeoContent";
import type {
  PricingPageData,
  PricingPageTestimonials,
} from "@/sanity/lib/pricingPage";
import type { PricingHeroContent, PricingPlan } from "./pricing.types";

type PricingClientProps = {
  page?: PricingPageData | null;
};

const fallbackTestimonials: PricingPageTestimonials = {
  eyebrow: "Avis clients",
  title: "Ils ont transformé leur audience en plateforme rentable",
  items: [
    {
      name: "Thomas",
      role: "Créateur business",
      stars: 5,
      text: "Je savais que mon audience avait du potentiel, mais je ne savais pas comment en faire un vrai produit. Vexly m’a aidé à transformer mon idée en plateforme claire, propre et prête à vendre. Le plus rassurant, c’est que je n’ai pas eu à gérer la partie technique.",
    },
    {
      name: "Lina",
      role: "Créatrice formation",
      stars: 5,
      text: "J’avais déjà une communauté engagée, mais mes revenus dépendaient trop des lancements et des partenariats. Avec ma plateforme d’abonnement, j’ai enfin une offre récurrente que je peux améliorer chaque mois.",
    },
    {
      name: "Mehdi",
      role: "Coach en ligne",
      stars: 5,
      text: "Ce que j’ai apprécié, c’est qu’on ne m’a pas juste développé un outil. On m’a aidé à structurer une vraie offre autour de mon audience. En quelques semaines, j’avais une plateforme professionnelle avec paiement, espace membre et un parcours utilisateur propre.",
    },
    {
      name: "Clara",
      role: "Créatrice contenu fitness",
      stars: 5,
      text: "Je pensais qu’un SaaS était réservé aux grosses startups. Vexly m’a montré qu’on pouvait lancer une première version simple, rentable et adaptée à ma communauté. Aujourd’hui, j’ai un actif qui m’appartient vraiment.",
    },
  ],
};

export default function PricingClient({ page }: PricingClientProps) {
  const hero: PricingHeroContent = {
    title: page?.hero?.title ?? "Un MVP SaaS clair, sans choix compliqué.",
    description:
      page?.hero?.description ??
      "Une offre claire pour transformer ton idée en SaaS moderne, propre et prêt à encaisser ses premiers clients.",
  };

  const offer: PricingPlan = {
    name: page?.offer?.name ?? "Vexly Launch",
    highlight:
      page?.offer?.highlight ?? "Ton SaaS prêt à vendre en moins de 14 jours.",
    basePrice: page?.offer?.basePrice ?? 990,
    oldPrice: page?.offer?.oldPrice ?? 1490,
    priceSuffix: page?.offer?.priceSuffix ?? "/ projet",
    limitedLabel: page?.offer?.limitedLabel ?? "Places limitées",
    ctaLabel: page?.offer?.ctaLabel ?? "Lancer mon SaaS",
    ctaHref: page?.offer?.ctaHref ?? "/contact",
    features: page?.offer?.features ?? [
      "Landing page premium responsive",
      "Page tarifs optimisée conversion",
      "Authentification utilisateur",
      "Intégration Stripe",
      "Dashboard SaaS de base",
      "Design system Vexly",
      "Code source livré",
      "Mise en ligne incluse",
    ],
  };

  const testimonials =
    page?.testimonials?.items && page.testimonials.items.length > 0
      ? page.testimonials
      : fallbackTestimonials;

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFC] text-slate-950">
      <main className="relative">
        <PricingHero hero={hero} />
        <PricingPlans hero={hero} offer={offer} />
        <TestimonialsMarquee content={testimonials} />
        <PricingFaq content={page?.faq} />
        <SeoContent content={page?.seoContent} />
      </main>
    </div>
  );
}