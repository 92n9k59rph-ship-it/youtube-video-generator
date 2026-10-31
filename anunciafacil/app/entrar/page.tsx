import { redirect } from "next/navigation";
import Script from "next/script";
import { appOpen, isAdminEmail, siteUrl, waitlistUrl } from "@/lib/env";
import { supabaseForRequest } from "@/lib/supabase";

async function sendLink(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) redirect("/entrar?error=correo");
  if (formData.get("acepto") !== "si") redirect("/entrar?error=terminos");
  if (!appOpen() && !isAdminEmail(email)) redirect("/entrar?error=cerrado");

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
  cerrado: "Anuncio Fácil todavía no está abierto. Apúntate a la lista de espera y te avisamos.",
};

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; enviado?: string }>;
}) {
  const { error, enviado } = await searchParams;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const open = appOpen();

  return (
    <main>
      <div className="wrap stack" style={{ maxWidth: 520 }}>
        {!open && (
          <section className="panel">
            <span className="pill" style={{ alignSelf: "flex-start" }}>Próximamente</span>
            <h1 style={{ fontSize: "2rem" }}>Muy pronto podrás entrar</h1>
            <p className="muted">
              Estamos ultimando Anuncio Fácil. Apúntate a la lista de espera y te avisaremos por correo el día que abra.
            </p>
            <a className="btn btn-primary" href={waitlistUrl()} target="_blank" rel="noopener noreferrer">
              Apuntarme a la lista de espera
            </a>
          </section>
        )}
        {!open && error === "cerrado" && <p className="notice notice-error">{ERRORS.cerrado}</p>}
        <details className="panel" open={open || (Boolean(error) && error !== "cerrado") || Boolean(enviado)} style={open ? undefined : { padding: 20 }}>
        {!open && <summary style={{ cursor: "pointer", fontWeight: 700 }}>Acceso para el equipo</summary>}
        <form action={sendLink} className="stack" style={{ gap: 14 }}>
          <h1 style={{ fontSize: "2rem" }}>Entrar o crear cuenta</h1>
          <p className="muted">
            Te enviamos un enlace a tu correo. Ábrelo desde este mismo dispositivo y entrarás directamente, sin contraseña.
          </p>
          {enviado && <p className="notice notice-ok">¡Listo! Revisa tu correo (y la carpeta de spam) y pulsa el enlace.</p>}
          {error && error !== "cerrado" && ERRORS[error] && <p className="notice notice-error">{ERRORS[error]}</p>}
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
        </details>
      </div>
    </main>
  );
}
