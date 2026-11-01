import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireEnv } from "@/lib/env";
import { planFromPriceId } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

// Stripe avisa aquí cuando alguien paga, renueva o cancela, y actualizamos su perfil.
export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Falta la firma" }, { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, requireEnv("STRIPE_WEBHOOK_SECRET"));
  } catch {
    return NextResponse.json({ error: "Firma no válida" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.mode === "subscription" && session.subscription) {
        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        await syncSubscription(await stripe.subscriptions.retrieve(subscriptionId));
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await syncSubscription(event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const item = subscription.items.data[0];
  const periodEnd = item?.current_period_end;
  const plan = planFromPriceId(item?.price.id);

  const { error } = await supabaseAdmin()
    .from("profiles")
    .update({
      subscription_status: subscription.status,
      plan,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    })
    .eq("stripe_customer_id", customerId);

  if (error) throw error;
}
