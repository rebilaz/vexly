import  LandingLayout  from "@/components/landing/LandingLayout";

export default function EntrepreneursPage() {
  return (
    <LandingLayout
      niche="Entrepreneurs"
      heroTitle="Je construis ton SaaS ou MVP en 2 à 4 semaines — prêt à lancer."
      heroSubtitle="De l’idée au SaaS fonctionnel : Auth, Stripe, Dashboard, IA, backend, UI… tu délègues tout."
      primaryCtaLabel="Parler de mon projet"
      sections={[
        {
          title: "Arrête de rester bloqué à l’étape de l’idée",
          text:
            "Tu as une idée de SaaS, mais :\n" +
            "- tu ne sais pas par où commencer techniquement\n" +
            "- tu n’as pas le temps de tout apprendre\n" +
            "- tu as peur de choisir la mauvaise stack\n" +
            "- tu repousses le lancement depuis des mois\n\n" +
            "Je prends en charge toute la partie technique pour que tu puisses te concentrer sur le marché.",
        },
        {
          title: "Un MVP propre, prêt à être mis devant de vrais utilisateurs",
          bullets: [
            "Authentification et base de données",
            "Paiements et abonnements avec Stripe",
            "Dashboard moderne pour tes users",
            "Fonctionnalité principale opérationnelle",
            "Automatisations back-end",
            "Intégration IA (OpenAI/Claude) si besoin",
            "Code propre, prêt à scaler",
          ],
        },
        {
          title: "Un process simple, de l’idée au SaaS en ligne",
          bullets: [
            "Appel de 30 minutes pour cadrer ton SaaS",
            "Maquette rapide et validation du scope",
            "Développement (2 à 4 semaines selon le projet)",
            "Livraison, déploiement et support de démarrage",
          ],
        },
      ]}
    />
  );
}
