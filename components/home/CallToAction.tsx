import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="bg-gray-100 py-12 text-center px-4">
            <h2 className="text-2xl font-semibold mb-4">Envie de nouveautés ?</h2>
            <p className="text-gray-600 mb-6">
                Parcourez notre sélection exclusive de T-shirts originaux.
            </p>
            <Link
                href="/catalogue"
                className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
                Découvrir maintenant
            </Link>
        </section>
    );
}
