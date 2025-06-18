import { notFound } from "next/navigation";
import { mockProducts } from "@/mock/products";
import ProductDetail from "@/components/product/ProductDetail";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// --- ProductPage devient async + attente de `params` ---
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params; // 🔧 OBLIGATOIRE maintenant
  const product = getProductFromParams(slug);

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}

// --- Metadata : idem, params à await ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // 🔧
  const product = getProductFromParams(slug);

  if (!product) {
    return { title: "Produit non trouvé" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

// --- Fonction utilitaire inchangée ---
function getProductFromParams(slug: string[]) {
  const [category, productSlug] = slug;
  return mockProducts.find(
    (p) => p.slug === productSlug && p.category === category
  );
}
