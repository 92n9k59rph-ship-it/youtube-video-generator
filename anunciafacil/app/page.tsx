import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="wrap stack">
        <section className="stack" style={{ maxWidth: 720, paddingBlock: 24 }}>
          <span className="pill">Para bares, peluquerías, tiendas y gimnasios</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-.03em" }}>
            Las publicaciones de tu negocio, <span style={{ color: "var(--tomato)" }}>escritas en un minuto.</span>
          </h1>
          <p className="muted" style={{ fontSize: "1.15rem" }}>
            Cuéntanos qué negocio tienes y qué quieres anunciar. AnunciaFácil te prepara las publicaciones para
            Instagram, una idea de Reel y el calendario del mes.
          </p>
          <div className="nav">
            <Link className="btn btn-primary" href="/entrar">Probar gratis</Link>
            <span className="muted small">3 generaciones gratis, sin tarjeta.</span>
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

        <section className="panel" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>9,99 € al mes</h2>
            <p className="muted">IVA incluido. Hasta 100 generaciones al mes. Sin permanencia: cancelas cuando quieras.</p>
          </div>
          <Link className="btn btn-primary" href="/entrar">Empezar</Link>
        </section>
      </div>
    </main>
  );
}
