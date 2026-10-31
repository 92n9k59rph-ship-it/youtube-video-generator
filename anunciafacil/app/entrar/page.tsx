import { redirect } from "next/navigation";
import Script from "next/script";
import { siteUrl } from "@/lib/env";
import { supabaseForRequest } from "@/lib/supabase";

async function sendLink(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) redirect("/entrar?error=correo");
  if (formData.get("acepto") !== "si") redirect("/entrar?error=terminos");

  // Si el CAPTCHA está activado (Cloudflare Turnstile), su respuesta llega en este campo.
  const captchaToken = String(formData.get("cf-turnstile-response") ?? "") || undefined;
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !captchaToken) redirect("/entrar?error=captcha");

  const supabase = await supabaseForRequest();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback`, captchaToken },
  });
  redirect(error ? "/entrar?error=envio" : "/entrar?enviado=1");
}

const ERRORS: Record<string, string> = {
  correo: "Escribe un correo válido.",
  terminos: "Para crear la cuenta tienes que aceptar los términos y la política de privacidad.",
  envio: "No hemos podido enviar el enlace. Espera un minuto y vuelve a intentarlo.",
  enlace: "El enlace no es válido o ha caducado. Pide uno nuevo.",
  captcha: "Completa la comprobación de seguridad antes de enviar.",
};

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; enviado?: string }>;
}) {
  const { error, enviado } = await searchParams;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <main>
      <div className="wrap" style={{ maxWidth: 520 }}>
        <form action={sendLink} className="panel">
          <h1 style={{ fontSize: "2rem" }}>Entrar o crear cuenta</h1>
          <p className="muted">
            Te enviamos un enlace a tu correo. Ábrelo desde este mismo dispositivo y entrarás directamente, sin contraseña.
          </p>
          {enviado && <p className="notice notice-ok">¡Listo! Revisa tu correo (y la carpeta de spam) y pulsa el enlace.</p>}
          {error && ERRORS[error] && <p className="notice notice-error">{ERRORS[error]}</p>}
          <label htmlFor="email">
            Correo electrónico
            <input id="email" name="email" type="email" autoComplete="email" required />
          </label>
          <label htmlFor="acepto" style={{ flexDirection: "row", alignItems: "flex-start", fontWeight: 400 }}>
            <input id="acepto" name="acepto" type="checkbox" value="si" required style={{ width: "auto", marginTop: 4 }} />
            <span>
              Acepto los <a href="/terminos">términos de uso</a> y la <a href="/privacidad">política de privacidad</a>.
            </span>
          </label>
          {turnstileSiteKey && (
            <>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
              <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language="es" />
            </>
          )}
          <button className="btn btn-primary" type="submit">Enviarme el enlace</button>
        </form>
      </div>
    </main>
  );
}
