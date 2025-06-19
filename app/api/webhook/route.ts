// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// Stripe config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil", // à jour
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const rawBody = await req.text(); // lecture en texte brut
    const sig = req.headers.get("stripe-signature");

    if (!sig) return new Response("Missing Stripe signature", { status: 400 });

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            endpointSecret
        );
    } catch (err: any) {
        console.error("❌ Erreur de validation Webhook Stripe :", err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // 🎯 Paiement réussi
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.id;
        const email = session.customer_email;
        const amount = session.amount_total;

        await setDoc(doc(db, "orders", orderId), {
            id: orderId,
            email,
            amount,
            status: "paid",
            createdAt: new Date().toISOString(),
        });

        console.log("✅ Commande enregistrée dans Firestore :", orderId);
    }

    return NextResponse.json({ received: true });
}
