import { freeLaunch, intEnv } from "./env";
import { isPlanId, planLimit } from "./plans";
import { isSubscribed, supabaseAdmin, type Profile } from "./supabase";

export type Usage = {
  used: number;
  limit: number;
  period: "gratis" | "mes" | "lanzamiento";
};

// Sin suscripción: FREE_GENERATIONS gratis en total (0 = sin prueba gratis). Con suscripción: un máximo al mes.
// Durante el lanzamiento gratis: LAUNCH_MONTHLY_GENERATIONS al mes para todos los que no pagan.
export function usagePlan(profile: Profile): { limit: number; period: Usage["period"]; since: string | null } {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  if (isSubscribed(profile)) {
    const plan = isPlanId(profile.plan) ? profile.plan : "basic";
    return { limit: planLimit(plan), period: "mes", since: start.toISOString() };
  }
  if (freeLaunch()) {
    return { limit: intEnv("LAUNCH_MONTHLY_GENERATIONS", 10), period: "lanzamiento", since: start.toISOString() };
  }
  return { limit: intEnv("FREE_GENERATIONS", 3), period: "gratis", since: null };
}

export async function getUsage(profile: Profile): Promise<Usage> {
  const plan = usagePlan(profile);

  let query = supabaseAdmin()
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", profile.id);
  if (plan.since) query = query.gte("created_at", plan.since);

  const { count, error } = await query;
  if (error) throw error;

  return { used: count ?? 0, limit: plan.limit, period: plan.period };
}

// Reserva un uso de forma atómica en la base de datos. Devuelve null si ya no quedan usos.
export async function reserveGeneration(profile: Profile, tool: string, request: string): Promise<string | null> {
  const plan = usagePlan(profile);
  const { data, error } = await supabaseAdmin().rpc("reserve_generation", {
    p_user: profile.id,
    p_tool: tool,
    p_request: request,
    p_limit: plan.limit,
    p_since: plan.since,
  });
  if (error) throw error;
  return (data as string | null) ?? null;
}

