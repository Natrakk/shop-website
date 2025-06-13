"use client";

import Link from "next/link";
import { useState } from "react";
import { IconShoppingCart, IconMenu2, IconX } from "@tabler/icons-react";
import clsx from "clsx";

const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Profil", href: "/profil" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b bg-white shadow-sm fixed z-50 top-0">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-yellow-600">
                    Shop-Website
                </Link>

                {/* Desktop links */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-gray-700 hover:text-yellow-600 transition font-medium"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link href="/panier" className="relative">
                        <IconShoppingCart className="w-6 h-6 text-gray-700 hover:text-yellow-600 transition" />
                        {/* Badge de panier */}
                        <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            2
                        </span>
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden focus:outline-none"
                >
                    {open ? (
                        <IconX className="w-6 h-6 text-gray-700" />
                    ) : (
                        <IconMenu2 className="w-6 h-6 text-gray-700" />
                    )}
                </button>
            </div>

            {/* Mobile menu */}
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
                            className="text-gray-700 hover:text-yellow-600 transition font-medium"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/panier"
                        onClick={() => setOpen(false)}
                        className="text-gray-700 hover:text-yellow-600 flex items-center gap-1"
                    >
                        <IconShoppingCart className="w-5 h-5" /> Panier
                    </Link>
                </nav>
            </div>
        </header>
    );
}
