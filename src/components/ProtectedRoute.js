"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const {user, token, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user && !token){
            router.push("/login");
        }
    }, [loading, user, token, router]);

    if(loading){
        return <div>Loading...</div>;
    }
    if(!user && !token){
        return null;
    }
    return children;
}