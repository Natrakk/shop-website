"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";



export default function GoogleAuthButton() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    firstName: user.displayName?.split(" ")[0] || "",
                    lastName: user.displayName?.split(" ")[1] || "",
                    createdAt: new Date().toISOString(),
                    provider: "google",
                });
            }

            router.push("/profil");
        } catch (error: any) {
            alert(error.message);
            console.error("Erreur Google Auth:", error);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
            <span className="text-sm text-gray-700">Continuer avec</span>
            <Image src="/icons/google-icon.png" alt="Google" width={50} height={50} />
        </button>
    );
}