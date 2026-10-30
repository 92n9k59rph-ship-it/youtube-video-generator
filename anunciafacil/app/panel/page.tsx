import { redirect } from "next/navigation";
import { currentUserAndProfile, isSubscribed } from "@/lib/supabase";
import { freeLaunch, intEnv } from "@/lib/env";
import { TOOLS, isToolId } from "@/lib/tools";
import { getUsage } from "@/lib/usage";
import { deleteAccount, saveBusiness, signOut } from "./actions";
import { Generator, Results } from "./Generator";
import type { ToolResult } from "@/lib/generator";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  active: "Suscripción activa",
  trialing: "Periodo de prueba",
  past_due: "Pago pendiente",
  canceled: "Suscripción cancelada",
  unpaid: "Pago pendiente",
  none: "Sin suscripción",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; negocio?: string; ver?: string; borrar?: string }>;
}) {
  const { supabase, user, profile } = await currentUserAndProfile();
  if (!user || !profile) redirect("/entrar");

  const { pago, negocio, ver, borrar } = await searchParams;
  const subscribed = isSubscribed(profile);
  const usage = await getUsage(profile);
  const hasBusiness = Boolean(profile.business_type);
  const launch = freeLaunch();

  const { data: history } = await supabase
    .from("generations")
    .select("id, tool, request, created_at")
    .eq("status", "done")
    .order("created_at", { ascending: false })
    .limit(10);

  // Una generación antigua que el cliente quiere volver a ver (la seguridad de Supabase solo deja ver las suyas).
  let previous: { output: ToolResult; request: string; created_at: string } | null = null;
  if (ver && /^[0-9a-f-]{36}$/i.test(ver)) {
    const { data } = await supabase
      .from("generations")
      .select("tool, request, result, created_at")
      .eq("id", ver)
      .eq("status", "done")
      .maybeSingle();
    if (data && isToolId(data.tool)) {
      previous = {
        output: { tool: data.tool, result: data.result } as ToolResult,
        request: data.request,
        created_at: data.created_at,
      };
    }
  }

  return (
    <main>
      <div className="wrap stack">
        <div className="card-head" style={{ flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "2.2rem" }}>Hola{profile.business_name ? `, ${profile.business_name}` : ""} 👋</h1>
          <form action={signOut}>
            <button className="btn btn-ghost" type="submit">Salir</button>
          </form>
        </div>

        {pago === "ok" && (
          <p className="notice notice-ok">
            ¡Gracias por suscribirte! Si tu plan aún no aparece como activo, recarga la página en unos segundos.
          </p>
        )}
        {pago === "cancelado" && <p className="notice notice-error">No se ha completado el pago. Puedes intentarlo cuando quieras.</p>}
        {negocio === "ok" && <p className="notice notice-ok">Datos del negocio guardados.</p>}
        {negocio === "error" && <p className="notice notice-error">No se han podido guardar los datos. Inténtalo de nuevo.</p>}

        <div className="grid-2">
          <form action={saveBusiness} className="panel">
            <h2>Tu negocio</h2>
            {!hasBusiness && <p className="muted">Rellena esto una vez para que los textos suenen a ti.</p>}
            <div className="fields">
              <label htmlFor="business_name">
                Nombre
                <input id="business_name" name="business_name" defaultValue={profile.business_name} placeholder="Peluquería Marta" maxLength={80} />
              </label>
              <label htmlFor="business_type">
                Tipo de negocio
                <input id="business_type" name="business_type" defaultValue={profile.business_type} placeholder="Peluquería" maxLength={80} required />
              </label>
              <label htmlFor="city">
                Ciudad o barrio
                <input id="city" name="city" defaultValue={profile.city} placeholder="Zaragoza, barrio Delicias" maxLength={80} />
              </label>
              <label htmlFor="tone">
                Tono
                <select id="tone" name="tone" defaultValue={profile.tone}>
                  <option value="cercano">Cercano</option>
                  <option value="divertido">Divertido</option>
                  <option value="elegante">Elegante</option>
                  <option value="serio">Serio</option>
                </select>
              </label>
            </div>
            <button className="btn btn-ghost" type="submit">Guardar</button>
          </form>

          <div className="panel">
            <div className="card-head">
              <h2>Tu plan</h2>
              <span className={`pill ${subscribed || launch ? "pill-ok" : ""}`}>
                {launch && !subscribed ? "Lanzamiento gratis" : STATUS_LABEL[profile.subscription_status] ?? profile.subscription_status}
              </span>
            </div>
            {subscribed ? (
              <>
                <p className="muted">
                  9,99 € al mes · hasta {usage.limit} generaciones al mes.
                  {profile.current_period_end &&
                    ` Próxima renovación: ${new Date(profile.current_period_end).toLocaleDateString("es-ES")}.`}
                </p>
                <form action="/api/portal" method="post">
                  <button className="btn btn-ghost" type="submit">Gestionar suscripción y facturas</button>
                </form>
              </>
            ) : launch ? (
              <p className="muted">
                AnunciaFácil es <strong>gratis</strong> hasta que lleguemos a {intEnv("LAUNCH_GOAL", 250)} negocios: hasta {usage.limit} generaciones al mes.
                Después costará 9,99 € al mes. Te avisaremos por correo con 30 días de antelación y no se te cobrará nada
                salvo que tú decidas suscribirte.
              </p>
            ) : (
              <>
                <p className="muted">
                  {usage.limit > 0 ? `Tienes ${usage.limit} generaciones gratis para probar. ` : ""}
                  Con la suscripción tienes hasta {intEnv("MONTHLY_GENERATIONS", 100)} generaciones al mes por 9,99 € (IVA incluido). Sin permanencia.
                </p>
                <form action="/api/pago" method="post">
                  <button className="btn btn-primary" type="submit">Suscribirme por 9,99 €/mes</button>
                </form>
                {profile.stripe_customer_id && (
                  <form action="/api/portal" method="post">
                    <button className="btn btn-ghost" type="submit">Ver mis facturas</button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        {previous && (
          <section className="stack" id="anterior">
            <div className="panel">
              <div className="card-head" style={{ flexWrap: "wrap" }}>
                <h2>{TOOLS[previous.output.tool].label} · {new Date(previous.created_at).toLocaleDateString("es-ES")}</h2>
                <a className="btn btn-ghost small" href="/panel">Cerrar</a>
              </div>
              <p className="muted">{previous.request}</p>
            </div>
            <Results output={previous.output} />
          </section>
        )}

        {hasBusiness ? (
          <Generator initialUsage={usage} canGenerate={hasBusiness} />
        ) : (
          <p className="notice notice-error">Guarda primero los datos de tu negocio para empezar a generar.</p>
        )}

        {history && history.length > 0 && (
          <section className="panel">
            <h2>Últimas peticiones</h2>
            <p className="muted small">Toca una para volver a ver sus textos.</p>
            <ul className="history">
              {history.map((item) => (
                <li key={item.id}>
                  <a href={`/panel?ver=${item.id}#anterior`} style={{ textDecoration: "none" }}>
                    <span className="pill">{isToolId(item.tool) ? TOOLS[item.tool].label : item.tool}</span>{" "}
                    <span style={{ textDecoration: "underline" }}>
                      {item.request.length > 120 ? `${item.request.slice(0, 117)}…` : item.request}
                    </span>
                  </a>
                  <span className="muted small" style={{ whiteSpace: "nowrap" }}>
                    {new Date(item.created_at).toLocaleDateString("es-ES")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <details className="panel" id="borrar" open={Boolean(borrar)}>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>Borrar mi cuenta</summary>
          <p className="muted">
            Se cancelará tu suscripción (si tienes una) y se borrarán tu cuenta, los datos de tu negocio y tu historial.
            Esto no se puede deshacer. Las facturas se conservan en Stripe porque la ley obliga a guardarlas.
          </p>
          {borrar === "confirmar" && <p className="notice notice-error">Marca la casilla para confirmar que quieres borrar tu cuenta.</p>}
          {borrar === "error" && <p className="notice notice-error">No se ha podido borrar la cuenta. Escríbenos a anunciafacil.contacto@gmail.com y lo hacemos nosotros.</p>}
          <form action={deleteAccount} className="stack" style={{ gap: 12 }}>
            <label htmlFor="confirmar" style={{ flexDirection: "row", alignItems: "flex-start", fontWeight: 400 }}>
              <input id="confirmar" name="confirmar" type="checkbox" value="si" style={{ width: "auto", marginTop: 4 }} />
              <span>Sí, quiero borrar mi cuenta y todos mis datos.</span>
            </label>
            <button className="btn btn-ghost" type="submit" style={{ alignSelf: "flex-start", color: "var(--danger-ink)" }}>
              Borrar mi cuenta para siempre
            </button>
          </form>
        </details>
      </div>
    </main>
  );
}
