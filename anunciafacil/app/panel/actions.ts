"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseForRequest } from "@/lib/supabase";

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
