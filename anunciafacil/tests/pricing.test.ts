import { describe, expect, it } from "vitest";
import { costUsd } from "@/lib/pricing";

describe("coste de la IA", () => {
  it("usa el precio de Claude Opus 5.5 (4 $ y 20 $ por millón de tokens)", () => {
    expect(costUsd("claude-opus-5-5", 1_000_000, 1_000_000)).toBeCloseTo(24);
    expect(costUsd("claude-opus-5-5", 1_000, 2_000)).toBeCloseTo(0.044);
  });

  it("distingue Opus 5.5 de Opus 5", () => {
    expect(costUsd("claude-opus-5", 1_000_000, 0)).toBeCloseTo(5);
  });

  it("un modelo desconocido se calcula con el precio de Opus 5.5 para no quedarse corto", () => {
    expect(costUsd("modelo-nuevo", 1_000_000, 0)).toBeCloseTo(4);
  });
});
