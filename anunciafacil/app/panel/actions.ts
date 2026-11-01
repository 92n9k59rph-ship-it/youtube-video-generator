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
  const basics = {
    business_name: field(formData, "business_name", 80),
    business_type: field(formData, "business_type", 80),
    city: field(formData, "city", 80),
    tone: TONES.includes(tone) ? tone : "cercano",
  };
  let { error } = await supabase
    .from("profiles")
    .update({ ...basics, details: field(formData, "details", 600) })
    .eq("id", user.id);

  // Si todavía no se ha ejecutado supabase/actualizacion-3.sql, la columna «details» no existe:
  // se guarda lo demás y se avisa.
  let missingDetails = false;
  if (error && /details/.test(error.message)) {
    missingDetails = true;
    ({ error } = await supabase.from("profiles").update(basics).eq("id", user.id));
  }

  revalidatePath("/panel");
  redirect(error ? "/panel?negocio=error" : missingDetails ? "/panel?negocio=sin-datos" : "/panel?negocio=ok");
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

export async function saveFeedback(formData: FormData) {
  const supabase = await supabaseForRequest();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  const rating = Number.parseInt(String(formData.get("rating") ?? ""), 10);
  const message = field(formData, "message", 1000);
  if (!message && !(rating >= 1 && rating <= 5)) redirect("/panel?opinion=vacia#opinion");

  const { error } = await supabaseAdmin()
    .from("feedback")
    .insert({ user_id: user.id, rating: rating >= 1 && rating <= 5 ? rating : null, message });
  redirect(error ? "/panel?opinion=error#opinion" : "/panel?opinion=ok#opinion");
}
