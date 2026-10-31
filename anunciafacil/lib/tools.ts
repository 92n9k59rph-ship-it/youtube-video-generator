// Herramientas que ofrece Anuncio Fácil. Este archivo lo usan tanto el panel (navegador) como el servidor,
// así que no debe importar nada del SDK de Anthropic ni de Supabase.

export const TOOL_IDS = ["social", "email", "poster", "review", "whatsapp", "reply"] as const;
export type ToolId = (typeof TOOL_IDS)[number];

export type ToolInfo = {
  label: string;
  short: string;
  inputLabel: string;
  placeholder: string;
  examples: string[];
  maxLength: number;
  includes: string[];
  // Solo para el plan Pro (en el lanzamiento gratis, todos pueden probarlas).
  proOnly: boolean;
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
    proOnly: false,
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
    proOnly: false,
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
    proOnly: true,
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
    proOnly: true,
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
    proOnly: false,
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
    proOnly: true,
    maxLength: 1500,
    includes: [
      "Pegas lo que te escriben por Instagram, WhatsApp, Facebook o correo",
      "3 respuestas listas para enviar: breve, cálida y profesional",
      "Detecta qué pide el cliente y si hay que hacer algo",
      "No se inventa precios, horarios ni disponibilidad: te deja huecos",
    ],
  },
};

export function isToolId(value: unknown): value is ToolId {
  return typeof value === "string" && (TOOL_IDS as readonly string[]).includes(value);
}
