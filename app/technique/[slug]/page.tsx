import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  Check,
  CheckCircle2,
  Code2,
  CreditCard,
  Database,
  FileText,
  Gauge,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  MousePointerClick,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";

const TECHNIQUES = {
  "react": {
    "name": "React",
    "mark": "Re",
    "kind": "Interfaces SaaS",
    "seoTitle": "Agence React pour SaaS de créateurs | Vexly",
    "seoDescription": "Vexly conçoit des interfaces React rapides, intuitives et évolutives pour les SaaS, plateformes d’abonnement et espaces membres.",
    "titleStart": "Des interfaces SaaS rapides et intuitives qui",
    "titleAccent": "évoluent avec votre audience.",
    "intro": "Vexly utilise React pour construire des espaces membres, dashboards et outils métier fluides, cohérents et simples à enrichir.",
    "promise": "Une interface utile. Une base propre. Un produit prêt à vendre.",
    "overviewTitle": "React transforme un produit complexe en parcours simples.",
    "overview": [
      "Les composants réutilisables permettent d’organiser les offres, formulaires, dashboards, contenus et fonctionnalités IA sans perdre la cohérence de l’expérience.",
      "Chez Vexly, React sert à lancer vite puis à faire évoluer le produit sans reconstruire chaque écran à chaque nouvelle idée."
    ],
    "reasonsTitle": "4 raisons d’utiliser React dans votre SaaS.",
    "reasons": [
      {
        "title": "Passer rapidement de l’idée au produit",
        "text": "Les composants réutilisables accélèrent le MVP et réduisent le travail à refaire pendant les itérations."
      },
      {
        "title": "Créer une expérience qui convertit",
        "text": "Interactions instantanées, formulaires clairs et parcours lisibles guident l’utilisateur vers l’action utile."
      },
      {
        "title": "Faire évoluer le SaaS sans tout reconstruire",
        "text": "Une architecture structurée facilite l’ajout de rôles, d’offres, d’outils et de nouveaux parcours."
      },
      {
        "title": "Préparer le web et le mobile",
        "text": "La logique d’interface peut servir le web aujourd’hui et une expérience mobile lorsque l’usage le justifie."
      }
    ],
    "proofTitle": "Une interface utile dès la première version.",
    "proofText": "Nous commençons par les parcours qui comptent : comprendre l’offre, créer son compte, payer, accéder au contenu et obtenir rapidement la valeur promise.",
    "proofTags": [
      "Composants",
      "Interactions",
      "Responsive",
      "Évolutivité"
    ],
    "projects": [
      {
        "type": "Plateforme d’abonnement",
        "title": "Un espace premium pour vendre des contenus exclusifs",
        "text": "Catalogue privé, progression, favoris et gestion des accès dans une interface rapide.",
        "tags": [
          "React",
          "Next.js",
          "Stripe"
        ],
        "visual": "member"
      },
      {
        "type": "Dashboard SaaS",
        "title": "Un cockpit simple pour piloter les revenus récurrents",
        "text": "MRR, abonnements et rétention réunis dans un tableau de bord lisible.",
        "tags": [
          "React",
          "Analytics",
          "Charts"
        ],
        "visual": "chart"
      },
      {
        "type": "Produit avec IA",
        "title": "Un assistant intégré naturellement au parcours",
        "text": "Une expérience conversationnelle avec sources, historique et actions contextuelles.",
        "tags": [
          "React",
          "OpenAI",
          "RAG"
        ],
        "visual": "chat"
      }
    ],
    "experts": [
      {
        "role": "Vision technique",
        "title": "Une base propre simplifie les prochaines décisions.",
        "text": "Nous privilégions des composants lisibles, des données bien typées et une architecture compréhensible quand le produit grandit."
      },
      {
        "role": "Vision produit",
        "title": "Chaque écran doit aider l’utilisateur à obtenir un résultat.",
        "text": "Nous réduisons la friction et construisons les parcours autour de la valeur délivrée, pas autour d’une liste de fonctionnalités."
      }
    ],
    "related": [
      "nextjs",
      "supabase",
      "stripe",
      "sanity"
    ],
    "useCases": [
      {
        "title": "Plateforme d’abonnement",
        "text": "Offres, accès privés, contenus exclusifs et communauté."
      },
      {
        "title": "Dashboard métier",
        "text": "Indicateurs, filtres, rôles et actions opérationnelles."
      },
      {
        "title": "SaaS avec IA",
        "text": "Chat, génération et recherche sémantique intégrés au parcours."
      },
      {
        "title": "Outil interne",
        "text": "Automatisation, validation et suivi des opérations."
      }
    ],
    "faqs": [
      {
        "q": "Pourquoi React est-il adapté à un SaaS pour créateurs ?",
        "a": "React permet de composer l’interface à partir de blocs réutilisables et de garder une expérience cohérente lorsque le produit s’enrichit."
      },
      {
        "q": "React suffit-il pour construire toute la plateforme ?",
        "a": "React gère principalement l’interface. Vexly l’associe généralement à Next.js, Supabase, Stripe et Sanity selon les besoins."
      },
      {
        "q": "Pouvez-vous reprendre une application React existante ?",
        "a": "Oui. Nous auditons le code, les dépendances, la performance et les parcours critiques avant de proposer un plan priorisé."
      },
      {
        "q": "Comment gérez-vous la performance ?",
        "a": "Nous travaillons le chargement des données, la taille des composants, les images, le cache et le suivi réel après la mise en ligne."
      },
      {
        "q": "Le produit pourra-t-il évoluer après le lancement ?",
        "a": "Oui. Le socle est structuré pour ajouter progressivement des fonctionnalités, des rôles et des automatisations."
      },
      {
        "q": "Proposez-vous la maintenance ?",
        "a": "Oui. Vexly peut suivre les erreurs, mettre à jour le produit et développer les évolutions utiles après le lancement."
      }
    ],
    "ctaTitle": "Prêt à transformer votre idée en interface React utile ?",
    "ctaText": "Présentez-nous votre audience, votre offre et le résultat attendu. Nous vous aiderons à définir la première version.",
    "colors": {
      "primary": "#6366F1",
      "secondary": "#8B5CF6",
      "soft": "#EEF2FF",
      "glow": "rgba(99,102,241,.24)"
    }
  },
  "nextjs": {
    "name": "Next.js",
    "mark": "N",
    "kind": "Application & SEO",
    "seoTitle": "Agence Next.js pour SaaS de créateurs | Vexly",
    "seoDescription": "Vexly développe des SaaS Next.js rapides, indexables et évolutifs pour les créateurs et les business par abonnement.",
    "titleStart": "Un SaaS rapide, indexable et structuré pour",
    "titleAccent": "grandir sans ralentir.",
    "intro": "Next.js réunit les pages d’acquisition, l’espace membre et les fonctionnalités métier dans une seule application performante.",
    "promise": "Le marketing, le produit et la performance dans un même socle.",
    "overviewTitle": "Next.js relie votre site d’acquisition à votre produit.",
    "overview": [
      "Les pages publiques peuvent être rapides et indexables tandis que les parcours privés gèrent connexion, dashboard, abonnements et contenus.",
      "Vexly l’utilise pour éviter les silos entre site vitrine, espace membre et back-office, tout en gardant un déploiement simple."
    ],
    "reasonsTitle": "4 raisons de choisir Next.js pour votre SaaS.",
    "reasons": [
      {
        "title": "Construire des pages réellement indexables",
        "text": "Le rendu serveur et la génération de pages facilitent la découverte des contenus publics par les moteurs."
      },
      {
        "title": "Accélérer le chargement perçu",
        "text": "Navigation optimisée, images adaptées et cache offrent une expérience rapide sur mobile comme sur ordinateur."
      },
      {
        "title": "Réunir le site et l’application",
        "text": "Pages marketing, espace membre et fonctionnalités SaaS partagent les mêmes composants et la même logique."
      },
      {
        "title": "Déployer et itérer simplement",
        "text": "Les nouvelles versions sont livrées rapidement avec prévisualisation, suivi des erreurs et retour arrière."
      }
    ],
    "proofTitle": "Une architecture pensée pour l’acquisition et l’usage.",
    "proofText": "Une page éditoriale, un outil gratuit et un dashboard privé peuvent vivre dans le même projet sans multiplier les couches techniques.",
    "proofTags": [
      "SEO technique",
      "Rendu serveur",
      "Routes privées",
      "Déploiement continu"
    ],
    "projects": [
      {
        "type": "Acquisition + SaaS",
        "title": "Un site éditorial qui mène directement vers le produit",
        "text": "Pages SEO, outils gratuits et espace membre partagent une navigation cohérente.",
        "tags": [
          "Next.js",
          "SEO",
          "Sanity"
        ],
        "visual": "editor"
      },
      {
        "type": "Plateforme premium",
        "title": "Des contenus publics et privés dans la même application",
        "text": "Le visiteur découvre l’expertise, s’abonne puis accède immédiatement aux contenus.",
        "tags": [
          "Next.js",
          "Stripe",
          "Auth"
        ],
        "visual": "member"
      },
      {
        "type": "Dashboard",
        "title": "Une application métier rapide sur toutes les routes",
        "text": "Données, filtres et actions sont organisés pour réduire le temps passé dans l’outil.",
        "tags": [
          "Next.js",
          "Supabase",
          "Cache"
        ],
        "visual": "chart"
      }
    ],
    "experts": [
      {
        "role": "Vision technique",
        "title": "Une seule application, plusieurs modes de rendu.",
        "text": "Nous utilisons le bon rendu pour chaque page : statique, serveur ou interactif, sans complexité gratuite."
      },
      {
        "role": "Vision acquisition",
        "title": "La performance technique doit soutenir la conversion.",
        "text": "Une page rapide attire l’utilisateur. Une transition fluide vers le produit conserve son intention."
      }
    ],
    "related": [
      "react",
      "supabase",
      "sanity",
      "stripe"
    ],
    "useCases": [
      {
        "title": "Site SEO + SaaS",
        "text": "Pages éditoriales, comparateurs et espace connecté dans un seul projet."
      },
      {
        "title": "Espace membre",
        "text": "Connexion, contenus privés, progression et règles d’accès."
      },
      {
        "title": "Abonnement",
        "text": "Présentation des offres, paiement et activation immédiate."
      },
      {
        "title": "Application métier",
        "text": "Dashboard, actions serveur, données et historique."
      }
    ],
    "faqs": [
      {
        "q": "Quelle différence entre React et Next.js ?",
        "a": "React construit l’interface. Next.js ajoute le routage, le rendu serveur, la structure d’application et des fonctions serveur."
      },
      {
        "q": "Next.js améliore-t-il le SEO ?",
        "a": "Il facilite la production de pages rapides et accessibles aux moteurs, mais le contenu, le maillage et les métadonnées restent essentiels."
      },
      {
        "q": "Peut-on construire un espace membre avec Next.js ?",
        "a": "Oui. Next.js peut gérer les routes privées, les sessions et les permissions avec un service comme Supabase."
      },
      {
        "q": "Next.js convient-il à un MVP ?",
        "a": "Oui, en restant concentré sur les parcours essentiels et en ajoutant les fonctions progressivement."
      },
      {
        "q": "Pouvez-vous migrer un site existant ?",
        "a": "Oui. La migration est planifiée pour préserver les URLs, le référencement et les données importantes."
      },
      {
        "q": "Vexly gère-t-il le déploiement ?",
        "a": "Oui. Nous préparons les environnements, les variables, le suivi des erreurs et le processus de production."
      }
    ],
    "ctaTitle": "Construisons un SaaS Next.js rapide dès la première page.",
    "ctaText": "Nous cadrons les parcours publics et privés puis développons une première version prête à accueillir vos utilisateurs.",
    "colors": {
      "primary": "#111827",
      "secondary": "#6366F1",
      "soft": "#F1F5F9",
      "glow": "rgba(99,102,241,.22)"
    }
  },
  "stripe": {
    "name": "Stripe",
    "mark": "S",
    "kind": "Paiement & abonnements",
    "seoTitle": "Intégration Stripe pour SaaS de créateurs | Vexly",
    "seoDescription": "Vexly intègre Stripe aux SaaS et plateformes d’abonnement : paiements, abonnements, facturation, webhooks et accès membres.",
    "titleStart": "Transformez votre audience en revenus récurrents avec",
    "titleAccent": "un paiement sans friction.",
    "intro": "Vexly relie Stripe aux offres, aux abonnements, aux factures et aux droits d’accès dans un parcours clair et rassurant.",
    "promise": "Une offre comprise. Un paiement fluide. Un accès immédiat.",
    "overviewTitle": "Stripe devient le moteur de votre modèle d’abonnement.",
    "overview": [
      "Une intégration fiable relie le paiement, le statut de l’abonnement, les webhooks, les factures et les permissions de chaque membre.",
      "Vexly traite cette logique comme une partie du produit afin de garder des accès cohérents même lorsqu’un paiement échoue ou qu’une offre change."
    ],
    "reasonsTitle": "4 raisons de structurer sérieusement votre intégration Stripe.",
    "reasons": [
      {
        "title": "Réduire la friction au moment décisif",
        "text": "Un parcours court, des offres lisibles et des messages précis évitent les abandons avant le paiement."
      },
      {
        "title": "Automatiser les droits après chaque événement",
        "text": "Les webhooks synchronisent paiement, abonnement, accès membre, relance et historique."
      },
      {
        "title": "Centraliser factures et gestion de l’abonnement",
        "text": "Le membre retrouve ses documents, modifie sa carte ou gère son offre dans un portail clair."
      },
      {
        "title": "Sécuriser la logique de revenus",
        "text": "Les statuts, signatures, reprises et cas d’échec sont traités explicitement."
      }
    ],
    "proofTitle": "La monétisation ne doit pas dépendre de manipulations manuelles.",
    "proofText": "Une intégration Stripe bien pensée automatise le passage de visiteur à membre puis accompagne tout le cycle de vie de l’abonnement.",
    "proofTags": [
      "Checkout",
      "Abonnements",
      "Webhooks",
      "Facturation"
    ],
    "projects": [
      {
        "type": "Abonnement premium",
        "title": "Un checkout clair pour convertir sans détour",
        "text": "Choix de l’offre, paiement sécurisé, confirmation et activation immédiate.",
        "tags": [
          "Checkout",
          "Coupons",
          "Taxes"
        ],
        "visual": "checkout"
      },
      {
        "type": "Gestion membre",
        "title": "Un espace autonome pour gérer l’abonnement",
        "text": "Factures, changement de carte, nouvelle offre et résiliation sans ticket support.",
        "tags": [
          "Customer Portal",
          "Factures",
          "Plans"
        ],
        "visual": "member"
      },
      {
        "type": "Pilotage revenus",
        "title": "Des statuts de paiement visibles dans le dashboard",
        "text": "L’équipe suit les actifs, les échecs et les changements de formule.",
        "tags": [
          "Webhooks",
          "MRR",
          "Alertes"
        ],
        "visual": "chart"
      }
    ],
    "experts": [
      {
        "role": "Vision technique",
        "title": "Le webhook est une source de vérité, pas un détail.",
        "text": "Chaque événement utile est vérifié, enregistré et traité de manière idempotente."
      },
      {
        "role": "Vision conversion",
        "title": "Le paiement commence avant le formulaire bancaire.",
        "text": "La clarté de l’offre et la continuité visuelle influencent autant la conversion que la technologie."
      }
    ],
    "related": [
      "nextjs",
      "supabase",
      "react",
      "sanity"
    ],
    "useCases": [
      {
        "title": "Abonnement mensuel ou annuel",
        "text": "Essais, coupons, changements d’offre et renouvellements."
      },
      {
        "title": "Paiement unique",
        "text": "Formation, audit, ressource premium ou accès à vie."
      },
      {
        "title": "Offre par communauté",
        "text": "Tarifs et avantages différents selon le niveau d’adhésion."
      },
      {
        "title": "Facturation à l’usage",
        "text": "Crédits, volume consommé ou fonctionnalités activées."
      }
    ],
    "faqs": [
      {
        "q": "Stripe peut-il gérer des abonnements mensuels et annuels ?",
        "a": "Oui. Stripe gère plusieurs prix, périodicités, essais, coupons et changements d’offre."
      },
      {
        "q": "Comment les accès sont-ils activés après le paiement ?",
        "a": "Les événements Stripe sont vérifiés côté serveur puis les permissions sont mises à jour selon l’offre active."
      },
      {
        "q": "Que se passe-t-il lorsqu’un paiement échoue ?",
        "a": "Le produit peut afficher un état adapté, demander une nouvelle carte et appliquer les règles définies."
      },
      {
        "q": "Peut-on proposer des coupons ou un essai gratuit ?",
        "a": "Oui. Ils peuvent être configurés dans Stripe puis présentés clairement dans le parcours."
      },
      {
        "q": "Les membres peuvent-ils télécharger leurs factures ?",
        "a": "Oui. Le portail client permet de retrouver les factures et les moyens de paiement."
      },
      {
        "q": "Pouvez-vous reprendre une intégration existante ?",
        "a": "Oui. Nous auditons les produits, prix, webhooks, statuts et règles d’accès."
      }
    ],
    "ctaTitle": "Construisons un parcours d’abonnement simple à acheter et à gérer.",
    "ctaText": "Vexly peut cadrer vos offres, intégrer Stripe et relier chaque événement de paiement aux bons accès.",
    "colors": {
      "primary": "#635BFF",
      "secondary": "#8B5CF6",
      "soft": "#EEF2FF",
      "glow": "rgba(99,91,255,.25)"
    }
  },
  "supabase": {
    "name": "Supabase",
    "mark": "Su",
    "kind": "Données & authentification",
    "seoTitle": "Agence Supabase pour SaaS de créateurs | Vexly",
    "seoDescription": "Vexly construit des backends Supabase : authentification, PostgreSQL, stockage, permissions et fonctions serveur.",
    "titleStart": "Une base solide pour vos membres, vos données et",
    "titleAccent": "les prochaines évolutions.",
    "intro": "Vexly utilise Supabase pour gérer l’authentification, les données, les fichiers et les permissions dans une architecture claire.",
    "promise": "Des données structurées. Des accès maîtrisés. Un produit évolutif.",
    "overviewTitle": "Supabase réunit les fondations essentielles du SaaS.",
    "overview": [
      "Un espace membre doit stocker les profils, relier les abonnements, protéger les données, gérer les rôles et conserver un historique fiable.",
      "Supabase fournit PostgreSQL, authentification, stockage et politiques d’accès. Vexly structure ces briques autour du produit réel."
    ],
    "reasonsTitle": "4 raisons d’utiliser Supabase comme backend.",
    "reasons": [
      {
        "title": "Gérer l’authentification et les comptes",
        "text": "Inscription, connexion, récupération et sessions sont intégrées au parcours membre."
      },
      {
        "title": "S’appuyer sur une vraie base PostgreSQL",
        "text": "Les données restent relationnelles, interrogeables et structurées pour accompagner le produit."
      },
      {
        "title": "Appliquer des permissions au niveau des données",
        "text": "Les politiques d’accès limitent ce que chaque utilisateur peut lire ou modifier."
      },
      {
        "title": "Automatiser les traitements côté serveur",
        "text": "Fonctions, webhooks et tâches planifiées exécutent les actions sensibles hors de l’interface."
      }
    ],
    "proofTitle": "Les données doivent suivre les règles du produit.",
    "proofText": "Profils, abonnements, contenus, progressions et événements sont centralisés sans transformer chaque évolution en chantier.",
    "proofTags": [
      "PostgreSQL",
      "Auth",
      "Row Level Security",
      "Storage"
    ],
    "projects": [
      {
        "type": "Espace membre",
        "title": "Des comptes et permissions reliés à l’abonnement",
        "text": "Chaque membre retrouve ses contenus, sa progression et ses droits.",
        "tags": [
          "Auth",
          "RLS",
          "Stripe"
        ],
        "visual": "member"
      },
      {
        "type": "Application métier",
        "title": "Une base relationnelle pour organiser les opérations",
        "text": "Clients, tâches, documents et historiques alimentent un dashboard fiable.",
        "tags": [
          "PostgreSQL",
          "Realtime",
          "Exports"
        ],
        "visual": "database"
      },
      {
        "type": "Produit IA",
        "title": "Des conversations et sources conservées proprement",
        "text": "Historique, documents, embeddings et quotas sont structurés.",
        "tags": [
          "Vector",
          "Storage",
          "OpenAI"
        ],
        "visual": "chat"
      }
    ],
    "experts": [
      {
        "role": "Vision données",
        "title": "Le schéma doit refléter le produit, pas l’écran du moment.",
        "text": "Nous modélisons les relations, les statuts et l’historique pour éviter les duplications."
      },
      {
        "role": "Vision sécurité",
        "title": "Les droits sont appliqués au plus près des données.",
        "text": "Les politiques d’accès complètent les contrôles de l’application et limitent les erreurs."
      }
    ],
    "related": [
      "nextjs",
      "react",
      "stripe",
      "sanity"
    ],
    "useCases": [
      {
        "title": "Comptes membres",
        "text": "Authentification, rôles, préférences et progression."
      },
      {
        "title": "Données métier",
        "text": "Clients, produits, ressources et événements spécifiques."
      },
      {
        "title": "Fichiers privés",
        "text": "Documents et ressources accessibles selon les permissions."
      },
      {
        "title": "Temps réel",
        "text": "Notifications, présence et mises à jour collaboratives."
      }
    ],
    "faqs": [
      {
        "q": "Supabase remplace-t-il un backend classique ?",
        "a": "Il fournit base, authentification, stockage, fonctions et API. Les règles métier spécifiques restent développées côté serveur."
      },
      {
        "q": "Les données sont-elles sécurisées ?",
        "a": "La sécurité dépend de la configuration. Vexly utilise RLS, contrôles serveur et séparation des clés."
      },
      {
        "q": "Supabase peut-il être relié à Stripe ?",
        "a": "Oui. Les événements Stripe mettent à jour les abonnements et les droits dans Supabase."
      },
      {
        "q": "Peut-on stocker des fichiers privés ?",
        "a": "Oui. Supabase Storage permet de contrôler l’accès aux fichiers selon les utilisateurs et les rôles."
      },
      {
        "q": "Supabase convient-il à un MVP ?",
        "a": "Oui, à condition de concevoir correctement le schéma et les permissions dès le départ."
      },
      {
        "q": "Pouvez-vous reprendre une base existante ?",
        "a": "Oui. Nous auditons le schéma, les migrations, les politiques, les fonctions et les clés."
      }
    ],
    "ctaTitle": "Posons une base Supabase claire avant d’ajouter les fonctionnalités.",
    "ctaText": "Nous structurons vos utilisateurs, vos données et vos permissions pour lancer une première version fiable.",
    "colors": {
      "primary": "#10B981",
      "secondary": "#22C55E",
      "soft": "#ECFDF5",
      "glow": "rgba(16,185,129,.24)"
    }
  },
  "sanity": {
    "name": "Sanity",
    "mark": "Sa",
    "kind": "Contenu & CMS",
    "seoTitle": "Agence Sanity CMS pour SaaS de créateurs | Vexly",
    "seoDescription": "Vexly intègre Sanity aux plateformes de créateurs : pages SEO, contenus premium, formations et back-office sur mesure.",
    "titleStart": "Publiez vos contenus sans dépendre du code ni",
    "titleAccent": "sacrifier votre produit.",
    "intro": "Vexly utilise Sanity pour créer un back-office éditorial adapté aux pages, formations et contenus premium.",
    "promise": "Un contenu simple à gérer. Une expérience libre côté utilisateur.",
    "overviewTitle": "Sanity sépare la gestion du contenu de sa présentation.",
    "overview": [
      "Un créateur doit pouvoir modifier une page, publier une leçon ou organiser une ressource sans demander une mise à jour technique.",
      "Vexly configure les types de contenus, validations, relations, rôles et prévisualisations autour de votre façon de publier."
    ],
    "reasonsTitle": "4 raisons d’utiliser Sanity dans votre plateforme.",
    "reasons": [
      {
        "title": "Créer un back-office adapté à vos contenus",
        "text": "Les champs et les écrans correspondent à votre manière de publier."
      },
      {
        "title": "Réutiliser les mêmes blocs partout",
        "text": "Témoignages, offres, auteurs et ressources sont partagés sans duplication."
      },
      {
        "title": "Structurer les pages pour le référencement",
        "text": "Titres, métadonnées, liens et contenus associés sont gérés explicitement."
      },
      {
        "title": "Distribuer le contenu sur plusieurs interfaces",
        "text": "Le même contenu alimente le site, l’espace membre ou une future application."
      }
    ],
    "proofTitle": "Le back-office doit suivre votre logique éditoriale.",
    "proofText": "Sanity structure les contenus sans imposer leur apparence, ce qui préserve toute la liberté de l’expérience Vexly.",
    "proofTags": [
      "Contenu structuré",
      "Preview",
      "Rôles",
      "API flexible"
    ],
    "projects": [
      {
        "type": "Site éditorial",
        "title": "Des pages SEO composées sans toucher au code",
        "text": "Blocs, auteurs, FAQ, liens internes et métadonnées sont organisés dans un studio clair.",
        "tags": [
          "Sanity",
          "Next.js",
          "SEO"
        ],
        "visual": "editor"
      },
      {
        "type": "Formation premium",
        "title": "Une bibliothèque de modules et de leçons structurées",
        "text": "Les contenus sont organisés, reliés aux offres et affichés selon les droits.",
        "tags": [
          "Cours",
          "Progression",
          "Accès"
        ],
        "visual": "member"
      },
      {
        "type": "Base IA",
        "title": "Des sources éditoriales prêtes à alimenter un assistant",
        "text": "Articles, guides et ressources sont synchronisés vers une recherche sémantique.",
        "tags": [
          "RAG",
          "OpenAI",
          "Sources"
        ],
        "visual": "chat"
      }
    ],
    "experts": [
      {
        "role": "Vision éditoriale",
        "title": "Le back-office doit parler le langage de l’équipe.",
        "text": "Nous concevons des types de contenus et validations qui réduisent les hésitations au moment de publier."
      },
      {
        "role": "Vision produit",
        "title": "Le contenu devient une brique réutilisable du SaaS.",
        "text": "Une ressource structurée peut apparaître dans une page SEO, un espace membre ou une réponse IA."
      }
    ],
    "related": [
      "nextjs",
      "react",
      "supabase",
      "stripe"
    ],
    "useCases": [
      {
        "title": "Pages SEO",
        "text": "Articles, guides, comparatifs, FAQ et maillage interne."
      },
      {
        "title": "Contenus membres",
        "text": "Modules, leçons, ressources et collections premium."
      },
      {
        "title": "Base de connaissances IA",
        "text": "Sources structurées pour la recherche et les réponses contextualisées."
      },
      {
        "title": "Landing pages",
        "text": "Sections réutilisables pour lancer des offres sans sacrifier le design."
      }
    ],
    "faqs": [
      {
        "q": "Quelle différence entre Sanity et un CMS classique ?",
        "a": "Sanity stocke le contenu de façon structurée et laisse le front-end libre. Le studio peut être personnalisé selon le projet."
      },
      {
        "q": "Sanity permet-il de gérer des pages SEO ?",
        "a": "Oui. Métadonnées, slugs, contenus, liens et données structurées peuvent être administrés dans des champs dédiés."
      },
      {
        "q": "Peut-on gérer des contenus privés ?",
        "a": "Oui. Sanity gère le contenu tandis que l’application contrôle l’accès selon la session ou l’abonnement."
      },
      {
        "q": "Les éditeurs peuvent-ils prévisualiser ?",
        "a": "Oui. Une prévisualisation peut afficher le contenu brouillon dans le rendu réel avant publication."
      },
      {
        "q": "Sanity peut-il alimenter un assistant IA ?",
        "a": "Oui. Les contenus peuvent être indexés et utilisés comme sources dans une recherche sémantique ou un système RAG."
      },
      {
        "q": "Pouvez-vous migrer des contenus existants ?",
        "a": "Oui. Nous définissons le modèle, nettoyons les données puis importons les contenus en conservant les URLs utiles."
      }
    ],
    "ctaTitle": "Créons un back-office Sanity que votre équipe aura envie d’utiliser.",
    "ctaText": "Nous structurons vos pages, formations et ressources afin de publier plus vite sans limiter l’expérience.",
    "colors": {
      "primary": "#F43F5E",
      "secondary": "#F97316",
      "soft": "#FFF1F2",
      "glow": "rgba(244,63,94,.22)"
    }
  }
} as const;

