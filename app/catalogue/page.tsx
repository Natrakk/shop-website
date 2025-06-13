"use client";

import { useState } from "react";
import CatalogueHeader from "@/components/catalogue/CatalogueHeader";
import Filters from "@/components/catalogue/Filters";
import ProductGrid from "@/components/catalogue/ProductGrid";
import { mockProducts } from "@/mock/products";
import { Product } from "@/types/product";

export default function CataloguePage() {
    const [filter, setFilter] = useState({
        cotonBio: false,
        editionLimitee: false,
        moinsDe30: false,
    });

    const handleToggle = (key: keyof typeof filter) =>
        setFilter((prev) => ({ ...prev, [key]: !prev[key] }));

    const filteredProducts: Product[] = mockProducts.filter((p) => {
        if (filter.cotonBio && !p.cotonBio) return false;
        if (filter.editionLimitee && !p.editionLimitee) return false;
        if (filter.moinsDe30 && p.price >= 30) return false;
        return true;
    });

    return (
        <main className="min-h-screen bg-white px-4 py-10 text-gray-900">
            <CatalogueHeader />
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
                <Filters filters={filter} onToggle={handleToggle} />
                <ProductGrid products={filteredProducts} />
            </div>
        </main>
    );
}
