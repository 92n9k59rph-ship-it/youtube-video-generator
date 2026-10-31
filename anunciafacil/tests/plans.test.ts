import { describe, expect, it } from "vitest";
import { PLANS, PLAN_IDS, isPlanId, planLimit } from "@/lib/plans";

describe("planes", () => {
  it("hay un plan Básico de 9,99 € y un plan Pro de 30 €", () => {
    expect(PLAN_IDS).toEqual(["basic", "pro"]);
    expect(PLANS.basic.priceEur).toBe(9.99);
    expect(PLANS.pro.priceEur).toBe(30);
  });

  it("límites por defecto: 50 y 200 generaciones al mes", () => {
    expect(planLimit("basic", {})).toBe(50);
    expect(planLimit("pro", {})).toBe(200);
  });

  it("los límites se pueden cambiar desde Vercel", () => {
    expect(planLimit("pro", { PRO_MONTHLY_GENERATIONS: "800" })).toBe(800);
    expect(planLimit("basic", { MONTHLY_GENERATIONS: "50" })).toBe(50);
  });

  it("solo reconoce planes que existen", () => {
    expect(isPlanId("pro")).toBe(true);
    expect(isPlanId("ilimitado")).toBe(false);
    expect(isPlanId(null)).toBe(false);
  });
});

describe("herramientas por plan", () => {
  it("el plan Básico no puede usar las herramientas Pro", async () => {
    const { canUseTool } = await import("@/lib/plans");
    expect(canUseTool(true, { subscribed: true, plan: "basic" })).toBe(false);
    expect(canUseTool(false, { subscribed: true, plan: "basic" })).toBe(true);
  });

  it("el plan Pro puede usarlas todas", async () => {
    const { canUseTool } = await import("@/lib/plans");
    expect(canUseTool(true, { subscribed: true, plan: "pro" })).toBe(true);
  });

  it("en el lanzamiento gratis y en la prueba se puede probar todo", async () => {
    const { canUseTool } = await import("@/lib/plans");
    expect(canUseTool(true, { subscribed: false, plan: "basic" })).toBe(true);
  });

  it("responder mensajes, reseñas y WhatsApp son del plan Pro", async () => {
    const { TOOLS } = await import("@/lib/tools");
    expect(TOOLS.reply.proOnly && TOOLS.review.proOnly && TOOLS.whatsapp.proOnly).toBe(true);
    expect(TOOLS.social.proOnly || TOOLS.email.proOnly || TOOLS.poster.proOnly).toBe(false);
  });
});
