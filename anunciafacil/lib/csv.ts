// Saca todos los textos de un resultado, en orden, para leerlos fuera de la app.
export function flatten(value: unknown): string[] {
  if (typeof value === "string") return value.trim() ? [value] : [];
  if (typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (value && typeof value === "object") return Object.values(value).flatMap(flatten);
  return [];
}

// Escapa una celda y evita que una hoja de cálculo la ejecute como fórmula.
export function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}
