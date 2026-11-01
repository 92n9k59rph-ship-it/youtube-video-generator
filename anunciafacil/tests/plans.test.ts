import { describe, expect, it } from "vitest";
import { PLANS, PLAN_IDS, canUseTool, isPlanId, planFromPriceId, planLimit } from "@/lib/plans";
import { TOOLS, TOOL_IDS } from "@/lib/tools";

describe("planes", () => {
  it("hay tres planes: Básico 15 €, Pro 40 € y Premium 55 €", () => {
    expect(PLAN_IDS).toEqual(["basic", "pro", "premium"]);
    expect(PLANS.basic.priceEur).toBe(15);
    expect(PLANS.pro.priceEur).toBe(40);
    expect(PLANS.premium.priceEur).toBe(55);
  });

  it("límites por defecto: 60, 200 y 400 generaciones al mes", () => {
    expect(planLimit("basic", {})).toBe(60);
    expect(planLimit("pro", {})).toBe(200);
    expect(planLimit("premium", {})).toBe(400);
  });

  it("los límites se pueden cambiar desde Vercel", () => {
    expect(planLimit("pro", { PRO_MONTHLY_GENERATIONS: "800" })).toBe(800);
    expect(planLimit("premium", { PREMIUM_MONTHLY_GENERATIONS: "1000" })).toBe(1000);
    expect(planLimit("basic", { MONTHLY_GENERATIONS: "abc" })).toBe(60);
  });

  it("solo reconoce planes que existen", () => {
    expect(isPlanId("premium")).toBe(true);
    expect(isPlanId("ilimitado")).toBe(false);
    expect(isPlanId(null)).toBe(false);
  });

  it("el webhook sabe qué plan es cada precio de Stripe", () => {
    const env = { STRIPE_PRICE_ID: "price_b", STRIPE_PRICE_ID_PRO: "price_p", STRIPE_PRICE_ID_PREMIUM: "price_x" };
    expect(planFromPriceId("price_b", env)).toBe("basic");
    expect(planFromPriceId("price_p", env)).toBe("pro");
    expect(planFromPriceId("price_x", env)).toBe("premium");
    expect(planFromPriceId(undefined, env)).toBe("basic");
  });
});

describe("herramientas por plan", () => {
  it("cada plan desbloquea lo suyo y lo de los planes inferiores", () => {
    expect(canUseTool("basic", { subscribed: true, plan: "basic" })).toBe(true);
    expect(canUseTool("pro", { subscribed: true, plan: "basic" })).toBe(false);
    expect(canUseTool("premium", { subscribed: true, plan: "basic" })).toBe(false);
    expect(canUseTool("pro", { subscribed: true, plan: "pro" })).toBe(true);
    expect(canUseTool("premium", { subscribed: true, plan: "pro" })).toBe(false);
    expect(canUseTool("premium", { subscribed: true, plan: "premium" })).toBe(true);
  });

  it("un plan desconocido cuenta como Básico", () => {
    expect(canUseTool("pro", { subscribed: true, plan: "raro" })).toBe(false);
  });

  it("en el lanzamiento gratis y en la prueba se puede probar todo", () => {
    expect(canUseTool("premium", { subscribed: false, plan: "basic" })).toBe(true);
  });

  it("reparto de herramientas", () => {
    const byPlan = (plan: string) => TOOL_IDS.filter((id) => TOOLS[id].minPlan === plan);
    expect(byPlan("basic")).toEqual(["social", "email", "poster", "bio"]);
    expect(byPlan("pro")).toEqual(["google", "review", "reply", "whatsapp"]);
    expect(byPlan("premium")).toEqual(["promo", "reel", "loyalty"]);
  });
});