type TechniqueSlug = keyof typeof TECHNIQUES;
type Technique = (typeof TECHNIQUES)[TechniqueSlug];
type Visual = Technique["projects"][number]["visual"];

const REASON_ICONS = [Rocket, MousePointerClick, Layers3, ShieldCheck] as const;
const USE_CASE_ICONS = [UsersRound, Gauge, WandSparkles, Workflow] as const;

export function generateStaticParams() {
  return (Object.keys(TECHNIQUES) as TechniqueSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const technique = TECHNIQUES[slug as TechniqueSlug];

  if (!technique) {
    return {
      title: "Technique introuvable | Vexly",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: technique.seoTitle,
    description: technique.seoDescription,
    alternates: { canonical: `/technique/${slug}` },
    openGraph: {
      title: technique.seoTitle,
      description: technique.seoDescription,
      type: "website",
      url: `/technique/${slug}`,
    },
  };
}

function ArrowIcon() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
    />
  );
}

function TechMark({
  technique,
  compact = false,
}: {
  technique: Technique;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center text-white shadow-[0_25px_70px_rgba(15,23,42,.22)] ${
        compact ? "size-12 rounded-2xl" : "size-36 rounded-[2.5rem]"
      }`}
      style={{
        background: `linear-gradient(135deg, ${technique.colors.primary}, ${technique.colors.secondary})`,
      }}
      aria-label={technique.name}
    >
      <span
        className={
          compact
            ? "text-base font-black tracking-[-0.08em]"
            : "text-4xl font-black tracking-[-0.08em]"
        }
      >
        {technique.mark}
      </span>
    </div>
  );
}

function HeroVisual({ technique }: { technique: Technique }) {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
      <div className="absolute inset-[5%] rounded-full border border-indigo-200/70" />
      <div className="absolute inset-[16%] rounded-full border border-violet-200/70" />
      <div className="absolute inset-[27%] rounded-full border border-indigo-300/60" />

      <div className="absolute left-[6%] top-[25%] flex size-14 rotate-[-8deg] items-center justify-center rounded-2xl border border-white bg-white text-indigo-600 shadow-[0_18px_45px_rgba(79,70,229,.15)]">
        <Code2 className="size-6" aria-hidden="true" />
      </div>
      <div className="absolute right-[7%] top-[17%] flex size-16 rotate-[8deg] items-center justify-center rounded-2xl border border-white bg-white text-violet-600 shadow-[0_18px_45px_rgba(79,70,229,.15)]">
        <Zap className="size-7" aria-hidden="true" />
      </div>
      <div className="absolute bottom-[10%] left-[17%] flex size-16 rotate-[7deg] items-center justify-center rounded-2xl border border-white bg-white text-emerald-600 shadow-[0_18px_45px_rgba(79,70,229,.15)]">
        <Gauge className="size-7" aria-hidden="true" />
      </div>
      <div className="absolute bottom-[8%] right-[16%] flex size-14 rotate-[-6deg] items-center justify-center rounded-2xl border border-white bg-white text-rose-500 shadow-[0_18px_45px_rgba(79,70,229,.15)]">
        <Sparkles className="size-6" aria-hidden="true" />
      </div>

      <div
        className="relative flex size-[48%] items-center justify-center rounded-[2.8rem] border border-white/80 bg-white/[0.85] shadow-[0_35px_100px_rgba(79,70,229,.2)] backdrop-blur"
        style={{ boxShadow: `0 35px 100px ${technique.colors.glow}` }}
      >
        <div
          className="absolute inset-5 rounded-[2rem]"
          style={{
            background: `linear-gradient(135deg, ${technique.colors.soft}, #fff 58%, #f5f3ff)`,
          }}
        />
        <div
          className="absolute inset-16 rounded-full blur-2xl"
          style={{ backgroundColor: technique.colors.glow }}
        />
        <div className="relative">
          <TechMark technique={technique} />
        </div>
      </div>
    </div>
  );
}

function BrowserShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.65rem] border border-white/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,.25)]">
      <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
        <span className="size-2.5 rounded-full bg-rose-300" />
        <span className="size-2.5 rounded-full bg-amber-300" />
        <span className="size-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 h-4 flex-1 rounded-full border border-slate-200 bg-white" />
      </div>
      {children}
    </div>
  );
}

function MemberVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[290px] grid-cols-[84px_1fr] bg-slate-50 sm:grid-cols-[126px_1fr]">
        <aside className="bg-[#071a33] p-4">
          <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500" />
          <div className="mt-8 space-y-3">
            {[72, 54, 80, 46].map((width, index) => (
              <div
                key={width}
                className={`rounded-lg p-2.5 ${
                  index === 0 ? "bg-white/[0.1]" : "bg-white/[0.03]"
                }`}
              >
                <div
                  className="h-2 rounded-full bg-white/[0.3]"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </aside>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 w-20 rounded-full bg-slate-300" />
              <div className="mt-3 h-6 w-36 rounded-lg bg-slate-900" />
            </div>
            <div className="size-9 rounded-full bg-indigo-100" />
          </div>
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#071a33] to-indigo-900 p-4">
            <div className="h-3 w-20 rounded-full bg-indigo-300" />
            <div className="mt-3 h-5 w-3/4 rounded-lg bg-white/[0.85]" />
            <div className="mt-3 h-2 w-1/2 rounded-full bg-white/[0.25]" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="aspect-video rounded-lg bg-slate-100" />
                <div className="mt-3 h-2.5 w-4/5 rounded-full bg-slate-700" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function ChartVisual() {
  const bars = [42, 72, 56, 92, 78, 110, 86, 124];

  return (
    <BrowserShell>
      <div className="min-h-[290px] bg-[#071a33] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 w-20 rounded-full bg-white/[0.25]" />
            <div className="mt-3 h-6 w-40 rounded-lg bg-white/[0.9]" />
          </div>
          <div className="h-8 w-24 rounded-full border border-white/10 bg-white/[0.05]" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {["MRR", "Abonnés", "Rétention"].map((item, index) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/[0.4]">
                {item}
              </p>
              <p className="mt-2 text-sm font-black sm:text-lg">
                {index === 0 ? "24,8 K€" : index === 1 ? "1 284" : "92,4 %"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex h-28 items-end gap-2">
            {bars.map((height, index) => (
              <div key={`${height}-${index}`} className="flex flex-1 items-end">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-indigo-500 to-violet-300"
                  style={{ height }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function CheckoutVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[290px] bg-slate-50 sm:grid-cols-[1fr_170px]">
        <div className="p-5">
          <div className="h-3 w-16 rounded-full bg-indigo-500" />
          <div className="mt-4 h-7 w-3/4 rounded-lg bg-slate-950" />
          <div className="mt-3 h-2.5 w-1/2 rounded-full bg-slate-200" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {["Mensuel", "Annuel"].map((plan, index) => (
              <div
                key={plan}
                className={`rounded-xl border p-3 ${
                  index === 1
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-[10px] font-bold text-slate-500">{plan}</p>
                <p className="mt-2 text-lg font-black text-slate-950">
                  {index === 0 ? "29 €" : "290 €"}
                </p>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="mt-4 h-11 rounded-full bg-indigo-600" />
        </div>
        <aside className="hidden border-l border-slate-200 bg-white p-5 sm:block">
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
            Commande
          </p>
          <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500" />
          <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-800" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-slate-200" />
          <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 text-xs font-black">
            <span>Total</span><span>290 €</span>
          </div>
        </aside>
      </div>
    </BrowserShell>
  );
}

function DatabaseVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[290px] bg-slate-50 sm:grid-cols-[145px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-[#071a33] p-4 sm:block">
          <div className="flex items-center gap-2">
            <Database className="size-5 text-emerald-300" aria-hidden="true" />
            <div className="h-2.5 w-16 rounded-full bg-white/[0.7]" />
          </div>
          <div className="mt-7 space-y-2">
            {[1,2,3,4].map((item) => (
              <div key={item} className="rounded-lg bg-white/[0.04] p-2.5">
                <div className="h-2 rounded-full bg-white/[0.28]" />
              </div>
            ))}
          </div>
        </aside>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 w-20 rounded-full bg-slate-300" />
              <div className="mt-3 h-6 w-36 rounded-lg bg-slate-900" />
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-2 text-[9px] font-black text-emerald-700">
              RLS activée
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {[1,2,3,4,5].map((row) => (
              <div key={row} className="grid grid-cols-4 gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
                <div className="h-2 rounded-full bg-slate-700" />
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="h-2 rounded-full bg-emerald-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function EditorVisual() {
  return (
    <BrowserShell>
      <div className="grid min-h-[290px] bg-slate-50 sm:grid-cols-[145px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white p-4 sm:block">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400" />
            <div className="h-2.5 w-16 rounded-full bg-slate-700" />
          </div>
          <div className="mt-7 space-y-2">
            {[1,2,3,4].map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 p-2.5">
                <div className="h-2 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        </aside>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 w-20 rounded-full bg-rose-300" />
              <div className="mt-3 h-6 w-40 rounded-lg bg-slate-900" />
            </div>
            <div className="h-9 w-24 rounded-full bg-slate-950" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_110px]">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-2.5 w-20 rounded-full bg-slate-300" />
                <div className="mt-3 h-10 rounded-lg bg-slate-100" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-2.5 w-24 rounded-full bg-slate-300" />
                <div className="mt-3 h-16 rounded-lg bg-slate-100" />
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-rose-100 to-orange-100" />
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function ChatVisual() {
  return (
    <BrowserShell>
      <div className="min-h-[290px] bg-slate-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
            <Bot className="size-5" aria-hidden="true" />
          </div>
          <div>
            <div className="h-2.5 w-24 rounded-full bg-slate-800" />
            <div className="mt-2 h-2 w-16 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <div className="ml-auto max-w-[80%] rounded-[1.2rem] rounded-br-sm bg-indigo-600 p-4">
            <div className="h-2.5 w-full rounded-full bg-white/[0.8]" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-white/[0.35]" />
          </div>
          <div className="max-w-[90%] rounded-[1.2rem] rounded-bl-sm border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-violet-600">
              <Search className="size-3.5" aria-hidden="true" />
              Réponse sourcée
            </div>
            <div className="mt-4 h-2.5 w-full rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-[88%] rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-[68%] rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
          <div className="h-2.5 flex-1 rounded-full bg-slate-100" />
          <div className="size-8 rounded-lg bg-slate-950" />
        </div>
      </div>
    </BrowserShell>
  );
}

function ProjectVisual({ visual }: { visual: Visual }) {
  if (visual === "member") return <MemberVisual />;
  if (visual === "chart") return <ChartVisual />;
  if (visual === "checkout") return <CheckoutVisual />;
  if (visual === "database") return <DatabaseVisual />;
  if (visual === "editor") return <EditorVisual />;
  return <ChatVisual />;
}

function TechniquePage({ technique }: { technique: Technique }) {
  const cssVariables = {
    "--tech-primary": technique.colors.primary,
    "--tech-secondary": technique.colors.secondary,
    "--tech-soft": technique.colors.soft,
    "--tech-glow": technique.colors.glow,
  } as CSSProperties;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: technique.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main style={cssVariables} className="overflow-hidden bg-[#F8FAFC] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fff_0%,#f5f7ff_52%,#ecefff_100%)] px-6 pb-20 pt-24 sm:pb-24 sm:pt-28 lg:min-h-[760px] lg:px-8 lg:pb-20 lg:pt-32">
        <div
          className="pointer-events-none absolute -right-36 -top-40 size-[34rem] rounded-full blur-3xl"
          style={{ backgroundColor: technique.colors.glow }}
        />
        <div className="pointer-events-none absolute -bottom-52 -left-44 size-[38rem] rounded-full border border-indigo-100" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 size-[30rem] rounded-full border border-indigo-100" />
        <div className="pointer-events-none absolute right-12 top-28 hidden h-36 w-36 bg-[radial-gradient(circle,_#6366f1_1px,_transparent_1px)] [background-size:18px_18px] opacity-15 lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[610px] lg:grid-cols-[1fr_.9fr] lg:gap-16">
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-sm backdrop-blur"
              style={{
                color: technique.colors.primary,
                borderColor: `${technique.colors.primary}22`,
              }}
            >
              <Code2 className="size-3.5" aria-hidden="true" />
              Technique Vexly · {technique.kind}
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[.98] tracking-[-.055em] text-slate-950 sm:text-6xl lg:text-[4.6rem]">
              {technique.titleStart}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${technique.colors.primary}, ${technique.colors.secondary})`,
                }}
              >
                {technique.titleAccent}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {technique.intro}
            </p>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-slate-900">
              {technique.promise}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-.5 hover:brightness-110 active:scale-[.97]"
                style={{
                  background: `linear-gradient(90deg, ${technique.colors.primary}, ${technique.colors.secondary})`,
                  boxShadow: `0 18px 45px ${technique.colors.glow}`,
                }}
              >
                Proposer mon projet
                <ArrowIcon />
              </Link>
              <Link
                href="/realisations"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/75 px-7 py-4 text-sm font-black text-slate-950 shadow-sm backdrop-blur transition duration-300 hover:border-indigo-200 hover:bg-white hover:text-indigo-600"
              >
                Voir nos réalisations
                <ArrowIcon />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {technique.proofTags.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm"
                >
                  <Check className="size-3.5" style={{ color: technique.colors.primary }} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroVisual technique={technique} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#061A33_0%,#0B1F3A_55%,#061A33_100%)] px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: technique.colors.glow }}
        />
        <div className="pointer-events-none absolute -right-44 -top-56 size-[38rem] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 -left-40 size-[38rem] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto w-fit"><TechMark technique={technique} /></div>
          <p className="mt-8 text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>
            Notre socle {technique.name}
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-.05em] text-white sm:text-5xl lg:text-6xl">
            {technique.overviewTitle}
          </h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
            {technique.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <Link href="/contact" className="group mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#071a33] shadow-[0_18px_45px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-.5 hover:bg-indigo-50">
            Discuter avec Vexly
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-40 top-10 size-[34rem] rounded-full blur-3xl" style={{ backgroundColor: technique.colors.soft }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>
                Pourquoi {technique.name} ?
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.05] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                {technique.reasonsTitle}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
                Un bon choix technique se mesure à la vitesse de lancement, à la qualité d’usage et à la facilité d’évolution.
              </p>
            </div>

            <div className="space-y-5">
              {technique.reasons.map((reason, index) => {
                const Icon = REASON_ICONS[index] ?? ShieldCheck;
                return (
                  <article key={reason.title} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,.09)] sm:p-9">
                    <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" style={{ backgroundColor: technique.colors.glow }} />
                    <div className="relative flex gap-5">
                      <div className="mt-1 shrink-0">
                        <div className="flex size-12 items-center justify-center rounded-2xl text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${technique.colors.primary}, ${technique.colors.secondary})` }}>
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[.16em] text-slate-400">0{index + 1}</p>
                        <h3 className="mt-2 text-2xl font-black leading-snug tracking-[-.035em] text-slate-950 sm:text-3xl">{reason.title}</h3>
                        <p className="mt-4 text-base leading-8 text-slate-600">{reason.text}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative mt-20 overflow-hidden rounded-[2.5rem] border px-7 py-12 text-center shadow-[0_28px_90px_rgba(79,70,229,.1)] sm:px-12 sm:py-16 lg:mt-28" style={{ borderColor: `${technique.colors.primary}22`, background: `linear-gradient(135deg, ${technique.colors.soft}, #fff 55%, #f5f3ff)` }}>
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
            <div className="relative mx-auto max-w-4xl">
              <div className="mx-auto flex w-fit gap-2">
                {[Sparkles, Zap, BadgeCheck, Rocket].map((Icon, index) => (
                  <div key={index} className="flex size-10 items-center justify-center rounded-xl border border-white bg-white/80 shadow-sm" style={{ color: technique.colors.primary }}>
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <h3 className="mt-7 text-3xl font-black leading-[1.08] tracking-[-.045em] text-slate-950 sm:text-4xl lg:text-5xl">{technique.proofTitle}</h3>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{technique.proofText}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {technique.proofTags.map((item) => (
                  <span key={item} className="rounded-full border border-white bg-white/75 px-4 py-2 text-xs font-black text-slate-700 shadow-sm">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#061A33_0%,#0B1F3A_55%,#061A33_100%)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -right-40 -top-44 size-[36rem] rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
        <div className="relative mx-auto max-w-[1380px]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>Nos réalisations</p>
              <h2 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-.05em] text-white sm:text-5xl lg:text-6xl">
                Des produits construits avec {technique.name}.
              </h2>
            </div>
            <Link href="/realisations" className="group inline-flex w-fit items-center gap-2 text-sm font-black text-slate-300 transition hover:text-white">
              Voir tous les projets <ArrowIcon />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 sm:mt-20">
            {technique.projects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] shadow-[0_28px_80px_rgba(0,0,0,.18)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-indigo-300/25 hover:bg-white/[0.065]">
                <div className="p-4 sm:p-5"><div className="transition duration-500 group-hover:scale-[1.015]"><ProjectVisual visual={project.visual} /></div></div>
                <div className="p-7 pt-3 sm:p-8 sm:pt-4">
                  <p className="text-[11px] font-black uppercase tracking-[.16em]" style={{ color: technique.colors.primary }}>{project.type}</p>
                  <h3 className="mt-4 text-2xl font-black leading-[1.15] tracking-[-.035em] text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{project.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[10px] font-bold text-white/[0.65]">{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>Ce qu’en disent nos experts</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-6xl">La technique et le produit avancent ensemble.</h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2 sm:mt-20">
            {technique.experts.map((expert, index) => (
              <article key={expert.title} className={`relative overflow-hidden rounded-[2.25rem] p-8 shadow-[0_28px_80px_rgba(15,23,42,.1)] sm:p-10 lg:p-12 ${index === 0 ? "bg-[#071a33] text-white" : "border border-indigo-100 bg-white text-slate-950"}`}>
                <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
                <div className="relative">
                  <div className={`flex size-12 items-center justify-center rounded-2xl ${index === 0 ? "border border-white/10 bg-white/[0.055]" : ""}`} style={{ color: technique.colors.primary, backgroundColor: index === 0 ? undefined : technique.colors.soft }}>
                    {index === 0 ? <ShieldCheck className="size-6" aria-hidden="true" /> : <CheckCircle2 className="size-6" aria-hidden="true" />}
                  </div>
                  <p className="mt-8 text-xs font-black uppercase tracking-[.16em]" style={{ color: technique.colors.primary }}>{expert.role}</p>
                  <h3 className="mt-4 text-3xl font-black leading-[1.1] tracking-[-.04em] sm:text-4xl">{expert.title}</h3>
                  <p className={`mt-6 text-base leading-8 ${index === 0 ? "text-slate-300" : "text-slate-600"}`}>{expert.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>Chez Vexly, nous maîtrisons aussi</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-6xl">Un écosystème cohérent autour de {technique.name}.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 sm:mt-20">
            {technique.related.map((slug) => {
              const item = TECHNIQUES[slug as TechniqueSlug];
              return (
                <Link key={slug} href={`/technique/${slug}`} className="group rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,.1)]">
                  <TechMark technique={item} compact />
                  <h3 className="mt-7 text-2xl font-black tracking-[-.035em] text-slate-950">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.intro}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-black" style={{ color: item.colors.primary }}>Découvrir <ArrowIcon /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#EEF3FC] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-40 -top-36 size-[34rem] rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>{technique.name} au service de vos projets</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.05] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-6xl">Plusieurs produits, une même exigence d’usage.</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">L’interface et les règles changent selon le métier, mais le produit doit rester clair, fiable et simple à utiliser.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {technique.useCases.map((item, index) => {
                const Icon = USE_CASE_ICONS[index] ?? Workflow;
                return (
                  <article key={item.title} className="rounded-[2rem] border border-white/70 bg-white/60 p-7 shadow-[0_20px_60px_rgba(15,23,42,.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(15,23,42,.1)]">
                    <div className="flex size-12 items-center justify-center rounded-2xl" style={{ color: technique.colors.primary, backgroundColor: technique.colors.soft }}>
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-xl font-black leading-snug tracking-[-.03em] text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#F8FAFC] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>Questions fréquentes</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-.05em] text-slate-950 sm:text-5xl lg:text-6xl">Vos questions autour de {technique.name}.</h2>
          </div>
          <div className="mt-14 space-y-4 sm:mt-20">
            {technique.faqs.map((faq, index) => (
              <details key={faq.q} className="group overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white shadow-[0_14px_45px_rgba(15,23,42,.05)] open:border-indigo-200 open:shadow-[0_20px_60px_rgba(79,70,229,.09)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-left sm:p-7">
                  <span className="flex items-start gap-4">
                    <span className="mt-.5 text-xs font-black" style={{ color: technique.colors.primary }}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-black leading-snug tracking-[-.025em] text-slate-950 sm:text-xl">{faq.q}</span>
                  </span>
                  <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full" style={{ color: technique.colors.primary, backgroundColor: technique.colors.soft }}>
                    <span className="absolute h-.5 w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-.5 rounded-full bg-current transition duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <div className="px-6 pb-7 pl-[4.25rem] sm:px-7 sm:pb-8 sm:pl-[4.5rem]">
                  <p className="max-w-3xl text-base leading-8 text-slate-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#EEF3FC] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -right-36 -top-36 size-[32rem] rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#071a33] px-7 py-12 text-white shadow-[0_35px_100px_rgba(15,23,42,.22)] sm:px-10 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full blur-3xl" style={{ backgroundColor: technique.colors.glow }} />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: technique.colors.primary }}>Votre projet avec {technique.name}</p>
              <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-.05em] text-white sm:text-5xl lg:text-6xl">{technique.ctaTitle}</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{technique.ctaText}</p>
            </div>
            <Link href="/contact" className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#071a33] shadow-[0_18px_45px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-.5 hover:bg-indigo-50">
              Démarrer mon projet <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function TechniquePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technique = TECHNIQUES[slug as TechniqueSlug];

  if (!technique) notFound();

  return <TechniquePage technique={technique} />;
}
