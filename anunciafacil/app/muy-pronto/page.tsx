import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tendalia · Muy pronto",
  robots: { index: false, follow: false },
};

// Lo que ve todo el mundo mientras la web está en privado (SITE_PUBLIC no es «true»).
export default function MuyPronto() {
  return (
    <main>
      <div className="wrap stack" style={{ maxWidth: 560, textAlign: "center", alignItems: "center", padding: "12vh 0" }}>
        <span className="tag">Muy pronto</span>
        <h1 style={{ fontSize: "2.6rem" }}>Estamos preparando algo para tu negocio</h1>
        <p className="muted">Vuelve dentro de poco.</p>
        <Link className="muted small" href="/entrar">
          Acceso para el equipo
        </Link>
      </div>
    </main>
  );
}
