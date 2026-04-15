import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export – krävs för Cloudflare Pages utan Node-runtime.
  output: "export",
  // Trailing slash gör att /onboarding fungerar som /onboarding/index.html
  // direkt utan SPA-fallback.
  trailingSlash: true,
  // Next/Image kräver loader för export, men vi använder bara <img> i prototypen.
  images: { unoptimized: true },
};

export default nextConfig;
