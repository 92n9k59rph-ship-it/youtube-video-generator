import Stripe from "stripe";
import { requireEnv } from "./env";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripe) stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
  return stripe;
}
