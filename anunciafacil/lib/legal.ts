import { CONTACT_EMAIL } from "./contact";

// Datos del titular para los textos legales. Se rellenan en Vercel (Settings → Environment Variables)
// y después se hace Redeploy, así los datos personales no tienen que estar en el código.
function envOr(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export const LEGAL = {
  owner: envOr("LEGAL_OWNER_NAME", "David Lázaro"),
  nif: envOr("LEGAL_NIF", "[NIF]"),
  address: envOr("LEGAL_ADDRESS", "[DIRECCIÓN]"),
  updated: envOr("LEGAL_UPDATED", "[FECHA]"),
  supabaseRegion: envOr("LEGAL_SUPABASE_REGION", "la región elegida para el proyecto"),
  email: CONTACT_EMAIL,
};
