import ProductCard from "../product/ProductCard";
import { mockProducts } from "@/mock/products";

export default function ProductHighlights() {
    return (
        <section className="py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos best-sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {mockProducts.map((product, i) => (
                    <ProductCard key={i} product={product} index={i} />             
                ))}
            </div>
        </section>
    );
}
