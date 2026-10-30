import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { currentUserAndProfile } from "@/lib/supabase";

// Abre el portal de Stripe donde el cliente cambia la tarjeta, ve sus facturas o cancela.
export async function POST() {
  const { user, profile } = await currentUserAndProfile();
  if (!user || !profile?.stripe_customer_id) {
    return NextResponse.redirect(`${siteUrl()}/panel`, 303);
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${siteUrl()}/panel`,
  });

  return NextResponse.redirect(session.url, 303);
}
