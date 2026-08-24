import NextImage, { type ImageProps } from "next/image";
import { assetUrl } from "@/lib/asset";

/**
 * next/image with the deployment basePath applied.
 *
 * With `images.unoptimized`, next/image passes `src` through untouched instead
 * of routing it via `/_next/image`, so the basePath is never added and every
 * local image 404s on the GitHub Pages project URL. Prefixing here keeps that
 * fix in one place — always import this rather than `next/image` directly.
 */
export function Img({ src, ...rest }: ImageProps) {
  return <NextImage {...rest} src={typeof src === "string" ? assetUrl(src) : src} />;
}
