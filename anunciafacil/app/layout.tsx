import { LEGAL } from "@/lib/legal";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const description =
  "Publicaciones para Instagram, tu ficha de Google, respuestas a reseñas, mensajes de WhatsApp, campañas y carteles para tu negocio, escritos en un minuto.";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: "Tendalia · Textos que atraen clientes a tu negocio",
  description,
  applicationName: "Tendalia",
  keywords: [
    "publicaciones para Instagram",
    "marketing para negocios",
    "ficha de Google",
    "responder reseñas de Google",
    "textos para redes sociales",
    "marketing para bares",
    "marketing para peluquerías",
    "marketing para tiendas",
  ],
  appleWebApp: { capable: true, title: "Tendalia", statusBarStyle: "default" },
  formatDetection: { telephone: false },
  openGraph: {
    title: "Tendalia · El marketing de tu negocio, en un minuto",
    description,
    locale: "es_ES",
    type: "website",
    siteName: "Tendalia",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#12151d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap"
        />
      </head>
      <body>
        <header className="top">
          <div className="wrap">
            <Link className="logo" href="/">
              <span className="logo-mark" aria-hidden="true">✦</span>Tendalia
            </Link>
            <nav className="nav">
              <Link className="btn btn-ghost" href="/panel">Mi panel</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <div className="wrap">
            <span>© Tendalia · Responsable: {LEGAL.owner} · {LEGAL.email}</span>
            <span>
              <Link href="/aviso-legal">Aviso legal</Link> · <Link href="/privacidad">Privacidad</Link> ·{" "}
              <Link href="/cookies">Cookies</Link> · <Link href="/terminos">Términos</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
