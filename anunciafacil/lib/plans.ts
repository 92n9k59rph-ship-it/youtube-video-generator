// Planes de pago. Este archivo lo usan la portada, el panel y el servidor;
// no debe importar nada del SDK de Stripe ni de Supabase.

export const PLAN_IDS = ["basic", "pro"] as const;
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
};

export const PLANS: Record<PlanId, PlanInfo> = {
  basic: {
    name: "Básico",
    priceEur: 9.99,
    priceLabel: "9,99 €",
    limitEnv: "MONTHLY_GENERATIONS",
    defaultLimit: 100,
    stripePriceEnv: "STRIPE_PRICE_ID",
    forWho: "Para un bar, una peluquería o una tienda que publica varias veces por semana.",
  },
  pro: {
    name: "Pro",
    priceEur: 30,
    priceLabel: "30 €",
    limitEnv: "PRO_MONTHLY_GENERATIONS",
    defaultLimit: 500,
    stripePriceEnv: "STRIPE_PRICE_ID_PRO",
    forWho: "Para negocios con mucho movimiento, varias tiendas o quien lleva las redes de otros negocios.",
  },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLAN_IDS as readonly string[]).includes(value);
}

export function planLimit(plan: PlanId, env: Record<string, string | undefined> = process.env): number {
  const parsed = Number.parseInt(env[PLANS[plan].limitEnv] ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : PLANS[plan].defaultLimit;
}

// ¿Puede este cliente usar esta herramienta? Solo los suscriptores del plan Básico tienen herramientas bloqueadas:
// durante el lanzamiento gratis y en la prueba gratis se puede probar todo, para que vean lo que ofrece el Pro.
export function canUseTool(proOnly: boolean, opts: { subscribed: boolean; plan: string | null | undefined }): boolean {
  if (!proOnly) return true;
  if (!opts.subscribed) return true;
  return opts.plan === "pro";
}
