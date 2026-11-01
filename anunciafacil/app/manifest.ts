import type { MetadataRoute } from "next";

// Permite instalar Tendalia en el móvil, la tablet o el ordenador como si fuera una app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tendalia",
    short_name: "Tendalia",
    description: "Los textos que atraen clientes a tu negocio, escritos en un minuto.",
    lang: "es-ES",
    start_url: "/panel",
    scope: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#5b47f0",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
