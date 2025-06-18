"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    IconShoppingCart,
    IconMenu2,
    IconX,
    IconLogout,
    IconUser,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useCartStore } from "@/stores/cartStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const total = useCartStore((s) => s.totalItems());
    const items = useCartStore((s) => s.items);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        router.push("/");
    };

    return (
        <header className="w-full border-b bg-white shadow-sm fixed z-50 top-0">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-yellow-600">
                    Shop-Website
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-gray-700 hover:text-yellow-600 font-medium transition"
                        >
                            {label}
                        </Link>
                    ))}

                    {/* Auth */}
                    {user ? (
                        <>
                            <Link href="/profil" title="Profil">
                                <IconUser className="w-6 h-6 text-gray-700 hover:text-yellow-600" />
                            </Link>
                            <button onClick={handleLogout} title="Se déconnecter">
                                <IconLogout className="w-6 h-6 text-gray-700 hover:text-red-600" />
                            </button>
                        </>
                    ) : (
                        <Link href="/login" title="Connexion">
                            <IconUser className="w-6 h-6 text-gray-700 hover:text-yellow-600" />
                        </Link>
                    )}

                    {/* Panier avec aperçu */}
                    <div className="relative group">
                        <Link href="/panier" className="relative">
                            <IconShoppingCart className="w-6 h-6 text-gray-700 hover:text-yellow-600 transition" />
                            {total > 0 && (
                                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {total}
                                </span>
                            )}
                        </Link>

                        {/* Aperçu panier au hover */}
                        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                            <div className="p-4 max-h-64 overflow-y-auto">
                                {items.length === 0 ? (
                                    <p className="text-sm text-gray-500">Ton panier est vide.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex items-center gap-3">
                                                <div className="relative w-10 h-10">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {item.quantity} × {item.price.toFixed(2)} €
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {items.length > 0 && (
                                <div className="p-2 text-center border-t">
                                    <Link
                                        href="/panier"
                                        className="text-sm text-yellow-600 hover:underline"
                                    >
                                        Voir le panier
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Menu mobile */}
                <button onClick={() => setOpen(!open)} className="md:hidden">
                    {open ? (
                        <IconX className="w-6 h-6 text-gray-700" />
                    ) : (
                        <IconMenu2 className="w-6 h-6 text-gray-700" />
                    )}
                </button>
            </div>

            {/* Mobile nav */}
            <div
                className={clsx(
                    "md:hidden bg-white border-t shadow-md transition-all duration-300 overflow-hidden",
                    open ? "max-h-96 py-4" : "max-h-0"
                )}
            >
                <nav className="flex flex-col items-center gap-4">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="text-gray-700 hover:text-yellow-600 font-medium"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/panier"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1"
                    >
                        <IconShoppingCart className="w-5 h-5" /> Panier ({total})
                    </Link>
                    {user ? (
                        <>
                            <Link
                                href="/profil"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-1"
                            >
                                <IconUser className="w-5 h-5" /> Profil
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpen(false);
                                }}
                                className="flex items-center gap-1 text-red-600"
                            >
                                <IconLogout className="w-5 h-5" /> Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-1"
                        >
                            <IconUser className="w-5 h-5" /> Connexion
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
