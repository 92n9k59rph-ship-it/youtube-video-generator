import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { GenerationError, generateMarketing } from "@/lib/generator";
import { appOpen, isAdminEmail } from "@/lib/env";
import { PLANS, canUseTool } from "@/lib/plans";
import { currentUserAndProfile, isSubscribed, supabaseAdmin } from "@/lib/supabase";
import { TOOLS, isToolId } from "@/lib/tools";
import { getUsage, reserveGeneration } from "@/lib/usage";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { user, profile } = await currentUserAndProfile();
  if (!user || !profile) {
    return NextResponse.json({ error: "Tienes que entrar en tu cuenta." }, { status: 401 });
  }
  if (!appOpen() && !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Pregonia todavía no está abierto. Te avisaremos por correo." }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as { request?: unknown; tool?: unknown } | null;
  const tool = isToolId(body?.tool) ? body.tool : "social";
  const request = typeof body?.request === "string" ? body.request.trim() : "";
  if (request.length < 5) {
    return NextResponse.json({ error: "Escribe un poco más para que podamos ayudarte (al menos unas palabras)." }, { status: 400 });
  }
  if (!canUseTool(TOOLS[tool].minPlan, { subscribed: isSubscribed(profile), plan: profile.plan })) {
    return NextResponse.json(
      {
        error: `«${TOOLS[tool].label}» está incluida en el plan ${PLANS[TOOLS[tool].minPlan].name}. Puedes cambiar de plan desde «Gestionar suscripción».`,
      },
      { status: 403 },
    );
  }
  const maxLength = TOOLS[tool].maxLength;
  if (request.length > maxLength) {
    return NextResponse.json(
      { error: `El texto es demasiado largo. Máximo ${maxLength} caracteres.` },
      { status: 400 },
    );
  }
  if (!profile.business_type) {
    return NextResponse.json({ error: "Primero rellena los datos de tu negocio." }, { status: 400 });
  }

  const reservationId = await reserveGeneration(profile, tool, request);
  const usage = await getUsage(profile);
  if (!reservationId) {
    const error =
      usage.period === "gratis"
        ? usage.limit === 0
          ? "Suscríbete para empezar a usar Pregonia."
          : "Has usado tus generaciones gratis. Suscríbete para seguir usando Pregonia."
        : usage.period === "lanzamiento"
          ? "Has usado todas las generaciones gratis de este mes. Se renuevan el día 1."
          : "Has llegado al límite de este mes. Se renueva el día 1.";
    return NextResponse.json({ error, usage }, { status: 402 });
  }

  const admin = supabaseAdmin();
  try {
    const generation = await generateMarketing(profile, tool, request);

    const { error } = await admin
      .from("generations")
      .update({
        result: generation.output.result,
        model: generation.model,
        input_tokens: generation.inputTokens,
        output_tokens: generation.outputTokens,
        status: "done",
      })
      .eq("id", reservationId);
    if (error) console.error("No se pudo guardar la generación", error);

    // La reserva ya cuenta en `usage.used`.
    return NextResponse.json({ output: generation.output, usage });
  } catch (err) {
    // Si la IA falla, se libera la reserva para que no cuente como uso.
    await admin.from("generations").delete().eq("id", reservationId);

    if (err instanceof GenerationError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Hay mucha gente usando Pregonia ahora mismo. Prueba en un minuto." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Error de la API de Claude", err.status, err.message);
      return NextResponse.json({ error: "No se ha podido generar el contenido. Inténtalo de nuevo." }, { status: 502 });
    }
    throw err;
  }
}
