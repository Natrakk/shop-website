// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
    const { items } = await req.json();

    const line_items = items.map((item: any) => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // en centimes
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/panier`,
    });

    return NextResponse.json({ url: session.url });
}
