import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignora errori TypeScript e ESLint durante la pubblicazione
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Permetti immagini da qualsiasi fonte (utile per i componenti)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
