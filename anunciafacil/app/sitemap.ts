import type { MetadataRoute } from "next";
import { sitePublic } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!site || !sitePublic()) return [];
  return ["", "/entrar", "/aviso-legal", "/privacidad", "/cookies", "/terminos"].map((path) => ({ url: `${site}${path}` }));
}
