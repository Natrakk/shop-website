"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import ProductOptions from "./ProductOptions";
import ProductReviews from "./ProductReviews";
import type { Product } from "@/types/product";

type Props = {
    product: Product;
};

export default function ProductDetail({ product }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    const addToCart = useCartStore((s) => s.addToCart);

    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.title,
            image: product.image,
            price: product.price,
            quantity,
            size: selectedSize,
            color: selectedColor,
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-md">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>

                    <ProductOptions
                        sizes={product.sizes}
                        colors={product.colors}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />

                    <p className="text-2xl font-bold text-yellow-600 mb-6">
                        {product.price.toFixed(2)} €
                    </p>

                    <button
                        onClick={handleAdd}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>

            <ProductReviews productId={product.id} />
        </div>
    );
}
