import Link from "next/link";
import { appOpen, freeLaunch, intEnv, showPricing, waitlistUrl } from "@/lib/env";
import { PLANS, PLAN_IDS, planLimit } from "@/lib/plans";
import { TOOLS, TOOL_IDS } from "@/lib/tools";
import { HomeExamples } from "./HomeExamples";

const TOOL_ICONS: Record<string, string> = { social: "📱", email: "✉️", review: "⭐", whatsapp: "💬", poster: "🪧", reply: "🗨️" };

export default async function Home({ searchParams }: { searchParams: Promise<{ cuenta?: string }> }) {
  const { cuenta } = await searchParams;
  const freeGenerations = intEnv("FREE_GENERATIONS", 3);
  const launch = freeLaunch();
  const launchMonthly = intEnv("LAUNCH_MONTHLY_GENERATIONS", 10);
  const pricing = showPricing();
  const open = appOpen();
  const cta = open ? (pricing && launch ? "Empezar gratis" : "Empezar") : "Próximamente · Apúntate";
  // Mientras no esté abierta, los botones llevan a la lista de espera.
  const ctaHref = open ? "/entrar" : waitlistUrl();
  const CtaLink = ({ className, style }: { className: string; style?: React.CSSProperties }) =>
    open ? (
      <Link className={className} href={ctaHref} style={style}>{cta}</Link>
    ) : (
      <a className={className} href={ctaHref} target="_blank" rel="noopener noreferrer" style={style}>{cta}</a>
    );

  const allFaqs: Array<[string, string]> = [
    [
      "¿Qué es Pregonia?",
      "Una herramienta que escribe por ti los textos de tu negocio: publicaciones para redes, correos para tus clientes, textos para carteles o menús y, en el plan Pro, respuestas a reseñas de Google, mensajes de WhatsApp y respuestas a los mensajes que te escriben tus clientes.",
    ],
    [
      "¿Necesito saber de marketing?",
      "No. Solo cuentas con tus palabras qué negocio tienes y qué quieres anunciar. Pregonia se encarga de escribirlo bien.",
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
        ? `Ahora es gratis por tiempo limitado, con hasta ${launchMonthly} generaciones al mes y sin tarjeta. Más adelante habrá dos planes: Básico, ${PLANS.basic.priceLabel} al mes, y Pro, ${PLANS.pro.priceLabel} al mes (IVA incluido). Te avisaremos por correo con 30 días de antelación y solo pagarás si decides suscribirte.`
        : `Hay dos planes, IVA incluido y sin permanencia: Básico, ${PLANS.basic.priceLabel} al mes con ${planLimit("basic")} generaciones, y Pro, ${PLANS.pro.priceLabel} al mes con ${planLimit("pro")}.${freeGenerations > 0 ? ` Puedes probarlo gratis ${freeGenerations} veces sin tarjeta.` : ""}`,
    ],
    [
      "¿Qué es una «generación»?",
      "Cada vez que pulsas «Generar» y Pregonia te escribe los textos cuenta como una, sea cual sea la herramienta.",
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
          <p className="notice notice-ok">Tu cuenta y tus datos se han borrado. ¡Gracias por haber usado Pregonia!</p>
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
              Cuéntanos qué negocio tienes y qué necesitas. Pregonia te prepara publicaciones para Instagram, correos para tus
              clientes, carteles y, además, respuestas a reseñas y a los mensajes que te escriben tus clientes.
            </p>
            <div className="nav">
              <CtaLink className="btn btn-primary btn-big" />
              <a className="btn btn-ghost btn-big" href="#ejemplos">Ver ejemplos</a>
            </div>
            {!open && (
              <p className="notice" style={{ background: "var(--chip)" }}>
                <strong>Muy pronto.</strong> Estamos ultimando Pregonia. Apúntate a la lista de espera y te avisamos el día que abra.
              </p>
            )}
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

          <div className="mock" aria-label="Ejemplo de publicación creada con Pregonia">
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
            <h2>Seis herramientas en una</h2>
            <p className="muted">Eliges la que necesitas, escribes con tus palabras y en unos segundos tienes los textos listos para copiar.</p>
          </div>
          <div className="grid-3">
            {TOOL_IDS.map((id) => (
              <div className="card" key={id}>
                <span className="tool-icon" aria-hidden="true">{TOOL_ICONS[id]}</span>
                <strong>
                  {TOOLS[id].label}
                  {TOOLS[id].proOnly && <span className="pro-badge">Pro</span>}
                </strong>
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
              Cuando alguien rellene el formulario de tu anuncio en Facebook o Instagram, Pregonia lo traerá, lo guardará y te
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
        <div className="wrap stack">
          <div className="section-head">
            <span className="eyebrow">Precios</span>
            <h2>{launch ? "Gratis por tiempo limitado" : "Elige tu plan"}</h2>
            <p className="muted">
              {launch
                ? `Durante el lanzamiento, hasta ${launchMonthly} generaciones al mes, sin tarjeta. Después podrás elegir uno de estos planes: te avisaremos por correo con 30 días de antelación y solo pagarás si decides suscribirte.`
                : "IVA incluido. Sin permanencia: cambias de plan o cancelas cuando quieras desde tu panel."}
            </p>
          </div>
          <div className="plans">
            {launch && (
              <div className="plan plan-free">
                <span className="tag">Ahora</span>
                <h3>Lanzamiento</h3>
                <div className="plan-price">0 €</div>
                <p className="muted small">Por tiempo limitado, sin tarjeta.</p>
                <ul className="small checks">
                  <li>{launchMonthly} generaciones al mes</li>
                  <li>Pruébalo todo, también lo del plan Pro</li>
                  <li>Historial y botón de copiar</li>
                </ul>
              </div>
            )}
            {PLAN_IDS.map((id) => (
              <div className={`plan ${id === "pro" ? "plan-featured" : ""}`} key={id}>
                {id === "pro" && <span className="tag">Para quien publica mucho</span>}
                <h3>{PLANS[id].name}</h3>
                <div className="plan-price">
                  {PLANS[id].priceLabel}
                  <small> /mes</small>
                </div>
                <p className="muted small">{PLANS[id].forWho}</p>
                <ul className="small checks">
                  <li>{planLimit(id)} generaciones al mes</li>
                  {id === "pro" ? (
                    <>
                      <li>Las 6 herramientas</li>
                      <li><span><strong>Responder mensajes</strong> de tus clientes</span></li>
                      <li>Respuestas a reseñas de Google</li>
                      <li>Mensajes de WhatsApp</li>
                    </>
                  ) : (
                    <li>Redes sociales, correos y carteles</li>
                  )}
                  <li>Historial y botón de copiar</li>
                  <li>Sin permanencia</li>
                </ul>
              </div>
            ))}
          </div>
          <CtaLink className="btn btn-primary btn-big" style={{ alignSelf: "center" }} />
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
          <h2>{open ? "¿Empezamos con tu negocio?" : "¿Quieres ser de los primeros?"}</h2>
          <p className="muted">
            {open
              ? "Crear la cuenta tarda un minuto y no hace falta contraseña."
              : "Apúntate a la lista de espera y te avisamos por correo en cuanto abramos."}
          </p>
          <CtaLink className="btn btn-primary btn-big" />
        </div>
      </section>
    </main>
  );
}
