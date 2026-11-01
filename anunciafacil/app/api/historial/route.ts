import { NextResponse } from "next/server";
import { canUseTool } from "@/lib/plans";
import { currentUserAndProfile, isSubscribed } from "@/lib/supabase";
import { TOOLS, isToolId } from "@/lib/tools";
import { csvCell, flatten } from "@/lib/csv";

// Descarga de todo el historial en CSV (plan Premium; en el lanzamiento gratis, para todos).
export async function GET() {
  const { supabase, user, profile } = await currentUserAndProfile();
  if (!user || !profile) {
    return NextResponse.json({ error: "Tienes que entrar en tu cuenta." }, { status: 401 });
  }
  if (!canUseTool("premium", { subscribed: isSubscribed(profile), plan: profile.plan })) {
    return NextResponse.json({ error: "La descarga del historial está incluida en el plan Premium." }, { status: 403 });
  }

  // La seguridad de Supabase solo deja leer las generaciones del propio cliente.
  const { data, error } = await supabase
    .from("generations")
    .select("tool, request, result, created_at")
    .eq("status", "done")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error) {
    return NextResponse.json({ error: "No se ha podido preparar la descarga." }, { status: 500 });
  }

  const rows = [["Fecha", "Herramienta", "Petición", "Textos"]];
  for (const item of data ?? []) {
    rows.push([
      new Date(item.created_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
      isToolId(item.tool) ? TOOLS[item.tool].label : String(item.tool),
      item.request,
      flatten(item.result).join("\n"),
    ]);
  }
  // BOM + punto y coma: así lo abren bien Excel y Numbers en español.
  const csv = "﻿" + rows.map((row) => row.map(csvCell).join(";")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pregonia-historial.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
