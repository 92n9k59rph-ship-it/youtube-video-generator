// Precios oficiales de la API de Claude en dólares por millón de tokens (entrada, salida).
// Revisa platform.claude.com/docs si cambian. Los modelos de reserva (fallback) están por si la IA cambia de modelo.
const PRICES: Array<[prefix: string, input: number, output: number]> = [
  ["claude-opus-5-5", 4, 20],
  ["claude-sonnet-5-5", 2, 10],
  ["claude-haiku-5-5", 0.1, 0.5],
  ["claude-opus-5", 5, 25],
  ["claude-opus-4-8", 5, 25],
  ["claude-sonnet-5", 2, 10],
];

export function costUsd(model: string, inputTokens: number, outputTokens: number): number {
  const price = PRICES.find(([prefix]) => model.startsWith(prefix)) ?? PRICES[0];
  return (inputTokens * price[1] + outputTokens * price[2]) / 1_000_000;
}
