import { describe, expect, it } from "vitest";
import { csvCell, flatten } from "@/lib/csv";

describe("descarga del historial", () => {
  it("saca todos los textos de un resultado", () => {
    expect(flatten({ a: "uno", b: ["dos", { c: "tres" }], d: 4, e: "" })).toEqual(["uno", "dos", "tres", "4"]);
  });

  it("escapa comillas y evita fórmulas en la hoja de cálculo", () => {
    expect(csvCell('Hola "amigo"')).toBe('"Hola ""amigo"""');
    expect(csvCell("=SUMA(A1)")).toBe(`"'=SUMA(A1)"`);
  });
});
