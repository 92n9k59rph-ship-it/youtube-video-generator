import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({
  isSubscribed: (p: Profile | null) => p?.subscription_status === "active" || p?.subscription_status === "trialing",
  supabaseAdmin: () => {
    throw new Error("no se usa en estas pruebas");
  },
}));

const { usagePlan } = await import("@/lib/usage");

function profile(status: string, plan = "basic"): Profile {
  return {
    id: "u1",
    email: "a@b.es",
    business_name: "",
    business_type: "Bar",
    city: "",
    tone: "cercano",
    stripe_customer_id: null,
    subscription_status: status,
    plan,
    current_period_end: null,
  };
}

const ENV_KEYS = [
  "FREE_LAUNCH",
  "FREE_GENERATIONS",
  "MONTHLY_GENERATIONS",
  "PRO_MONTHLY_GENERATIONS",
  "PREMIUM_MONTHLY_GENERATIONS",
  "LAUNCH_MONTHLY_GENERATIONS",
];

describe("límites de uso", () => {
  beforeEach(() => {
    for (const key of ENV_KEYS) delete process.env[key];
  });
  afterEach(() => {
    for (const key of ENV_KEYS) delete process.env[key];
  });

  it("sin lanzamiento: 3 gratis en total para quien no paga", () => {
    expect(usagePlan(profile("none"))).toEqual({ limit: 3, period: "gratis", since: null });
  });

  it("en el lanzamiento gratis: 10 al mes desde el día 1", () => {
    process.env.FREE_LAUNCH = "true";
    const plan = usagePlan(profile("none"));
    expect(plan.limit).toBe(10);
    expect(plan.period).toBe("lanzamiento");
    expect(new Date(plan.since!).getUTCDate()).toBe(1);
  });

  it("los suscriptores tienen su límite mensual aunque haya lanzamiento", () => {
    process.env.FREE_LAUNCH = "true";
    expect(usagePlan(profile("active")).limit).toBe(60);
    expect(usagePlan(profile("active")).period).toBe("mes");
  });

  it("Pro tiene 200 al mes y Premium 400", () => {
    expect(usagePlan(profile("active", "pro")).limit).toBe(200);
    expect(usagePlan(profile("active", "premium")).limit).toBe(400);
    expect(usagePlan(profile("active", "otro")).limit).toBe(60);
  });

  it("una suscripción cancelada o impagada no da el límite de pago", () => {
    expect(usagePlan(profile("canceled")).period).toBe("gratis");
    expect(usagePlan(profile("past_due")).period).toBe("gratis");
  });

  it("los límites se pueden cambiar desde Vercel", () => {
    process.env.FREE_GENERATIONS = "0";
    process.env.MONTHLY_GENERATIONS = "50";
    expect(usagePlan(profile("none")).limit).toBe(0);
    expect(usagePlan(profile("active")).limit).toBe(50);
  });

  it("un valor no válido usa el valor por defecto", () => {
    process.env.FREE_GENERATIONS = "muchas";
    expect(usagePlan(profile("none")).limit).toBe(3);
  });
});
