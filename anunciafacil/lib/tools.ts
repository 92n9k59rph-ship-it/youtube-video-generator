// Herramientas que ofrece Tendalia. Este archivo lo usan tanto el panel (navegador) como el servidor,
// así que no debe importar nada del SDK de Anthropic ni de Supabase.

import type { PlanId } from "./plans";

export const TOOL_IDS = [
  "social",
  "email",
  "poster",
  "bio",
  "google",
  "review",
  "reply",
  "whatsapp",
  "promo",
  "reel",
  "loyalty",
] as const;
export type ToolId = (typeof TOOL_IDS)[number];

export type ToolInfo = {
  label: string;
  short: string;
  inputLabel: string;
  placeholder: string;
  examples: string[];
  maxLength: number;
  includes: string[];
  // Plan mínimo que la incluye (en el lanzamiento gratis y en la prueba, todos pueden probarlas).
  minPlan: PlanId;
};

export const TOOLS: Record<ToolId, ToolInfo> = {
  social: {
    label: "Redes sociales",
    short: "Publicaciones, Reel y calendario",
    inputLabel: "¿Qué quieres anunciar?",
    placeholder: "Esta semana tenemos 2x1 en cafés por las mañanas",
    examples: [
      "Esta semana tenemos 2x1 en cafés por las mañanas",
      "Ideas para publicar este mes",
      "Abrimos el domingo por la tarde por primera vez",
    ],
    minPlan: "basic",
    maxLength: 600,
    includes: [
      "De 3 a 5 publicaciones para Instagram y Facebook, con emojis y hashtags",
      "Idea de foto y mejor día para cada publicación",
      "Idea de Reel o TikTok plano a plano, con texto en pantalla y tipo de música",
      "Calendario de publicaciones para 4 semanas",
      "Consejos para tu tipo de negocio",
    ],
  },
  email: {
    label: "Correo a clientes",
    short: "Ofertas, novedades y felicitaciones",
    inputLabel: "¿Qué quieres contar a tus clientes por correo?",
    placeholder: "Avisar de que en diciembre abrimos también los lunes",
    examples: [
      "Felicitar las fiestas y dar las gracias por el año",
      "Presentar la nueva carta de otoño",
      "Oferta de bienvenida para quien venga por primera vez",
    ],
    minPlan: "basic",
    maxLength: 600,
    includes: [
      "3 asuntos para elegir",
      "El correo completo, con saludo y despedida",
      "Llamada a la acción (reservar, venir, responder…)",
      "Recordatorio de lo que exige la ley para enviar publicidad",
    ],
  },
  review: {
    label: "Responder reseña",
    short: "Respuestas para reseñas de Google",
    inputLabel: "Pega aquí la reseña (y las estrellas, si quieres)",
    placeholder: "2 estrellas. Tardaron mucho en atendernos y la comida llegó fría.",
    examples: [
      "5 estrellas. ¡El mejor corte de pelo que me han hecho! Volveré seguro.",
      "3 estrellas. Buen sitio pero un poco caro para lo que es.",
      "1 estrella. Llamé tres veces para reservar y nadie contestó.",
    ],
    minPlan: "pro",
    maxLength: 1500,
    includes: [
      "Detecta si la reseña es positiva, mixta o negativa",
      "3 respuestas listas para publicar: breve, cálida y profesional",
      "En las negativas, sin discutir y ofreciendo hablar en privado",
      "Consejo para gestionar esa reseña",
    ],
  },
  whatsapp: {
    label: "Mensaje de WhatsApp",
    short: "Avisos y ofertas para tus clientes",
    inputLabel: "¿Qué quieres avisar por WhatsApp?",
    placeholder: "Recordar que el sábado hay descuento del 20 % en toda la tienda",
    examples: [
      "Recordar a los clientes que pidan cita para Navidad",
      "Avisar de que ha llegado mercancía nueva",
      "Este viernes cerramos antes por inventario",
    ],
    minPlan: "pro",
    maxLength: 600,
    includes: [
      "3 versiones del mensaje: corta, con emojis y recordatorio",
      "Consejos para no resultar pesado y respetar a tus clientes",
    ],
  },
  poster: {
    label: "Cartel o menú",
    short: "Textos para el escaparate o la carta",
    inputLabel: "¿Para qué es el cartel o el menú?",
    placeholder: "Cartel para el escaparate: menú del día a 12 € de lunes a viernes",
    examples: [
      "Cartel de rebajas para el escaparate",
      "Descripciones cortas para 5 platos de la carta: croquetas, tortilla, pulpo, calamares y tarta de queso",
      "Cartel de «Se busca camarero/a»",
    ],
    minPlan: "basic",
    maxLength: 800,
    includes: [
      "2 o 3 propuestas de cartel con titular, subtítulo y llamada a la acción",
      "Descripciones apetecibles para los platos o productos de tu carta",
      "Consejos de diseño: tamaño de letra, colores y dónde colocarlo",
    ],
  },
  reply: {
    label: "Responder mensajes",
    short: "Respuestas a lo que te escriben tus clientes",
    inputLabel: "Pega aquí el mensaje que te ha escrito el cliente",
    placeholder: "Hola, ¿tenéis mesa para 6 el sábado a las 21:00? ¿Hay opciones sin gluten?",
    examples: [
      "Hola, ¿tenéis mesa para 6 el sábado a las 21:00? ¿Hay opciones sin gluten?",
      "¿Cuánto cuesta un corte y tinte? ¿Tenéis hueco esta semana?",
      "Compré un jersey y me queda pequeño, ¿puedo cambiarlo?",
    ],
    minPlan: "pro",
    maxLength: 1500,
    includes: [
      "Pegas lo que te escriben por Instagram, WhatsApp, Facebook o correo",
      "3 respuestas listas para enviar: breve, cálida y profesional",
      "Detecta qué pide el cliente y si hay que hacer algo",
      "No se inventa precios, horarios ni disponibilidad: te deja huecos",
    ],
  },
  bio: {
    label: "Perfil de redes",
    short: "Biografía de Instagram y TikTok",
    inputLabel: "¿Qué quieres destacar en tu perfil?",
    placeholder: "Somos una peluquería de barrio, especialistas en color, y se reserva por WhatsApp",
    examples: [
      "Quiero que se note que somos un bar familiar de toda la vida",
      "Destacar que hacemos envíos a domicilio en toda la ciudad",
      "Abrimos hace poco y queremos que nos conozcan en el barrio",
    ],
    minPlan: "basic",
    maxLength: 600,
    includes: [
      "3 biografías para Instagram y TikTok (máximo 150 caracteres)",
      "Nombre para el perfil que ayuda a que te encuentren",
      "Ideas para las historias destacadas",
      "Texto para el botón o enlace del perfil",
    ],
  },
  google: {
    label: "Ficha de Google",
    short: "Sal en las búsquedas de tu zona",
    inputLabel: "¿Qué hace especial a tu negocio y qué buscan tus clientes?",
    placeholder: "Peluquería en el centro, cortes de hombre y mujer, sin cita los sábados por la mañana",
    examples: [
      "Bar de tapas con terraza, menú del día y fútbol en la tele",
      "Tienda de ropa infantil, de 0 a 12 años, marcas españolas",
      "Gimnasio pequeño con clases de pilates y entrenador personal",
    ],
    minPlan: "pro",
    maxLength: 800,
    includes: [
      "Descripción para tu ficha de Google (máximo 750 caracteres)",
      "Palabras con las que te buscan tus clientes en tu zona",
      "3 publicaciones para tu ficha: novedad, oferta y evento",
      "Preguntas frecuentes con su respuesta, listas para añadir",
      "Consejos para salir más arriba en Google Maps",
    ],
  },
  promo: {
    label: "Campaña completa",
    short: "Una oferta en todos tus canales a la vez",
    inputLabel: "¿Qué campaña quieres hacer?",
    placeholder: "Del 1 al 15 de diciembre, 15 % de descuento en tarjetas regalo para Navidad",
    examples: [
      "Campaña de vuelta al cole con un regalo por compras de más de 30 €",
      "Celebrar nuestro 5.º aniversario con una semana de sorpresas",
      "Llenar los martes, que son el día más flojo",
    ],
    minPlan: "premium",
    maxLength: 800,
    includes: [
      "Nombre y mensaje principal de la campaña",
      "Plan día a día de 2 semanas",
      "Publicaciones, correo, WhatsApp y cartel, todo con el mismo mensaje",
      "Cómo medir si ha funcionado",
    ],
  },
  reel: {
    label: "Guion de vídeo",
    short: "Reels, TikTok y YouTube Shorts",
    inputLabel: "¿De qué quieres hacer el vídeo?",
    placeholder: "Enseñar cómo preparamos nuestra tarta de queso, de principio a fin",
    examples: [
      "Un día normal en la peluquería, en 30 segundos",
      "Presentar al equipo de forma divertida",
      "Antes y después de una reforma de la tienda",
    ],
    minPlan: "premium",
    maxLength: 600,
    includes: [
      "3 ganchos para el primer segundo",
      "Guion plano a plano, con lo que se ve, lo que se dice y el texto en pantalla",
      "Subtítulos listos para copiar",
      "Texto para la publicación y portada del vídeo",
    ],
  },
  loyalty: {
    label: "Fidelizar clientes",
    short: "Puntos, sorteos y ventajas para que vuelvan",
    inputLabel: "¿Cómo quieres premiar a tus clientes?",
    placeholder: "Quiero que los clientes del menú del día vuelvan más a menudo",
    examples: [
      "Una tarjeta de sellos para el café",
      "Un sorteo en Instagram para ganar seguidores del barrio",
      "Ventajas para clientes que traigan a un amigo",
    ],
    minPlan: "premium",
    maxLength: 600,
    includes: [
      "3 ideas para que tus clientes vuelvan, con sus pros y contras",
      "Las normas del programa o del sorteo, claras y sencillas",
      "Textos para anunciarlo en el local y en redes",
      "Lo que conviene revisar para hacerlo bien según la ley",
    ],
  },
};

export function isToolId(value: unknown): value is ToolId {
  return typeof value === "string" && (TOOL_IDS as readonly string[]).includes(value);
}
