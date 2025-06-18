"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (!u) {
                router.replace("/login"); // 🔁 redirige si non connecté
            } else {
                setUser(u);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    return { user, loading };
}
