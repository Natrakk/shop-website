// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Mot de passe oublié</h1>
            {sent ? (
                <p className="text-green-600">
                    📩 Un lien de réinitialisation a été envoyé à <strong>{email}</strong>
                </p>
            ) : (
                <form onSubmit={handleReset} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Ton adresse email"
                        className="w-full border px-4 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded">
                        Envoyer le lien
                    </button>
                </form>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
