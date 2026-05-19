import type { NextConfig } from "next";

const STATIC_MIRROR_URL = "https://st0ckitch.github.io/union";

const nextConfig: NextConfig = {
  async rewrites() {
    // `fallback` rewrites run LAST — only when Next.js can't match a route
    // itself. So /admin, /login, /api stay served by Next; everything else
    // (the HTTrack mirror) transparently proxies to GitHub Pages.
    return {
      fallback: [
        { source: "/", destination: `${STATIC_MIRROR_URL}/` },
        { source: "/:path*", destination: `${STATIC_MIRROR_URL}/:path*` },
      ],
    };
  },
};

export default nextConfig;
