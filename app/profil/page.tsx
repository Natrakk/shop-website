"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { updatePassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfilPage() {
    const { user, loading } = useAuthRedirect();
    const [newPassword, setNewPassword] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        };

        const fetchOrders = async () => {
            if (!user) return;
            const q = query(collection(db, "orders"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const results: any[] = [];
            querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
            setOrders(results);
        };

        fetchUserData();
        fetchOrders();
    }, [user]);

    const handlePasswordChange = async () => {
        try {
            await updatePassword(user, newPassword);
            alert("Mot de passe mis à jour !");
            setNewPassword("");
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (loading) return <p className="p-8">Chargement...</p>;
    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto mt-16 p-6 border rounded shadow space-y-10">
            <h1 className="text-2xl font-bold">Mon profil</h1>

            <div className="space-y-2">
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>UID :</strong> {user.uid}</p>
                {userData?.createdAt && <p><strong>Créé le :</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>}
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Changer de mot de passe</h2>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="border px-4 py-2 rounded w-full"
                />
                <button
                    onClick={handlePasswordChange}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Mettre à jour le mot de passe
                </button>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Mes commandes</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-500">Aucune commande trouvée.</p>
                ) : (
                    <ul className="space-y-3">
                        {orders.map((order) => (
                            <li key={order.id} className="border rounded p-4">
                                <p><strong>Commande :</strong> {order.id}</p>
                                <p><strong>Date :</strong> {new Date(order.date).toLocaleDateString()}</p>
                                <p><strong>Total :</strong> {order.total.toFixed(2)} €</p>
                                <p><strong>Statut :</strong> {order.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
