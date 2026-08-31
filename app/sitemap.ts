import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Emitted as a static /sitemap.xml by `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
