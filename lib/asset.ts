/**
 * Prefixes a public asset path with the deployment basePath.
 *
 * next/image and next/link apply basePath automatically; plain <a href> and
 * <img src> do not. Any raw link to a file in public/ must go through this,
 * or it will 404 on the GitHub Pages project URL.
 */
export function assetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
