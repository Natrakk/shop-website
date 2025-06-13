import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {products.map((product, i) => (
                <ProductCard key={i} {...product} index={i} />
            ))}
        </section>
    );
}
