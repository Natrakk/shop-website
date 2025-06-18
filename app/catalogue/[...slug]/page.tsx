import { mockProducts } from "@/mock/products";
import { notFound } from "next/navigation";
import Image from "next/image";

function getProductFromParams(slug: string[]) {
  const [category, productSlug] = slug;
  return mockProducts.find(
    (p) => p.slug === productSlug && p.category === category
  );
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: [product.category, product.slug],
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const product = getProductFromParams(slug);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-96">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-sm text-gray-500 mb-1">Tailles disponibles : {product.sizes.join(", ")}</p>
          <p className="text-sm text-gray-500 mb-4">Couleurs : {product.colors.join(", ")}</p>
          <p className="text-xl font-semibold text-yellow-600 mb-6">
            {product.price.toFixed(2)} €
          </p>
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="qty" className="text-sm font-medium">
              Quantité :
            </label>
            <input
              id="qty"
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 border rounded-md px-2 py-1 text-center"
            />
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}