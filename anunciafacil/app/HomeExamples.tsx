"use client";

import { useState } from "react";

// Ejemplos escritos a mano para la portada: muestran el tipo de resultado, no son generados.
const BUSINESSES = {
  bar: {
    label: "Bar",
    post: {
      text: "¡Llega el viernes y llega la tapa del día! 🍢 Esta semana: croquetas caseras de jamón con tu caña. Te esperamos desde las [hora].",
      tags: "#tapas #viernes #bardebarrio #croquetas",
    },
    review: {
      original: "★★☆☆☆ «Tardaron mucho en atendernos el sábado.»",
      reply:
        "Hola, Laura. Gracias por contárnoslo y perdona la espera: el sábado tuvimos más gente de la prevista. Nos gustaría compensarte con un buen rato la próxima vez. Si quieres, escríbenos a [correo] y lo hablamos.",
    },
    whatsapp: "¡Hola! 👋 Este viernes hay partido en la tele y tapa de regalo con cada consumición. ¿Te guardamos sitio? 🍻",
    google: {
      description: "Bar de tapas de barrio con terraza. Tapa casera con cada consumición, menú del día entre semana y partidos en la tele. Un sitio de toda la vida para quedar con los amigos.",
      keywords: "bar de tapas en [barrio] · menú del día cerca · bar con terraza",
    },
  },
  pelu: {
    label: "Peluquería",
    post: {
      text: "¿Martes de bajón? Te lo arreglamos. 💇‍♀️ Todos los martes, [descuento] en corte y peinado. Reserva por WhatsApp y ven a desconectar un rato.",
      tags: "#peluqueria #martesdedescuento #cortedepelo",
    },
    review: {
      original: "★★★★★ «¡El mejor corte que me han hecho! Volveré seguro.»",
      reply:
        "¡Muchas gracias, Marta! Nos alegra un montón que te encantara el corte. Aquí te esperamos para el próximo. 💜",
    },
    whatsapp: "¡Hola! Se acercan las fiestas y las citas vuelan 🎄 ¿Te reservamos hueco? Contesta a este mensaje y te damos opciones.",
    google: {
      description: "Peluquería en [barrio] especializada en color y mechas, con cortes de mujer y de hombre. Ambiente tranquilo y cita fácil por WhatsApp.",
      keywords: "peluquería en [barrio] · mechas · corte de pelo cerca de mí",
    },
  },
  tienda: {
    label: "Tienda de ropa",
    post: {
      text: "Nueva colección de otoño ya en tienda 🍂 Jerséis de punto en 6 colores. Ven a probártelos este fin de semana.",
      tags: "#modaotoño #comerciolocal #jerseis",
    },
    review: {
      original: "★★★☆☆ «Ropa bonita, pero un poco cara.»",
      reply:
        "Hola, Javier. Gracias por tu opinión. Trabajamos con tejidos de calidad para que las prendas duren, y cada mes tenemos ofertas para clientes habituales. ¡Esperamos verte pronto!",
    },
    whatsapp: "¡Hola! 👋 Ya ha llegado la mercancía nueva. Si quieres, te guardamos tu talla hasta el sábado. ¡Pásate!",
    google: {
      description: "Tienda de ropa con prendas de calidad para el día a día. Colecciones nuevas cada temporada y asesoramiento cercano para encontrar tu talla y tu estilo.",
      keywords: "tienda de ropa en [ciudad] · ropa de mujer · moda de comercio local",
    },
  },
  gym: {
    label: "Gimnasio",
    post: {
      text: "Empieza el lunes sin excusas 💪 Primera clase de prueba gratis en cualquier actividad. Apúntate en recepción.",
      tags: "#gimnasio #entrenamiento #clasedeprueba",
    },
    review: {
      original: "★☆☆☆☆ «Llamé tres veces y nadie contestó.»",
      reply:
        "Hola, Pedro. Sentimos mucho que no pudieras contactar con nosotros: no es lo que queremos. Escríbenos a [correo] o al [teléfono] y te atendemos hoy mismo.",
    },
    whatsapp: "¡Hola! Recordatorio: mañana a las [hora] tienes tu clase de [actividad]. Si no puedes venir, avísanos para liberar la plaza 🙏",
    google: {
      description: "Gimnasio cercano con sala de musculación y clases dirigidas. Entrenadores que te acompañan desde el primer día, para cualquier nivel.",
      keywords: "gimnasio en [barrio] · clases de pilates · entrenador personal",
    },
  },
} as const;

type BusinessId = keyof typeof BUSINESSES;

export function HomeExamples() {
  const [business, setBusiness] = useState<BusinessId>("bar");
  const example = BUSINESSES[business];

  return (
    <div className="stack">
      <div className="nav" role="group" aria-label="Tipo de negocio">
        {(Object.keys(BUSINESSES) as BusinessId[]).map((id) => (
          <button
            key={id}
            id={`ejemplo-${id}`}
            type="button"
            className="chip"
            aria-pressed={business === id}
            onClick={() => setBusiness(id)}
          >
            {BUSINESSES[id].label}
          </button>
        ))}
      </div>
      <p className="muted small">
        Textos de ejemplo escritos a mano para que veas el estilo. La herramienta los escribe para tu negocio, y deja entre corchetes
        los datos que solo tú sabes, como precios u horarios.
      </p>
      <div className="grid-2" aria-live="polite">
        <article className="card">
          <span className="card-label">📱 Publicación de Instagram</span>
          <p>{example.post.text}</p>
          <p className="hashtags">{example.post.tags}</p>
        </article>
        <article className="card">
          <span className="card-label">⭐ Respuesta a una reseña</span>
          <p className="muted small">{example.review.original}</p>
          <p>{example.review.reply}</p>
        </article>
        <article className="card">
          <span className="card-label">💬 Mensaje de WhatsApp</span>
          <p>{example.whatsapp}</p>
        </article>
        <article className="card">
          <span className="card-label">📍 Ficha de Google</span>
          <p>{example.google.description}</p>
          <p className="muted small">🔎 Así te buscan: {example.google.keywords}</p>
        </article>
      </div>
    </div>
  );
}
