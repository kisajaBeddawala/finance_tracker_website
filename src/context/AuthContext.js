"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { data: session, status: nextAuthStatus } = useSession();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [jwtLoading, setJwtLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try{
                const payload = JSON.parse(atob(storedToken.split(".")[1]));
                if(payload.exp * 1000 > Date.now()){
                    setToken(storedToken);
                    setUser({ 
                        id: payload.id, 
                        email: payload.email,
                        name: payload.name 
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Error parsing token:", error);
                localStorage.removeItem("token");
            }
        }
        setJwtLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
    }

    const logout = async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        if (session) {
            await signOut({ redirect: false });
        }
    }

    const isLoading = jwtLoading || nextAuthStatus === "loading";
    const isAuthenticatedUser = user || session?.user;
    
    return (
        <AuthContext.Provider value={{ 
            user: isAuthenticatedUser, 
            token, 
            loading: isLoading, 
            login, 
            logout,
            isGoogleUser: !!session?.user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}