import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-10 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo / Intro */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Shop-Website</h2>
                    <p className="text-sm text-gray-300">
                        La boutique en ligne de t-shirts originaux et stylés. Qualité, confort et livraison rapide.
                    </p>
                </div>

                {/* Liens rapides */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
                        <li><Link href="/catalogue" className="hover:text-primary">Catalogue</Link></li>
                        <li><Link href="/profil" className="hover:text-primary">Mon compte</Link></li>
                        <li><Link href="/panier" className="hover:text-primary">Panier</Link></li>
                    </ul>
                </div>

                {/* Infos */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Infos</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-primary">CGV</a></li>
                        <li><a href="#" className="hover:text-primary">Politique de retour</a></li>
                        <li><a href="#" className="hover:text-primary">Livraison</a></li>
                        <li><a href="#" className="hover:text-primary">Mentions légales</a></li>
                    </ul>
                </div>

                {/* Contact / Réseaux */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <p className="text-sm text-gray-300 mb-2">contact@shop-website.fr</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Instagram" className="hover:text-primary">📸</a>
                        <a href="#" aria-label="Facebook" className="hover:text-primary">📘</a>
                        <a href="#" aria-label="Twitter" className="hover:text-primary">🐦</a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Shop-Website. Tous droits réservés.
            </div>
        </footer>
    );
}
