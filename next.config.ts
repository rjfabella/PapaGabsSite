import type { NextConfig } from "next";

// Served at https://papagabstravel.com/ via the custom domain in public/CNAME,
// so the site lives at "/" and needs no basePath. (Before the domain was added
// it served from https://rjfabella.github.io/PapaGabsSite/ and every asset had
// to be prefixed with "/PapaGabsSite".)
const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  // next/image and next/link prefix basePath themselves, but plain <a href>
  // and <img src> do not — expose it so those can be built explicitly.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
