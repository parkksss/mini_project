import FirebaseClient from "@/models/firebase_client";
import { InAuthUser } from "@/models/in_auth_user";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    async function signInWithGoogle(): Promise<void> {
        const provider = new GoogleAuthProvider();
        try {
            const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider)
            if (signInResult.user) {
                console.info(signInResult.user);
                // 비동기로 api 콜, json 형태로 보내니까 header에 Contents-Type 특정해주기
                const resp = await fetch('/api/members.add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: signInResult.user.uid,
                        email: signInResult.user.email,
                        displayName: signInResult.user.displayName,
                        photoURL: signInResult.user.photoURL
                    }),
                });
                console.info({ status: resp.status });
                const respData = await resp.json();
                console.info(respData);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    }
    const signOut = () => FirebaseClient.getInstance().Auth.signOut().then(clear);
    const authStateChanged = async (authState: User | null) => {
        if (authState === null) {
            setAuthUser(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setAuthUser({
            uid: authState.uid,
            email: authState.email,
            photoURL: authState.photoURL,
            displayName: authState.displayName,
        });
        setLoading(false);
    }
    useEffect(() => {
        const unsubscrbe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
        return () => unsubscrbe();
    }, []);

    return {
        authUser,
        loading,
        signInWithGoogle,
        signOut,
    };
}