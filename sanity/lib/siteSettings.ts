import "server-only";

import { client } from "@/sanity/lib/client";

export type SiteNavLink = {
  label?: string;
  href?: string;
  description?: string;
  isExternal?: boolean;
  isVisible?: boolean;
  order?: number;
};

export type SiteNavItem = {
  label?: string;
  type?: "link" | "dropdown";
  href?: string;
  isExternal?: boolean;
  isVisible?: boolean;
  order?: number;
  items?: SiteNavLink[];
};

export type SiteSettings = {
  header?: {
    logoUrl?: string | null;
    logoAlt?: string | null;
    navigation?: SiteNavItem[];
    loginLink?: {
      label?: string;
      href?: string;
      isVisible?: boolean;
    };
    cta?: {
      label?: string;
      href?: string;
      isVisible?: boolean;
    };
  };

  footer?: {
    logoUrl?: string | null;
    logoAlt?: string | null;
    description?: string;
    email?: string;
    columns?: {
      title?: string;
      isVisible?: boolean;
      order?: number;
      links?: SiteNavLink[];
    }[];
    legalLinks?: SiteNavLink[];
    copyright?: string;
  };
};

export const defaultSiteSettings: SiteSettings = {
  header: {
    logoUrl: "/vexly-logo-2-full-gradient.svg",
    logoAlt: "Vexly logo",
    navigation: [
      {
        label: "Solutions",
        type: "dropdown",
        isVisible: true,
        order: 1,
        items: [
          {
            label: "Plateforme d’abonnement",
            href: "/plateforme-abonnement-createurs",
            description: "Monétiser votre audience avec un SaaS récurrent",
            isVisible: true,
            order: 1,
          },
          {
            label: "MVP SaaS",
            href: "/mvp-saas-createurs",
            description: "Tester votre idée avant de construire trop gros",
            isVisible: true,
            order: 2,
          },
          {
            label: "Outils IA",
            href: "/outils-ia-createurs",
            description: "Transformer votre expertise en outil intelligent",
            isVisible: true,
            order: 3,
          },
          {
            label: "Transformer son offre en SaaS",
            href: "/transformer-offre-en-saas",
            description: "Productiser votre méthode, coaching ou service",
            isVisible: true,
            order: 4,
          },
        ],
      },
      {
        label: "Tarifs",
        type: "link",
        href: "/tarifs",
        isVisible: true,
        order: 2,
      },
      {
        label: "Articles",
        type: "link",
        href: "/articles",
        isVisible: true,
        order: 3,
      },
      {
        label: "Ressources",
        type: "dropdown",
        isVisible: true,
        order: 4,
        items: [
          {
            label: "Vue d’ensemble",
            href: "/ressources",
            description: "Tous les contenus",
            isVisible: true,
            order: 1,
          },
          {
            label: "Articles",
            href: "/articles",
            description: "Explorer",
            isVisible: true,
            order: 2,
          },
        ],
      },
    ],
    loginLink: {
      label: "Connexion",
      href: "/connexion",
      isVisible: true,
    },
    cta: {
      label: "Créer mon SaaS",
      href: "/#formulaire",
      isVisible: true,
    },
  },

  footer: {
    logoUrl: "/vexly-logo-2-full-white.svg",
    logoAlt: "VEXLY",
    description:
      "Vexly conçoit des SaaS, outils IA et automatisations pour aider les créateurs et business digitaux à lancer plus vite.",
    email: "contact@vexly.fr",
    columns: [
      {
        title: "Navigation",
        isVisible: true,
        order: 1,
        links: [
          { label: "Tarifs", href: "/tarifs", isVisible: true, order: 1 },
          { label: "Articles", href: "/articles", isVisible: true, order: 2 },
          {
            label: "Plateforme d’abonnement",
            href: "/plateforme-abonnement-createurs",
            isVisible: true,
            order: 3,
          },
          {
            label: "MVP SaaS",
            href: "/mvp-saas-createurs",
            isVisible: true,
            order: 4,
          },
          {
            label: "Outils IA",
            href: "/outils-ia-createurs",
            isVisible: true,
            order: 5,
          },
          {
            label: "Ressources",
            href: "/ressources",
            isVisible: true,
            order: 6,
          },
        ],
      },
      {
        title: "Informations",
        isVisible: true,
        order: 2,
        links: [
          { label: "Contact", href: "/contact", isVisible: true, order: 1 },
          {
            label: "Politique de confidentialité",
            href: "/politique-de-confidentialite",
            isVisible: true,
            order: 2,
          },
        ],
      },
    ],
    legalLinks: [
      {
        label: "Mentions légales",
        href: "/mentions-legales",
        isVisible: true,
        order: 1,
      },
      {
        label: "CGU / CGV",
        href: "/conditions-generales",
        isVisible: true,
        order: 2,
      },
    ],
    copyright: "VEXLY — Tous droits réservés.",
  },
};

