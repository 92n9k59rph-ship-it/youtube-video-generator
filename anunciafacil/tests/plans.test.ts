import { describe, expect, it } from "vitest";
import { PLANS, PLAN_IDS, isPlanId, planLimit } from "@/lib/plans";

describe("planes", () => {
  it("hay un plan Básico de 9,99 € y un plan Pro de 30 €", () => {
    expect(PLAN_IDS).toEqual(["basic", "pro"]);
    expect(PLANS.basic.priceEur).toBe(9.99);
    expect(PLANS.pro.priceEur).toBe(30);
  });

  it("límites por defecto: 100 y 500 generaciones al mes", () => {
    expect(planLimit("basic", {})).toBe(100);
    expect(planLimit("pro", {})).toBe(500);
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
