"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "login",
                    email,
                    password
                })
            });
            const data = await res.json();
            if (data.status === 200) {
                login(data.user, data.token);
                router.push("/dashboard");
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("login failed. Please try again.");
        }
    };

    return(
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center border-white border-2 p-15 rounded-2xl">
                <h1 className="text-3xl font-bold mb-3">Login</h1>
                <div className="w-full h-0.5 bg-white mb-6"></div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-5">
                        <label htmlFor="email" className=" mb-2 text-lg font-semibold">Email :</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your email " className="bg-white/20 py-1 px-2 rounded" required/>
                    </div>
                    <div className="flex flex-col mb-10">
                        <label htmlFor="password" className=" mb-2 text-lg font-semibold">Password :</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password " className="bg-white/20 py-1 px-2 rounded" required/>
                    </div>
                    
                    <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-1.5 px-4 rounded transition duration-500 cursor-pointer text-align-center w-full">
                        Login
                    </button>
                    <p className="text-center my-2">Or</p>
                    <button className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-3 border shadow transition cursor-pointer" onClick={()=> signIn("google",{callbackUrl:"/dashboard"})}>
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6"/>Continue with Google
                    </button>

                    <p className="mt-3 text-md">Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:text-blue-800">Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}