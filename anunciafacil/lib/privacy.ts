// Web en privado: qué páginas se pueden abrir siempre y quién puede ver el resto.
// Lo usa middleware.ts; está aparte para poder probarlo.

// Páginas que siempre se pueden abrir, aunque la web esté en privado:
// la de «Muy pronto», la de entrar (para los administradores), el acceso y los archivos de la app.
const ALWAYS_OPEN = [
  "/muy-pronto",
  "/entrar",
  "/auth/",
  "/api/",
  "/manifest.webmanifest",
  "/robots.txt",
  "/icon",
  "/apple-icon",
];

// Nombre interno de la cookie de vista previa (no se cambia para no cerrar las vistas previas ya abiertas).
export const PREVIEW_COOKIE = "pregonia_vista";

export function isAlwaysOpen(path: string): boolean {
  return ALWAYS_OPEN.some((prefix) => path === prefix || path.startsWith(prefix));
}

// ¿Puede esta visita ver la web completa?
export function canSeeSite(opts: {
  sitePublic: boolean;
  path: string;
  isAdmin: boolean;
  previewCode: string | undefined;
  previewCookie: string | undefined;
}): boolean {
  if (opts.sitePublic || opts.isAdmin || isAlwaysOpen(opts.path)) return true;
  return Boolean(opts.previewCode) && opts.previewCookie === opts.previewCode;
}
