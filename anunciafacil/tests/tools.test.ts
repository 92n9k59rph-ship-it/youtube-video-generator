import { describe, expect, it } from "vitest";
import { TOOLS, TOOL_IDS, isToolId } from "@/lib/tools";

describe("herramientas", () => {
  it("reconoce solo las herramientas que existen", () => {
    for (const id of TOOL_IDS) expect(isToolId(id)).toBe(true);
    expect(isToolId("contabilidad")).toBe(false);
    expect(isToolId(undefined)).toBe(false);
    expect(isToolId(42)).toBe(false);
  });

  it("cada herramienta tiene textos y ejemplos para el panel", () => {
    for (const id of TOOL_IDS) {
      const tool = TOOLS[id];
      expect(tool.label.length).toBeGreaterThan(0);
      expect(tool.examples.length).toBeGreaterThan(0);
      expect(tool.includes.length).toBeGreaterThan(0);
      for (const example of tool.examples) expect(example.length).toBeLessThanOrEqual(tool.maxLength);
    }
  });
});
