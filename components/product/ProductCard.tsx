// components/product/ProductCard.tsx
import type { ProductCardProps } from "@/types/ProductCardProps";
import Image from "next/image";
import Link from "next/link";


export default function ProductCard({
    title,
    description,
    price,
    image,
    index = 0,
    slug
}: ProductCardProps) {
    return (
        <Link href={`/catalogue/${slug}`}>
            <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="relative w-full h-64 mb-4">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                    />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 mb-2">{description}</p>
                <span className="font-bold text-yellow-600 text-lg">{price.toFixed(2)} €</span>
            </div>
        </Link>
    );
}
