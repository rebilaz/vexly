/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vexly.fr" }],
        destination: "https://www.vexly.fr/:path*",
        permanent: true,
      },
    ];
  },

  // ✅ IMPORTANT: inclure content/ dans le bundle prod (standalone/Vercel)
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["content/**/*"],
    },
  },
};

module.exports = nextConfig;
