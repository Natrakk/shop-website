// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "micro";
import Stripe from "stripe";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const rawBody = await req.arrayBuffer();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            Buffer.from(rawBody),
            sig,
            endpointSecret
        );
    } catch (err: any) {
        console.error("❌ Erreur de vérification du webhook :", err.message);
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
    }

    // 🎯 Cible uniquement l'événement de paiement réussi
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderRef = doc(db, "orders", session.id);

        await setDoc(orderRef, {
            id: session.id,
            amount_total: session.amount_total,
            currency: session.currency,
            uid: session.metadata?.uid || "inconnu",
            createdAt: serverTimestamp(),
        });

        console.log("✅ Commande enregistrée :", session.id);
    }

    return new NextResponse("ok", { status: 200 });
}
