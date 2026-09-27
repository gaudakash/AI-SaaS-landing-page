import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 501 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { priceId } = await req.json();
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/?checkout=success`,
    cancel_url: `${origin}/#pricing`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}