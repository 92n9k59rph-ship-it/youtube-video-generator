// Planes de pago. Este archivo lo usan la portada, el panel y el servidor;
// no debe importar nada del SDK de Stripe ni de Supabase.

export const PLAN_IDS = ["basic", "pro", "premium"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export type PlanInfo = {
  name: string;
  priceEur: number;
  priceLabel: string;
  // Variable de entorno con el límite mensual y su valor por defecto.
  limitEnv: string;
  defaultLimit: number;
  // Variable de entorno con el ID del precio en Stripe.
  stripePriceEnv: string;
  forWho: string;
  // Lo que añade este plan respecto al anterior (para la portada y el panel).
  extras: string[];
};

export const PLANS: Record<PlanId, PlanInfo> = {
  basic: {
    name: "Básico",
    priceEur: 15,
    priceLabel: "15 €",
    limitEnv: "MONTHLY_GENERATIONS",
    defaultLimit: 60,
    stripePriceEnv: "STRIPE_PRICE_ID",
    forWho: "Para un bar, una peluquería o una tienda que publica varias veces por semana.",
    extras: [
      "Publicaciones para redes, con idea de Reel y calendario",
      "Correos para tus clientes",
      "Carteles, menús y cartas",
      "Perfil de Instagram y TikTok",
      "Historial con buscador y botón de copiar",
    ],
  },
  pro: {
    name: "Pro",
    priceEur: 40,
    priceLabel: "40 €",
    limitEnv: "PRO_MONTHLY_GENERATIONS",
    defaultLimit: 200,
    stripePriceEnv: "STRIPE_PRICE_ID_PRO",
    forWho: "Para negocios que quieren más clientes: que los encuentren en Google y contestar rápido.",
    extras: [
      "Todo lo del Básico",
      "Ficha de Google para salir en las búsquedas de tu zona",
      "Respuestas a reseñas de Google",
      "Respuestas a los mensajes de tus clientes",
      "Mensajes de WhatsApp",
    ],
  },
  premium: {
    name: "Premium",
    priceEur: 55,
    priceLabel: "55 €",
    limitEnv: "PREMIUM_MONTHLY_GENERATIONS",
    defaultLimit: 400,
    stripePriceEnv: "STRIPE_PRICE_ID_PREMIUM",
    forWho: "Para negocios con mucho movimiento, varias tiendas o quien lleva las redes de otros negocios.",
    extras: [
      "Todo lo del Pro",
      "Campañas completas: oferta, redes, correo, WhatsApp y cartel a la vez",
      "Guiones de vídeo para Reels, TikTok y YouTube Shorts",
      "Ideas para fidelizar: tarjetas de puntos, sorteos y ventajas",
      "Descarga de todo tu historial",
    ],
  },
};

const RANK: Record<PlanId, number> = { basic: 0, pro: 1, premium: 2 };

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLAN_IDS as readonly string[]).includes(value);
}

export function planLimit(plan: PlanId, env: Record<string, string | undefined> = process.env): number {
  const parsed = Number.parseInt(env[PLANS[plan].limitEnv] ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : PLANS[plan].defaultLimit;
}

// ¿Llega el plan contratado al plan mínimo que pide una herramienta o función?
// Solo los suscriptores tienen cosas bloqueadas: durante el lanzamiento gratis y en la prueba gratis
// se puede probar todo, para que vean lo que ofrecen los planes superiores.
export function canUseTool(
  minPlan: PlanId,
  opts: { subscribed: boolean; plan: string | null | undefined },
): boolean {
  if (minPlan === "basic") return true;
  if (!opts.subscribed) return true;
  const plan = isPlanId(opts.plan) ? opts.plan : "basic";
  return RANK[plan] >= RANK[minPlan];
}

// Plan que corresponde a un precio de Stripe (para el webhook).
export function planFromPriceId(priceId: string | null | undefined, env: Record<string, string | undefined> = process.env): PlanId {
  if (priceId && priceId === env[PLANS.premium.stripePriceEnv]) return "premium";
  if (priceId && priceId === env[PLANS.pro.stripePriceEnv]) return "pro";
  return "basic";
}
