import { notFound } from "next/navigation";
import { freeLaunch, intEnv } from "@/lib/env";
import { currentUserAndProfile, supabaseAdmin } from "@/lib/supabase";
import { TOOLS, isToolId } from "@/lib/tools";

export const dynamic = "force-dynamic";
export const metadata = { title: "Administración · AnunciaFácil", robots: { index: false } };

// Precios oficiales de la API de Claude en dólares por millón de tokens (entrada, salida).
// Revisa platform.claude.com/docs si cambian. Los modelos de reserva (fallback) están por si la IA cambia de modelo.
const PRICES: Array<[prefix: string, input: number, output: number]> = [
  ["claude-opus-5-5", 4, 20],
  ["claude-sonnet-5-5", 2, 10],
  ["claude-haiku-5-5", 0.1, 0.5],
  ["claude-opus-5", 5, 25],
  ["claude-opus-4-8", 5, 25],
  ["claude-sonnet-5", 2, 10],
];

const PRICE_EUR = 9.99;
const VAT = 0.21;

function costUsd(model: string, inputTokens: number, outputTokens: number) {
  const price = PRICES.find(([prefix]) => model.startsWith(prefix)) ?? PRICES[0];
  return (inputTokens * price[1] + outputTokens * price[2]) / 1_000_000;
}

function isAdmin(email: string | undefined) {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && admins.includes(email.toLowerCase()));
}

const money = (n: number, currency: "EUR" | "USD") =>
  n.toLocaleString("es-ES", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default async function Admin() {
  const { user } = await currentUserAndProfile();
  // Para cualquiera que no sea administrador, esta página no existe.
  if (!user || !isAdmin(user.email)) notFound();

  const admin = supabaseAdmin();
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const [{ data: profiles }, { data: generations }] = await Promise.all([
    admin
      .from("profiles")
      .select("email, business_name, business_type, subscription_status, created_at")
      .order("created_at", { ascending: false })
      .limit(5000),
    admin
      .from("generations")
      .select("tool, model, input_tokens, output_tokens, status")
      .gte("created_at", monthStart.toISOString())
      .limit(20000),
  ]);

  const allProfiles = profiles ?? [];
  const monthGenerations = (generations ?? []).filter((g) => g.status === "done");

  const subscribers = allProfiles.filter((p) => p.subscription_status === "active" || p.subscription_status === "trialing").length;
  const pastDue = allProfiles.filter((p) => p.subscription_status === "past_due" || p.subscription_status === "unpaid").length;
  const revenueGross = subscribers * PRICE_EUR;
  const revenueNet = revenueGross / (1 + VAT);

  const aiCostUsd = monthGenerations.reduce((sum, g) => sum + costUsd(g.model, g.input_tokens, g.output_tokens), 0);
  const avgCostUsd = monthGenerations.length ? aiCostUsd / monthGenerations.length : 0;

  const byTool = new Map<string, number>();
  for (const g of monthGenerations) byTool.set(g.tool, (byTool.get(g.tool) ?? 0) + 1);

  const freeLimit = intEnv("FREE_GENERATIONS", 3);
  const monthlyLimit = intEnv("MONTHLY_GENERATIONS", 100);

  return (
    <main>
      <div className="wrap stack">
        <div>
          <span className="pill">Solo para ti</span>
          <h1 style={{ fontSize: "2.2rem", marginTop: 8 }}>Administración</h1>
          <p className="muted">Datos de este mes (desde el día 1). Las cifras de dinero son estimaciones: las reales están en Stripe y en la consola de Anthropic.</p>
        </div>

        <section className="grid-3">
          <div className="card">
            <span className="card-label">Clientes registrados</span>
            <strong className="stat">{allProfiles.length}</strong>
          </div>
          <div className="card">
            <span className="card-label">Suscriptores activos</span>
            <strong className="stat">{subscribers}</strong>
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
                <span><strong>Lanzamiento gratis</strong> · {intEnv("LAUNCH_MONTHLY_GENERATIONS", 20)} al mes por cliente</span>
                <span className="muted small">Para cobrar: FREE_LAUNCH=false en Vercel (avisa antes a tus clientes)</span>
              </>
            ) : (
              <>
                <span>{freeLimit} gratis · {monthlyLimit} al mes por suscriptor</span>
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
                      <td>{p.subscription_status === "none" ? "Prueba gratis" : p.subscription_status}</td>
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
