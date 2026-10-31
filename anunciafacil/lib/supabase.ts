import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { requireEnv } from "./env";

export type Profile = {
  id: string;
  email: string | null;
  business_name: string;
  business_type: string;
  city: string;
  tone: string;
  stripe_customer_id: string | null;
  subscription_status: string;
  current_period_end: string | null;
};

// Cliente con la sesión del usuario (respeta los permisos de schema.sql).
export async function supabaseForRequest() {
  const cookieStore = await cookies();
  return createServerClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Llamado desde un Server Component: las cookies se renuevan en middleware.ts.
          }
        },
      },
    },
  );
}

// Cliente de servidor con permisos totales. Solo para el webhook de Stripe y para guardar generaciones.
export function supabaseAdmin() {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function currentUserAndProfile() {
  const supabase = await supabaseForRequest();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null };
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();
  return { supabase, user, profile };
}

export function isSubscribed(profile: Profile | null): boolean {
  if (!profile) return false;
  return profile.subscription_status === "active" || profile.subscription_status === "trialing";
}
