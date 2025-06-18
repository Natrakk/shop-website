"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "France",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCred.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                address: form.address,
                city: form.city,
                zip: form.zip,
                country: form.country,
                createdAt: new Date().toISOString(),
            });

            router.push("/profil");
        } catch (err: any) {
            alert(err.message);
            console.error(err);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-4 p-6 border rounded shadow bg-white">
            <h1 className="text-2xl font-bold mb-6">Inscription</h1>
            <div className="mb-8">
                <GoogleAuthButton />
                <h2 className="pt-12">------------------------OU-------------------------</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        className="w-1/2 border px-4 py-2 rounded"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        className="w-1/2 border px-4 py-2 rounded"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border px-4 py-2 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    className="w-full border px-4 py-2 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone (facultatif)"
                    className="w-full border px-4 py-2 rounded"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Adresse (facultatif)"
                    className="w-full border px-4 py-2 rounded"
                    value={form.address}
                    onChange={handleChange}
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        className="w-1/2 border px-4 py-2 rounded"
                        value={form.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="Code postal"
                        className="w-1/2 border px-4 py-2 rounded"
                        value={form.zip}
                        onChange={handleChange}
                    />
                </div>
                <select
                    name="country"
                    className="w-full border px-4 py-2 rounded"
                    value={form.country}
                    onChange={handleChange}
                >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                </select>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded">
                    S'inscrire
                </button>
            </form>
        </div>
    );
}
