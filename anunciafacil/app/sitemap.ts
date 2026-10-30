import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!site) return [];
  return ["", "/entrar", "/privacidad", "/terminos"].map((path) => ({ url: `${site}${path}` }));
}
