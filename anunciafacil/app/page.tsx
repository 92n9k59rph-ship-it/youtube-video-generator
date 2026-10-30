import Link from "next/link";
import { intEnv } from "@/lib/env";
import { TOOLS, TOOL_IDS } from "@/lib/tools";

export default function Home() {
  const freeGenerations = intEnv("FREE_GENERATIONS", 0);
  const monthly = intEnv("MONTHLY_GENERATIONS", 100);
  return (
    <main>
      <div className="wrap stack">
        <section className="stack" style={{ maxWidth: 720, paddingBlock: 24 }}>
          <span className="pill">Para bares, peluquerías, tiendas y gimnasios</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-.03em" }}>
            Las publicaciones de tu negocio, <span style={{ color: "var(--tomato)" }}>escritas en un minuto.</span>
          </h1>
          <p className="muted" style={{ fontSize: "1.15rem" }}>
            Cuéntanos qué negocio tienes y qué quieres anunciar. AnunciaFácil te prepara publicaciones para
            Instagram, correos para tus clientes, respuestas a reseñas, mensajes de WhatsApp y textos para carteles.
          </p>
          <div className="nav">
            <Link className="btn btn-primary" href="/entrar">Empezar</Link>
            {freeGenerations > 0 && (
              <span className="muted small">{freeGenerations} generaciones gratis para probar, sin tarjeta.</span>
            )}
          </div>
        </section>

        <section className="grid-3">
          <div className="panel">
            <h2>1. Tu negocio</h2>
            <p className="muted">Tipo de negocio, ciudad y cómo os gusta hablar. Solo una vez.</p>
          </div>
          <div className="panel">
            <h2>2. Qué anunciar</h2>
            <p className="muted">Una oferta, un producto nuevo, un horario especial o «ideas para este mes».</p>
          </div>
          <div className="panel">
            <h2>3. Copia y publica</h2>
            <p className="muted">Textos con hashtags, idea de Reel y calendario. Los cambias a tu gusto.</p>
          </div>
        </section>

        <section className="panel">
          <h2>Cinco herramientas en una</h2>
          <div className="grid-3">
            {TOOL_IDS.map((id) => (
              <div className="card" key={id}>
                <strong>{TOOLS[id].label}</strong>
                <span className="muted small">{TOOLS[id].short}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>9,99 € al mes</h2>
            <p className="muted">IVA incluido. Hasta {monthly} generaciones al mes. Sin permanencia: cancelas cuando quieras.</p>
          </div>
          <Link className="btn btn-primary" href="/entrar">Empezar</Link>
        </section>
      </div>
    </main>
  );
}
