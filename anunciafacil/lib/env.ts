// Lee una variable de entorno obligatoria y falla con un mensaje claro si falta.
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}. Revisa GUIA.md.`);
  }
  return value;
}

export function intEnv(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function siteUrl(): string {
  return requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
}

// Lanzamiento gratis: mientras FREE_LAUNCH=true nadie paga (con un límite de usos al mes).
// Para empezar a cobrar, se pone FREE_LAUNCH=false en Vercel y se hace Redeploy.
export function freeLaunch(): boolean {
  return process.env.FREE_LAUNCH === "true";
}
