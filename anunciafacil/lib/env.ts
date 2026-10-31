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

// Mostrar en público el precio y lo de «gratis». Se ve por defecto; SHOW_PRICING=false lo oculta.
export function showPricing(): boolean {
  return process.env.SHOW_PRICING !== "false";
}

// ¿Puede la gente registrarse y usar la app? Hasta que APP_OPEN=true, solo los administradores.
export function appOpen(): boolean {
  return process.env.APP_OPEN === "true";
}

const DEFAULT_WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScf0UmVpDGv5DPjTBJ-xVkWwYuwRCAgBFGuci-OX_OG9EuCxQ/viewform";

export function waitlistUrl(): string {
  return process.env.WAITLIST_URL || DEFAULT_WAITLIST_URL;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && admins.includes(email.toLowerCase()));
}
