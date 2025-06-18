"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // Redirige si déjà connecté
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) router.push("/profil");
        });
        return () => unsubscribe();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/profil");
        } catch (err: any) {
            alert(err.message);
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Connexion</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-4 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full border px-4 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded">
                    Se connecter
                </button>
            </form>

            <div className="my-4">
                <GoogleAuthButton />
            </div>

            <p className="text-sm text-center mt-4 text-blue-600">
                Pas encore inscrit ?{' '}
                <span
                    onClick={() => router.push("/register")}
                    className="underline cursor-pointer"
                >
                    Créer un compte
                </span>
            </p>
        </div>
    );
}