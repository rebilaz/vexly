//content/landig.ts
export const landingcontent = {
    seo: {
        title: "Agence de création de SaaS | Vexly",
        description: "Transformez votre audience en revenus récurrents en lançant votre SaaS. Vexly est votre agence de création sur-mesure. Bâtissez votre actif dès aujourd'hui."
    },
    hero: {
        eyebrow: "Vexly",
        titleline1: "L'agence de création de SaaS",
        titlehighlight: "de création de SaaS",
        description: "Monétisez votre audience en lançant votre SaaS"
    },
    projection: {
        title: "Simulez votre potentiel de revenus",
        description: "Un SaaS est le seul moyen de transformer vos abonnés en revenus réguliers. Contrairement à un placement de produit qui ne paye qu'une fois, votre SaaS vous rapporte de l'argent chaque mois de façon prévisible.",
        clients: 100,
        price: 49,
    },
    leadform: {
        placeholder: "Décrivez votre idée de SaaS en quelques lignes (audience, problème résolu,...)",
        cta: "Continuer",
        modaltitle: "Parlons de vous",
        modalsubtitle: "Laissez vos coordonnées pour que nous puissions analyser votre projet sous 24h",
        buttonlabel: "Envoyer ma demande"
    },
    problems: {
        title: "Pourquoi le contenu seul est un risque ?",
        description: "Vos vues peuvent baisser du jour au lendemain. Sécurisez votre business dès maintenant avec un SaaS qui vous appartient à 100%.",
        items: [
            {
                icon: "Ban",
                title: "Liberté Totale",
                description: "Ne dépendez plus des plateformes pour exister",
            },
            {
                icon: "TrendingDown",
                title: "Stabilisez vos revenus",
                description: "Transformez vos vues en abonnement mensuel récurrent",
            },
            {
                icon: "ShieldAlert",
                title: "Patrimoine réel",
                description: "Obtenez un actif que vous pourrez revendre. ",
            }
        ] as const,
    },
    features: {
        title: "Un Saas livré clé en main",
        description: "Nous bâtissons une infrastructure robuste et scalable. Votre plateforme est livrée prête à l'emploi, de la gestion des membres au système de paiment.",
        items: [
            { icon: "Rocket", label: "MVP optimisé pour la vente" },
            { icon: "Target", label: "Design Premium & Pro" },
            { icon: "CreditCard", label: "Paiement Stripe intégrés" },
            { icon: "Settings", label: "Console d'administration" },
            { icon: "MonitorSmartphone", label: "Accès Mobile & Ordinateur" },
            { icon: "Server", label: "Hébergement & Protection" },
        ] as const,

    },
    method: {
        title: "Votre plateforme en 21 jours",
        description: "Notre processus élimine la complexité technique pour se concentrer sur votre lancement et votre rentabilité",
        steps: [
            {
                week: "Semaine 1",
                title: "Design & UX",
                description: "Architecture des fonctionnalités et création de l'identité visuelle de votre logiciel."
            },
            {
                week: "Semaine 2",
                title: "Développement",
                description: "Codage du cœur de l'application et mise en place de la base de données sécurisée."
            },
            {
                week: "Semaine 3",
                title: "Déploiement",
                description: "Tests finaux, intégration des paiements et mise en production sur nos serveurs."
            }
        ]
    },
    faq: {
        title: "Questions fréquentes",
        items: [
            {
                q: "Je dois héberger mon site ?",
                a: "Vexly s'occupe de tout. Nous conservons la gestion du code et de l'infrastructure pour garantir la sécurité, la rapidité et les mises à jour de votre SaaS. Pour vous, c'est zéro gestion technique : vous vous concentrez uniquement sur votre audience."
            },
            {
                q: "Pourquoi choisir le sur-mesure plutôt que le No-code ?",
                a: "Le sur-mesure vous offre une liberté totale, une meilleure rapidité et des coûts d'infrastructure bien plus bas à l'échelle."
            },
            {
                q: "Combien coûte l'hébergement mensuel ?",
                a: "Nous utilisons des technologies modernes qui permettent de maintenir vos frais fixes proches de 0€ lors du lancement."
            }
        ]
    },
    finalCta: {
        title: "Prêt à générer des revenus ?",
        subtitle: "Réservez votre appel. On analyse votre audience et on définit les fonctionnalités de votre SaaS .",
        primaryCtaLabel: "Parler de mon projet"
    }
}