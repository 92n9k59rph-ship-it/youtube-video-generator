import type { MetadataRoute } from "next";
import { sitePublic } from "@/lib/env";

// Google puede ver la portada y las páginas legales, pero no los paneles ni la API.
export default function robots(): MetadataRoute.Robots {
  // Mientras la web está en privado, que Google no la guarde.
  if (!sitePublic()) return { rules: { userAgent: "*", disallow: "/" } };
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/panel", "/admin", "/api/", "/auth/"] },
    ...(site ? { sitemap: `${site}/sitemap.xml` } : {}),
  };
}
