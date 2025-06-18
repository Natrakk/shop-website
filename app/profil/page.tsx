"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import AccordionSection from "@/components/ui/AccordionSection";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [newPassword, setNewPassword] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                router.push("/login");
            } else {
                setUser(firebaseUser);
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                if (userDoc.exists()) setUserData(userDoc.data());
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handlePasswordChange = async () => {
        if (!newPassword) return;
        try {
            await updatePassword(auth.currentUser!, newPassword);
            alert("Mot de passe mis à jour avec succès !");
            setNewPassword("");
        } catch (err: any) {
            alert("Erreur : " + err.message);
        }
    };

    const formattedDate = userData?.createdAt
        ? new Date(userData.createdAt).toLocaleDateString()
        : "";

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Mon profil</h1>

            <AccordionSection title="Mes informations personnelles">
                <p><strong>Email :</strong> {user?.email}</p>
                <p><strong>UID :</strong> {user?.uid}</p>
                <p><strong>Créé le :</strong> {formattedDate}</p>
            </AccordionSection>

            <AccordionSection title="Changer de mot de passe">
                <input
                    type="password"
                    className="w-full border px-3 py-2 rounded mb-3"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    onClick={handlePasswordChange}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Mettre à jour le mot de passe
                </button>
            </AccordionSection>

            <AccordionSection title="Mes commandes">
                {orders.length === 0 ? (
                    <p>Aucune commande trouvée.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="mb-2 border p-2 rounded">
                            <p>Commande #{order.id}</p>
                            <p>Date : {order.date}</p>
                        </div>
                    ))
                )}
            </AccordionSection>
        </div>
    );
}
