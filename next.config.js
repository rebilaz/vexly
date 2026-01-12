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

  // ✅ IMPORTANT: embarque content/ en prod (standalone / tracing)
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["content/**/*"],
  },
};

module.exports = nextConfig;
