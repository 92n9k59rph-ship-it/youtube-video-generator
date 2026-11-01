// Correo de contacto que se muestra en la web (pie, textos legales, errores).
// Para cambiarlo sin tocar el código: en Vercel, NEXT_PUBLIC_CONTACT_EMAIL y Redeploy.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "anunciafacil.contacto@gmail.com";
