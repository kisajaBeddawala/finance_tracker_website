"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user,setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        try{
            const payload = JSON.parse(atob(storedToken.split(".")[1]));
            if(payload.exp * 1000 > Date.now()){
                setToken(storedToken);
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Error parsing token:", error);
            localStorage.removeItem("token");
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}