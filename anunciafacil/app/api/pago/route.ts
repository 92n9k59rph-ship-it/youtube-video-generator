import { NextResponse } from "next/server";
import { requireEnv, siteUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { currentUserAndProfile, isSubscribed, supabaseAdmin } from "@/lib/supabase";

// Crea una página de pago de Stripe para la suscripción mensual.
export async function POST() {
  const { user, profile } = await currentUserAndProfile();
  if (!user || !profile) {
    return NextResponse.redirect(`${siteUrl()}/entrar`, 303);
  }
  if (isSubscribed(profile)) {
    return NextResponse.redirect(`${siteUrl()}/panel`, 303);
  }

  const stripe = getStripe();

  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await supabaseAdmin().from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: requireEnv("STRIPE_PRICE_ID"), quantity: 1 }],
    allow_promotion_codes: true,
    locale: "es",
    success_url: `${siteUrl()}/panel?pago=ok`,
    cancel_url: `${siteUrl()}/panel?pago=cancelado`,
  });

  return NextResponse.redirect(session.url!, 303);
}
