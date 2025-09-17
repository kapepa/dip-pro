import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    loader: "default",
    formats: ['image/avif', 'image/webp'],
  },
  rules: {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "off"
  }
};

export default nextConfig;
