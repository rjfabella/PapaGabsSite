import type { NextConfig } from "next";

// Served at https://rjfabella.github.io/PapaGabsSite/ until a custom domain
// is configured. If a custom domain (CNAME) is added later, drop the
// basePath/assetPrefix below since the site will then serve from "/".
const repoBasePath = "/PapaGabsSite";
const isGithubActionsBuild = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActionsBuild ? repoBasePath : "";

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
