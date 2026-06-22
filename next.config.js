/** @type {import("next").NextConfig} */

const fs = require("fs");
const path = require("path");

function loadGeneratedRedirects() {
  try {
    const filePath = path.join(
      process.cwd(),
      "redirects.generated.json",
    );

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const redirects = JSON.parse(raw);

    if (!Array.isArray(redirects)) {
      return [];
    }

    return redirects
      .filter(
        (redirect) =>
          redirect &&
          redirect.status === 301 &&
          typeof redirect.from === "string" &&
          typeof redirect.to === "string",
      )
      .map((redirect) => ({
        source: redirect.from,
        destination: redirect.to,
        permanent: true,
      }));
  } catch (error) {
    console.error(
      "Impossible de charger redirects.generated.json :",
      error,
    );

    return [];
  }
}

const affiliationOrigin =
  process.env.AFFILIATION_ORIGIN ||
  "http://localhost:3001";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /**
   * Envoie toutes les routes /affiliation
   * vers le second repo Next.js.
   *
   * L’URL reste :
   * http://localhost:3000/affiliation
   *
   * Mais le contenu vient de :
   * http://localhost:3001/affiliation
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/affiliation",
          destination: `${affiliationOrigin}/affiliation`,
        },
        {
          source: "/affiliation/:path*",
          destination: `${affiliationOrigin}/affiliation/:path*`,
        },
      ],

      afterFiles: [],
      fallback: [],
    };
  },

  async redirects() {
    const generated = loadGeneratedRedirects();

    return [
      // Domaine sans www vers www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vexly.fr",
          },
        ],
        destination: "https://www.vexly.fr/:path*",
        permanent: true,
      },

      // Redirections SEO générées depuis la base de données
      ...generated,
    ];
  },

  output: "standalone",

  outputFileTracingIncludes: {
    "/*": ["content/**/*"],
  },
};

module.exports = nextConfig;
