import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { GenerationError, generateMarketing } from "@/lib/generator";
import { currentUserAndProfile, supabaseAdmin } from "@/lib/supabase";
import { TOOLS, isToolId } from "@/lib/tools";
import { getUsage } from "@/lib/usage";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { user, profile } = await currentUserAndProfile();
  if (!user || !profile) {
    return NextResponse.json({ error: "Tienes que entrar en tu cuenta." }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { request?: unknown; tool?: unknown } | null;
  const tool = isToolId(body?.tool) ? body.tool : "social";
  const request = typeof body?.request === "string" ? body.request.trim() : "";
  if (request.length < 5) {
    return NextResponse.json({ error: "Escribe un poco más para que podamos ayudarte (al menos unas palabras)." }, { status: 400 });
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

  const usage = await getUsage(profile);
  if (usage.used >= usage.limit) {
    const error =
      usage.period === "gratis"
        ? "Has usado tus generaciones gratis. Suscríbete para seguir usando AnunciaFácil."
        : "Has llegado al límite de este mes. Se renueva el día 1.";
    return NextResponse.json({ error, usage }, { status: 402 });
  }

  try {
    const generation = await generateMarketing(profile, tool, request);

    const { error } = await supabaseAdmin().from("generations").insert({
      user_id: user.id,
      tool,
      request,
      result: generation.output.result,
      model: generation.model,
      input_tokens: generation.inputTokens,
      output_tokens: generation.outputTokens,
    });
    if (error) console.error("No se pudo guardar la generación", error);

    return NextResponse.json({
      output: generation.output,
      usage: { ...usage, used: usage.used + 1 },
    });
  } catch (err) {
    if (err instanceof GenerationError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Hay mucha gente usando AnunciaFácil ahora mismo. Prueba en un minuto." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Error de la API de Claude", err.status, err.message);
      return NextResponse.json({ error: "No se ha podido generar el contenido. Inténtalo de nuevo." }, { status: 502 });
    }
    throw err;
  }
}
