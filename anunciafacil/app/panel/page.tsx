import { redirect } from "next/navigation";
import { currentUserAndProfile, isSubscribed } from "@/lib/supabase";
import { TOOLS, isToolId } from "@/lib/tools";
import { getUsage } from "@/lib/usage";
import { saveBusiness, signOut } from "./actions";
import { Generator } from "./Generator";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  active: "Suscripción activa",
  trialing: "Periodo de prueba",
  past_due: "Pago pendiente",
  canceled: "Suscripción cancelada",
  unpaid: "Pago pendiente",
  none: "Plan gratis",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; negocio?: string }>;
}) {
  const { supabase, user, profile } = await currentUserAndProfile();
  if (!user || !profile) redirect("/entrar");

  const { pago, negocio } = await searchParams;
  const subscribed = isSubscribed(profile);
  const usage = await getUsage(profile);
  const hasBusiness = Boolean(profile.business_type);

  const { data: history } = await supabase
    .from("generations")
    .select("id, tool, request, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

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
              <span className={`pill ${subscribed ? "pill-ok" : ""}`}>{STATUS_LABEL[profile.subscription_status] ?? profile.subscription_status}</span>
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
            ) : (
              <>
                <p className="muted">
                  Tienes {usage.limit} generaciones gratis para probar. Con la suscripción tienes hasta 100 al mes por 9,99 € (IVA incluido). Sin permanencia.
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

        {hasBusiness ? (
          <Generator initialUsage={usage} canGenerate={hasBusiness} />
        ) : (
          <p className="notice notice-error">Guarda primero los datos de tu negocio para empezar a generar.</p>
        )}

        {history && history.length > 0 && (
          <section className="panel">
            <h2>Últimas peticiones</h2>
            <ul className="history">
              {history.map((item) => (
                <li key={item.id}>
                  <span>
                    <span className="pill">{isToolId(item.tool) ? TOOLS[item.tool].label : item.tool}</span>{" "}
                    {item.request.length > 120 ? `${item.request.slice(0, 117)}…` : item.request}
                  </span>
                  <span className="muted small" style={{ whiteSpace: "nowrap" }}>
                    {new Date(item.created_at).toLocaleDateString("es-ES")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
