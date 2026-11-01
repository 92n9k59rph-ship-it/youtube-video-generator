import Link from "next/link";
import { appOpen, freeLaunch, intEnv, showPricing, waitlistUrl } from "@/lib/env";
import { PLANS, PLAN_IDS, planLimit } from "@/lib/plans";
import { TOOLS, TOOL_IDS, type ToolId } from "@/lib/tools";
import { HomeExamples } from "./HomeExamples";

const TOOL_ICONS: Record<ToolId, string> = {
  social: "📱",
  email: "✉️",
  poster: "🪧",
  bio: "👤",
  google: "📍",
  review: "⭐",
  reply: "🗨️",
  whatsapp: "💬",
  promo: "🎯",
  reel: "🎬",
  loyalty: "🎁",
};

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

  const planSummary = PLAN_IDS.map((id) => `${PLANS[id].name}, ${PLANS[id].priceLabel} al mes con ${planLimit(id)} generaciones`).join("; ");

  const allFaqs: Array<[string, string]> = [
    [
      "¿Qué es Pregonia?",
      "Una herramienta que escribe por ti los textos que atraen clientes a tu negocio: publicaciones para redes, correos, carteles y menús, tu perfil de Instagram, tu ficha de Google para que te encuentren en tu zona, respuestas a reseñas y mensajes, campañas completas, guiones de vídeo e ideas para que tus clientes vuelvan.",
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
        ? `Ahora es gratis por tiempo limitado, con hasta ${launchMonthly} generaciones al mes y sin tarjeta. Más adelante habrá tres planes (IVA incluido): ${planSummary}. Te avisaremos por correo con 30 días de antelación y solo pagarás si decides suscribirte.`
        : `Hay tres planes, IVA incluido y sin permanencia: ${planSummary}.${freeGenerations > 0 ? ` Puedes probarlo gratis ${freeGenerations} veces sin tarjeta.` : ""}`,
    ],
    [
      "¿Qué es una «generación»?",
      "Cada vez que pulsas «Generar» y Pregonia te escribe los textos cuenta como una, sea cual sea la herramienta.",
    ],
    [
      "¿Me ayuda a que me encuentren en Google?",
      "Sí. La herramienta «Ficha de Google» te prepara la descripción, las publicaciones y las preguntas frecuentes de tu ficha de Google, con las palabras que usan tus clientes para buscar negocios como el tuyo en tu zona.",
    ],
    [
      "¿Tiene app para el móvil?",
      "Sí. Pregonia se instala en tu móvil o tablet como una app, sin pasar por ninguna tienda: en el iPhone, abre la web en Safari, toca Compartir y «Añadir a pantalla de inicio»; en Android, abre el menú de Chrome y toca «Instalar app».",
    ],
    [
      "¿Puedo borrar mi cuenta?",
      "Sí, cuando quieras, desde tu panel. Se borran tu cuenta, los datos de tu negocio y tu historial.",
    ],
  ];
  const faqs = pricing ? allFaqs : allFaqs.filter(([q]) => q !== "¿Cuánto cuesta?");

  // Datos estructurados para que Google entienda qué es Pregonia (y pueda mostrar sus precios).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pregonia",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    inLanguage: "es-ES",
    description:
      "Escribe en un minuto los textos que atraen clientes a tu negocio: publicaciones para redes, ficha de Google, respuestas a reseñas, WhatsApp, campañas y carteles.",
    offers: PLAN_IDS.map((id) => ({
      "@type": "Offer",
      name: PLANS[id].name,
      price: PLANS[id].priceEur.toFixed(2),
      priceCurrency: "EUR",
    })),
  };

  return (
    <main className="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
              Cuéntanos qué negocio tienes y qué necesitas. Pregonia te prepara publicaciones para Instagram, tu ficha de Google
              para que te encuentren en tu zona, respuestas a reseñas y mensajes, campañas, carteles y guiones de vídeo.
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
            <h2>{TOOL_IDS.length} herramientas para conseguir más clientes</h2>
            <p className="muted">Eliges la que necesitas, escribes con tus palabras y en unos segundos tienes los textos listos para copiar.</p>
          </div>
          <div className="grid-3">
            {TOOL_IDS.map((id) => (
              <div className="card" key={id}>
                <span className="tool-icon" aria-hidden="true">{TOOL_ICONS[id]}</span>
                <strong>
                  {TOOLS[id].label}
                  {TOOLS[id].minPlan !== "basic" && (
                    <span className={`pro-badge ${TOOLS[id].minPlan === "premium" ? "premium-badge" : ""}`}>{PLANS[TOOLS[id].minPlan].name}</span>
                  )}
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
                <li>Historial con buscador para volver a ver tus textos</li>
                <li>Botón de copiar en cada texto</li>
                <li>No se inventa precios ni horarios</li>
                <li>Se instala en el móvil como una app</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* App */}
      <section className="band band-surface" id="app">
        <div className="wrap soon">
          <div className="stack">
            <span className="tag">Tu propia app</span>
            <h2>Pregonia, en la pantalla de tu móvil</h2>
            <p className="muted">
              Instálala en tu móvil o tablet como cualquier otra app, sin pasar por ninguna tienda y sin ocupar espacio. Así
              tienes los textos de tu negocio a mano, detrás del mostrador.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="card">
              <strong>📱 iPhone y iPad</strong>
              <span className="muted small">Abre Pregonia en Safari, toca Compartir y elige «Añadir a pantalla de inicio».</span>
            </div>
            <div className="card">
              <strong>🤖 Android</strong>
              <span className="muted small">Abre Pregonia en Chrome, toca el menú ⋮ y elige «Instalar app».</span>
            </div>
            <div className="card">
              <strong>💻 Ordenador</strong>
              <span className="muted small">En Chrome o Edge, toca el icono de instalar que sale en la barra de direcciones.</span>
            </div>
          </div>
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
                  <li>Pruébalo todo, también lo de Pro y Premium</li>
                  <li>Historial y botón de copiar</li>
                </ul>
              </div>
            )}
            {PLAN_IDS.map((id) => (
              <div className={`plan ${id === "pro" ? "plan-featured" : ""}`} key={id}>
                {id === "pro" && <span className="tag">El más elegido</span>}
                {id === "premium" && <span className="tag tag-premium">Todo incluido</span>}
                <h3>{PLANS[id].name}</h3>
                <div className="plan-price">
                  {PLANS[id].priceLabel}
                  <small> /mes</small>
                </div>
                <p className="muted small">{PLANS[id].forWho}</p>
                <ul className="small checks">
                  <li><strong>{planLimit(id)} generaciones al mes</strong></li>
                  {PLANS[id].extras.map((extra) => (
                    <li key={extra}>{extra}</li>
                  ))}
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
