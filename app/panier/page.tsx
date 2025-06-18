// app/panier/page.tsx
"use client";

import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";

export default function PanierPage() {
    const items = useCartStore((s) => s.items);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const addToCart = useCartStore((s) => s.addToCart);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Ton panier</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">Ton panier est vide.</p>
            ) : (
                <>
                    <ul className="space-y-6">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-4"
                            >
                                <div className="relative w-20 h-20">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} × {item.price.toFixed(2)} €
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                addToCart({ ...item, quantity: -1 })
                                            }
                                            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                addToCart({ ...item, quantity: 1 })
                                            }
                                            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-4 text-red-500 text-sm hover:underline"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 border-t pt-6 flex justify-between items-center">
                        <p className="text-lg font-bold">Total : {total.toFixed(2)} €</p>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl">
                            Passer au paiement
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
