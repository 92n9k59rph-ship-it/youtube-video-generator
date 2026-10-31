import Link from "next/link";
import { freeLaunch, intEnv, showPricing } from "@/lib/env";
import { TOOLS, TOOL_IDS } from "@/lib/tools";
import { HomeExamples } from "./HomeExamples";

const TOOL_ICONS: Record<string, string> = { social: "📱", email: "✉️", review: "⭐", whatsapp: "💬", poster: "🪧" };

export default async function Home({ searchParams }: { searchParams: Promise<{ cuenta?: string }> }) {
  const { cuenta } = await searchParams;
  const freeGenerations = intEnv("FREE_GENERATIONS", 3);
  const monthly = intEnv("MONTHLY_GENERATIONS", 100);
  const launch = freeLaunch();
  const launchMonthly = intEnv("LAUNCH_MONTHLY_GENERATIONS", 10);
  const pricing = showPricing();
  const cta = pricing && launch ? "Empezar gratis" : "Empezar";

  const allFaqs: Array<[string, string]> = [
    [
      "¿Qué es Anuncio Fácil?",
      "Una herramienta que escribe por ti los textos para anunciar tu negocio: publicaciones para redes, correos para tus clientes, respuestas a reseñas de Google, mensajes de WhatsApp y textos para carteles o menús.",
    ],
    [
      "¿Necesito saber de marketing?",
      "No. Solo cuentas con tus palabras qué negocio tienes y qué quieres anunciar. Anuncio Fácil se encarga de escribirlo bien.",
    ],
    [
      "¿Publica por mí en Instagram o envía los mensajes?",
      "No. Te da los textos listos para copiar y tú decides qué publicar, cuándo y a quién enviarlo. Así siempre tienes el control.",
    ],
    [
      "¿Se inventa datos de mi negocio?",
      "No. Si un texto necesita un precio, un horario o un dato que no le has dado, deja un hueco entre corchetes, como [precio], para que lo completes tú.",
    ],
    [
      "¿Cuánto cuesta?",
      launch
        ? `Ahora es gratis por tiempo limitado, con hasta ${launchMonthly} generaciones al mes y sin tarjeta. Más adelante costará 9,99 € al mes (IVA incluido): te avisaremos por correo con 30 días de antelación y solo pagarás si decides suscribirte.`
        : `9,99 € al mes (IVA incluido), con hasta ${monthly} generaciones al mes y sin permanencia.${freeGenerations > 0 ? ` Puedes probarlo gratis ${freeGenerations} veces sin tarjeta.` : ""}`,
    ],
    [
      "¿Qué es una «generación»?",
      "Cada vez que pulsas «Generar» y Anuncio Fácil te escribe los textos cuenta como una, sea cual sea la herramienta.",
    ],
    [
      "¿Puedo borrar mi cuenta?",
      "Sí, cuando quieras, desde tu panel. Se borran tu cuenta, los datos de tu negocio y tu historial.",
    ],
  ];
  const faqs = pricing ? allFaqs : allFaqs.filter(([q]) => q !== "¿Cuánto cuesta?");

  return (
    <main className="home">
      {cuenta === "borrada" && (
        <div className="wrap">
          <p className="notice notice-ok">Tu cuenta y tus datos se han borrado. ¡Gracias por haber usado Anuncio Fácil!</p>
        </div>
      )}

      {/* Portada */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="stack">
            <span className="tag">Para bares, peluquerías, tiendas y gimnasios</span>
            <h1 className="hero-title">
              Las publicaciones de tu negocio, <span className="accent">escritas en un minuto.</span>
            </h1>
            <p className="lead">
              Cuéntanos qué negocio tienes y qué quieres anunciar. Anuncio Fácil te prepara publicaciones para Instagram, correos
              para tus clientes, respuestas a reseñas, mensajes de WhatsApp y textos para carteles.
            </p>
            <div className="nav">
              <Link className="btn btn-primary btn-big" href="/entrar">{cta}</Link>
              <a className="btn btn-ghost btn-big" href="#ejemplos">Ver ejemplos</a>
            </div>
            {pricing && (
              <p className="muted small">
                {launch
                  ? "Gratis por tiempo limitado, sin tarjeta."
                  : freeGenerations > 0
                    ? `${freeGenerations} generaciones gratis para probar, sin tarjeta.`
                    : "Sin permanencia: cancelas cuando quieras."}
              </p>
            )}
          </div>

          <div className="mock" aria-label="Ejemplo de publicación creada con Anuncio Fácil">
            <span className="sticker">Ejemplo</span>
            <article className="post">
              <div className="post-head">
                <span className="avatar" aria-hidden="true">M</span>
                <div>
                  <div className="post-name">Peluquería Marta</div>
                  <div className="muted small">Publicación de ejemplo · negocio inventado</div>
                </div>
              </div>
              <div className="post-img"><span>Martes -20 %</span></div>
              <div className="post-body">
                <p><strong>¿Martes de bajón? Te lo arreglamos.</strong> Todos los martes, 20 % de descuento en corte y peinado. Reserva por WhatsApp y ven a desconectar un rato. 💇‍♀️</p>
                <p className="hashtags">#peluqueria #martesdedescuento #cortedepelo</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="band">
        <div className="wrap stack">
          <div className="section-head">
            <span className="eyebrow">Cómo funciona</span>
            <h2>Tres pasos y listo para publicar</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Cuéntanos tu negocio</h3>
              <p className="muted">Tipo de negocio, ciudad y cómo os gusta hablar: cercano, divertido, elegante o serio. Solo una vez.</p>
            </li>
            <li>
              <h3>Di qué necesitas</h3>
              <p className="muted">Una oferta, un producto nuevo, un horario especial, una reseña que contestar o «ideas para este mes».</p>
            </li>
            <li>
              <h3>Copia y publica</h3>
              <p className="muted">En unos segundos tienes los textos. Los copias con un botón, los cambias a tu gusto y los publicas.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Ejemplos */}
      <section className="band band-surface" id="ejemplos">
        <div className="wrap stack">
          <div className="section-head">
            <span className="eyebrow">Ejemplos</span>
            <h2>Así quedaría para tu negocio</h2>
            <p className="muted">Elige un tipo de negocio y mira el estilo de los textos.</p>
          </div>
          <HomeExamples />
        </div>
      </section>

      {/* Herramientas */}
      <section className="band">
        <div className="wrap stack">
          <div className="section-head">
            <span className="eyebrow">Qué incluye</span>
            <h2>Cinco herramientas en una</h2>
            <p className="muted">Eliges la que necesitas, escribes con tus palabras y en unos segundos tienes los textos listos para copiar.</p>
          </div>
          <div className="grid-3">
            {TOOL_IDS.map((id) => (
              <div className="card" key={id}>
                <span className="tool-icon" aria-hidden="true">{TOOL_ICONS[id]}</span>
                <strong>{TOOLS[id].label}</strong>
                <span className="muted small">{TOOLS[id].short}</span>
                <ul className="small checks">
                  {TOOLS[id].includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="card">
              <span className="tool-icon" aria-hidden="true">✨</span>
              <strong>Y además</strong>
              <ul className="small checks">
                <li>Recuerda los datos y el tono de tu negocio</li>
                <li>Historial para volver a ver tus textos</li>
                <li>Botón de copiar en cada texto</li>
                <li>No se inventa precios ni horarios</li>
                <li>Funciona en el móvil, la tablet y el ordenador</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Próximamente */}
      <section className="band band-surface">
        <div className="wrap soon">
          <div className="stack">
            <span className="tag">Próximamente</span>
            <h2>Los contactos de tus anuncios, ordenados y a mano</h2>
            <p className="muted">
              Cuando alguien rellene el formulario de tu anuncio en Facebook o Instagram, Anuncio Fácil lo traerá, lo guardará y te
              avisará. Tú solo tendrás que contestar.
            </p>
          </div>
          <ul className="small checks">
            <li>Contactos de todas tus campañas en un solo sitio, sin duplicados</li>
            <li>Aviso por correo cuando lleguen contactos nuevos</li>
            <li>Llama, escribe o abre WhatsApp desde la ficha del contacto</li>
            <li>Seguimiento: nuevo, contactado, ganado o perdido, con notas</li>
            <li>Descarga en CSV, para no perderlos nunca</li>
          </ul>
        </div>
      </section>

      {/* Precio */}
      {pricing && (
      <section className="band">
        <div className="wrap">
          <div className="price-card">
            <div className="stack" style={{ gap: 10 }}>
              <h2>{launch ? "Gratis por tiempo limitado" : "Un solo plan, sin sorpresas"}</h2>
              <p>
                {launch
                  ? `Durante el lanzamiento, hasta ${launchMonthly} generaciones al mes, sin tarjeta. Más adelante costará 9,99 € al mes (IVA incluido): te avisaremos por correo con 30 días de antelación y solo pagarás si decides suscribirte.`
                  : `Hasta ${monthly} generaciones al mes, IVA incluido. Sin permanencia: cancelas cuando quieras desde tu panel.`}
              </p>
              <Link className="btn btn-light btn-big" href="/entrar" style={{ alignSelf: "flex-start" }}>{cta}</Link>
            </div>
            <div className="price">
              {launch ? "0 €" : "9,99 €"}
              <small>{launch ? " ahora" : " /mes"}</small>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Preguntas */}
      <section className="band band-surface">
        <div className="wrap stack">
          <div className="section-head">
            <span className="eyebrow">Preguntas</span>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p className="muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="band">
        <div className="wrap final">
          <h2>¿Empezamos con tu negocio?</h2>
          <p className="muted">Crear la cuenta tarda un minuto y no hace falta contraseña.</p>
          <Link className="btn btn-primary btn-big" href="/entrar">{cta}</Link>
        </div>
      </section>
    </main>
  );
}