function sortByOrder<T extends { order?: number }>(items?: T[]) {
  return [...(items ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
}

function cleanSettings(settings?: SiteSettings | null): SiteSettings {
  if (!settings) return defaultSiteSettings;

  const headerNavigation = sortByOrder(
    settings.header?.navigation?.filter((item) => item.isVisible !== false)
  ).map((item) => ({
    ...item,
    items: sortByOrder(
      item.items?.filter((link) => link.isVisible !== false)
    ),
  }));

  const footerColumns = sortByOrder(
    settings.footer?.columns?.filter((column) => column.isVisible !== false)
  ).map((column) => ({
    ...column,
    links: sortByOrder(
      column.links?.filter((link) => link.isVisible !== false)
    ),
  }));

  const legalLinks = sortByOrder(
    settings.footer?.legalLinks?.filter((link) => link.isVisible !== false)
  );

  return {
    header: {
      ...defaultSiteSettings.header,
      ...settings.header,
      logoUrl:
        settings.header?.logoUrl || defaultSiteSettings.header?.logoUrl,
      logoAlt:
        settings.header?.logoAlt || defaultSiteSettings.header?.logoAlt,
      navigation: headerNavigation.length
        ? headerNavigation
        : defaultSiteSettings.header?.navigation,
      loginLink: {
        ...defaultSiteSettings.header?.loginLink,
        ...settings.header?.loginLink,
      },
      cta: {
        ...defaultSiteSettings.header?.cta,
        ...settings.header?.cta,
      },
    },

    footer: {
      ...defaultSiteSettings.footer,
      ...settings.footer,
      logoUrl:
        settings.footer?.logoUrl || defaultSiteSettings.footer?.logoUrl,
      logoAlt:
        settings.footer?.logoAlt || defaultSiteSettings.footer?.logoAlt,
      columns: footerColumns.length
        ? footerColumns
        : defaultSiteSettings.footer?.columns,
      legalLinks: legalLinks.length
        ? legalLinks
        : defaultSiteSettings.footer?.legalLinks,
    },
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.withConfig({ useCdn: false }).fetch<SiteSettings | null>(`
    *[_type == "siteSettings"][0] {
      header {
        "logoUrl": logo.asset->url,
        "logoAlt": coalesce(logo.alt, "Vexly logo"),

        navigation[] | order(coalesce(order, 0) asc) {
          label,
          type,
          href,
          isExternal,
          "isVisible": coalesce(isVisible, true),
          "order": coalesce(order, 0),

          items[] | order(coalesce(order, 0) asc) {
            label,
            href,
            description,
            isExternal,
            "isVisible": coalesce(isVisible, true),
            "order": coalesce(order, 0)
          }
        },

        loginLink {
          label,
          href,
          "isVisible": coalesce(isVisible, true)
        },

        cta {
          label,
          href,
          "isVisible": coalesce(isVisible, true)
        }
      },

      footer {
        "logoUrl": logo.asset->url,
        "logoAlt": coalesce(logo.alt, "VEXLY"),
        description,
        email,

        columns[] | order(coalesce(order, 0) asc) {
          title,
          "isVisible": coalesce(isVisible, true),
          "order": coalesce(order, 0),

          links[] | order(coalesce(order, 0) asc) {
            label,
            href,
            isExternal,
            "isVisible": coalesce(isVisible, true),
            "order": coalesce(order, 0)
          }
        },

        legalLinks[] | order(coalesce(order, 0) asc) {
          label,
          href,
          "isVisible": coalesce(isVisible, true),
          "order": coalesce(order, 0)
        },

        copyright
      }
    }
  `);

  return cleanSettings(settings);
}