import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnunciaFácil",
  description: "Las publicaciones de tu negocio, escritas en un minuto.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
              <span className="logo-mark" aria-hidden="true">✦</span>AnunciaFácil
            </Link>
            <nav className="nav">
              <Link className="btn btn-ghost" href="/panel">Mi panel</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <div className="wrap">
            <span>© AnunciaFácil · Responsable: David Lázaro · anunciafacil.contacto@gmail.com</span>
            <span>
              <Link href="/privacidad">Privacidad</Link> · <Link href="/terminos">Términos</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
