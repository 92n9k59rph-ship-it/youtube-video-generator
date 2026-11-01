import { notFound } from "next/navigation";
import { freeLaunch, intEnv, isAdminEmail } from "@/lib/env";
import { currentUserAndProfile, supabaseAdmin } from "@/lib/supabase";
import { PLANS, isPlanId, planLimit } from "@/lib/plans";
import { costUsd } from "@/lib/pricing";
import { TOOLS, isToolId } from "@/lib/tools";

export const dynamic = "force-dynamic";
export const metadata = { title: "Administración · Pregonia", robots: { index: false } };

const VAT = 0.21;

const money = (n: number, currency: "EUR" | "USD") =>
  n.toLocaleString("es-ES", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default async function Admin() {
  const { user } = await currentUserAndProfile();
  // Para cualquiera que no sea administrador, esta página no existe.
  if (!user || !isAdminEmail(user.email)) notFound();

  const admin = supabaseAdmin();
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const [{ data: profiles }, { data: generations }, { data: feedback }] = await Promise.all([
    admin
      .from("profiles")
      .select("email, business_name, business_type, subscription_status, plan, created_at")
      .order("created_at", { ascending: false })
      .limit(5000),
    admin
      .from("generations")
      .select("tool, model, input_tokens, output_tokens, status")
      .gte("created_at", monthStart.toISOString())
      .limit(20000),
    admin.from("feedback").select("rating, message, created_at, user_id").order("created_at", { ascending: false }).limit(30),
  ]);

  const allProfiles = profiles ?? [];
  const monthGenerations = (generations ?? []).filter((g) => g.status === "done");

  const activeProfiles = allProfiles.filter((p) => p.subscription_status === "active" || p.subscription_status === "trialing");
  const subscribers = activeProfiles.length;
  const proSubscribers = activeProfiles.filter((p) => p.plan === "pro").length;
  const pastDue = allProfiles.filter((p) => p.subscription_status === "past_due" || p.subscription_status === "unpaid").length;
  const revenueGross = activeProfiles.reduce((sum, p) => sum + PLANS[isPlanId(p.plan) ? p.plan : "basic"].priceEur, 0);
  const revenueNet = revenueGross / (1 + VAT);

  const aiCostUsd = monthGenerations.reduce((sum, g) => sum + costUsd(g.model, g.input_tokens, g.output_tokens), 0);
  const avgCostUsd = monthGenerations.length ? aiCostUsd / monthGenerations.length : 0;

  const byTool = new Map<string, number>();
  for (const g of monthGenerations) byTool.set(g.tool, (byTool.get(g.tool) ?? 0) + 1);

  const freeLimit = intEnv("FREE_GENERATIONS", 3);
  // Meta secreta del lanzamiento: solo está en Vercel (LAUNCH_GOAL), nunca en el código público.
  const launchGoal = intEnv("LAUNCH_GOAL", 0);
  const goalReached = launchGoal > 0 && allProfiles.length >= launchGoal;

  return (
    <main>
      <div className="wrap stack">
        <div>
          <span className="pill">Solo para ti</span>
          <h1 style={{ fontSize: "2.2rem", marginTop: 8 }}>Administración</h1>
          <p className="muted">Datos de este mes (desde el día 1). Las cifras de dinero son estimaciones: las reales están en Stripe y en la consola de Anthropic.</p>
        </div>

        {freeLaunch() && (
          <section className={`notice ${goalReached ? "notice-ok" : ""}`} style={goalReached ? undefined : { background: "var(--chip)" }}>
            {goalReached ? (
              <>
                <strong>🎉 ¡Has llegado a {launchGoal} negocios!</strong> Es el momento de empezar a cobrar: envía el correo de aviso de
                LANZAMIENTO.md y, 30 días después, sigue el paso 7 de la GUIA.md.
              </>
            ) : launchGoal > 0 ? (
              <>
                <strong>Meta del lanzamiento: {allProfiles.length} de {launchGoal} negocios.</strong> Faltan {launchGoal - allProfiles.length}.
                Ideas para conseguirlos en anunciafacil/MARKETING.md. (Esta meta solo la ves tú.)
              </>
            ) : (
              <>
                <strong>{allProfiles.length} negocios registrados.</strong> Pon tu meta secreta en Vercel (LAUNCH_GOAL) y aquí verás cuántos faltan.
              </>
            )}
          </section>
        )}

        <section className="grid-3">
          <div className="card">
            <span className="card-label">Clientes registrados</span>
            <strong className="stat">{allProfiles.length}</strong>
          </div>
          <div className="card">
            <span className="card-label">Suscriptores activos</span>
            <strong className="stat">{subscribers}</strong>
            {subscribers > 0 && <span className="muted small">{subscribers - proSubscribers} Básico · {proSubscribers} Pro</span>}
            {pastDue > 0 && <span className="small" style={{ color: "var(--danger-ink)" }}>{pastDue} con el pago pendiente</span>}
          </div>
          <div className="card">
            <span className="card-label">Ingresos al mes (estimados)</span>
            <strong className="stat">{money(revenueGross, "EUR")}</strong>
            <span className="muted small">{money(revenueNet, "EUR")} sin IVA, antes de la comisión de Stripe</span>
          </div>
          <div className="card">
            <span className="card-label">Generaciones este mes</span>
            <strong className="stat">{monthGenerations.length}</strong>
          </div>
          <div className="card">
            <span className="card-label">Coste de la IA este mes</span>
            <strong className="stat">{money(aiCostUsd, "USD")}</strong>
            <span className="muted small">{money(avgCostUsd, "USD")} de media por generación</span>
          </div>
          <div className="card">
            <span className="card-label">Modo</span>
            {freeLaunch() ? (
              <>
                <span><strong>Lanzamiento gratis</strong> · {intEnv("LAUNCH_MONTHLY_GENERATIONS", 10)} al mes por cliente</span>
                <span className="muted small">Para cobrar: FREE_LAUNCH=false en Vercel (avisa antes a tus clientes)</span>
              </>
            ) : (
              <>
                <span>{freeLimit} gratis · Básico {planLimit("basic")} al mes · Pro {planLimit("pro")} al mes</span>
                <span className="muted small">Se cambian en Vercel (FREE_GENERATIONS y MONTHLY_GENERATIONS)</span>
              </>
            )}
          </div>
        </section>

        <section className="panel">
          <h2>Uso por herramienta</h2>
          {monthGenerations.length === 0 ? (
            <p className="muted">Aún no hay generaciones este mes.</p>
          ) : (
            <ul className="history">
              {[...byTool.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(([tool, count]) => (
                  <li key={tool}>
                    <span>{isToolId(tool) ? TOOLS[tool].label : tool}</span>
                    <strong className="num">{count}</strong>
                  </li>
                ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Opiniones de los clientes</h2>
          {!feedback || feedback.length === 0 ? (
            <p className="muted">Todavía no hay opiniones. Pide a tus clientes que usen «¿Qué te parece?» en su panel.</p>
          ) : (
            <ul className="history">
              {feedback.map((f, i) => (
                <li key={i}>
                  <span>
                    {f.rating ? `${"★".repeat(f.rating)}${"☆".repeat(5 - f.rating)} ` : ""}
                    {f.message || <span className="muted">(sin comentario)</span>}
                  </span>
                  <span className="muted small num" style={{ whiteSpace: "nowrap" }}>
                    {new Date(f.created_at).toLocaleDateString("es-ES")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Últimos registros</h2>
          {allProfiles.length === 0 ? (
            <p className="muted">Todavía no se ha registrado nadie.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Correo</th>
                    <th>Negocio</th>
                    <th>Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {allProfiles.slice(0, 20).map((p) => (
                    <tr key={`${p.email}-${p.created_at}`}>
                      <td className="num">{new Date(p.created_at).toLocaleDateString("es-ES")}</td>
                      <td>{p.email}</td>
                      <td>{[p.business_name, p.business_type].filter(Boolean).join(" · ") || "—"}</td>
                      <td>{p.subscription_status === "none" ? "Sin plan" : `${p.subscription_status}${p.plan === "pro" ? " · Pro" : " · Básico"}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="muted small">Son datos personales de tus clientes: no los compartas ni los uses para otra cosa.</p>
        </section>
      </div>
    </main>
  );
}
