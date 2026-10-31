import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/env";
import { supabaseForRequest } from "@/lib/supabase";

// El enlace del correo trae aquí al usuario; cambiamos el código por una sesión.
export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");
  if (code) {
    const supabase = await supabaseForRequest();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${siteUrl()}/panel`);
  }
  return NextResponse.redirect(`${siteUrl()}/entrar?error=enlace`);
}
