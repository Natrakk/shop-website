import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  if (!product) return null;

  return (
    <Link href={`/catalogue/${product.category}/${product.slug}`}>
      <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index === 0}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <span className="font-bold text-yellow-600 text-lg">
          {product.price.toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}