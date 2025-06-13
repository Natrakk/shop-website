import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="bg-yellow-100 py-20 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bienvenue sur <span className="text-yellow-600">Shop-Website</span>
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    La boutique en ligne de T-shirts stylés et originaux.
                </p>
                <Link
                    href="/catalogue"
                    className="bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-700 transition"
                >
                    Voir le catalogue
                </Link>
            </div>
        </section>
    );
}
