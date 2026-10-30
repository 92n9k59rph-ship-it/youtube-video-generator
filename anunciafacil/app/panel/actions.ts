"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin, supabaseForRequest } from "@/lib/supabase";

const TONES = ["cercano", "divertido", "elegante", "serio"];

function field(formData: FormData, name: string, max: number) {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

export async function saveBusiness(formData: FormData) {
  const supabase = await supabaseForRequest();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  const tone = field(formData, "tone", 20);
  const { error } = await supabase
    .from("profiles")
    .update({
      business_name: field(formData, "business_name", 80),
      business_type: field(formData, "business_type", 80),
      city: field(formData, "city", 80),
      tone: TONES.includes(tone) ? tone : "cercano",
    })
    .eq("id", user.id);

  revalidatePath("/panel");
  redirect(error ? "/panel?negocio=error" : "/panel?negocio=ok");
}

export async function signOut() {
  const supabase = await supabaseForRequest();
  await supabase.auth.signOut();
  redirect("/");
}

// Borra la cuenta del cliente: cancela su suscripción en Stripe y elimina sus datos.
// Las facturas se quedan en Stripe, porque la ley obliga a conservarlas.
export async function deleteAccount(formData: FormData) {
  if (formData.get("confirmar") !== "si") redirect("/panel?borrar=confirmar#borrar");

  const supabase = await supabaseForRequest();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  const admin = supabaseAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle<{ stripe_customer_id: string | null }>();

  if (profile?.stripe_customer_id) {
    const stripe = getStripe();
    const subscriptions = await stripe.subscriptions.list({ customer: profile.stripe_customer_id, status: "all" });
    for (const subscription of subscriptions.data) {
      if (subscription.status !== "canceled" && subscription.status !== "incomplete_expired") {
        await stripe.subscriptions.cancel(subscription.id);
      }
    }
  }

  // Al borrar el usuario se borran también su perfil y sus generaciones (on delete cascade).
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) redirect("/panel?borrar=error#borrar");

  await supabase.auth.signOut();
  redirect("/?cuenta=borrada");
}
