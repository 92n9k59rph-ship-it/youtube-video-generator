import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail, sitePublic } from "@/lib/env";

// Páginas que siempre se pueden abrir, aunque la web esté en privado:
// la de «Muy pronto», la de entrar (para los administradores), el acceso y los archivos de la app.
const ALWAYS_OPEN = [
  "/muy-pronto",
  "/entrar",
  "/auth/",
  "/api/",
  "/manifest.webmanifest",
  "/robots.txt",
  "/icon",
  "/apple-icon",
];
const PREVIEW_COOKIE = "pregonia_vista";

// Renueva la sesión de Supabase en cada visita, protege /panel y, mientras la web está en privado,
// enseña «Muy pronto» a todo el que no sea administrador.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  if (!sitePublic() && !ALWAYS_OPEN.some((prefix) => path.startsWith(prefix))) {
    const previewCode = process.env.PREVIEW_CODE;
    // Enlace de vista previa: /?vista=CÓDIGO guarda una cookie para poder ver la web durante 30 días.
    if (previewCode && request.nextUrl.searchParams.get("vista") === previewCode) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("vista");
      const redirect = NextResponse.redirect(url);
      redirect.cookies.set(PREVIEW_COOKIE, previewCode, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      return redirect;
    }
    const hasPreview = Boolean(previewCode) && request.cookies.get(PREVIEW_COOKIE)?.value === previewCode;
    if (!hasPreview && !isAdminEmail(user?.email)) {
      const url = request.nextUrl.clone();
      url.pathname = "/muy-pronto";
      url.search = "";
      const hidden = NextResponse.rewrite(url);
      hidden.headers.set("X-Robots-Tag", "noindex, nofollow");
      return hidden;
    }
  }

  if (!user && path.startsWith("/panel")) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook).*)"],
};
