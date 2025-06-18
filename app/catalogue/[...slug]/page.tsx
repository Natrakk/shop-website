import { notFound } from "next/navigation";
import { mockProducts } from "@/mock/products";
import ProductDetail from "@/components/product/ProductDetail";

function getProductFromParams(slug: string[]) {
  const [category, productSlug] = slug;
  return mockProducts.find(
    (p) => p.slug === productSlug && p.category === category
  );
}

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const product = getProductFromParams(params.slug);

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
