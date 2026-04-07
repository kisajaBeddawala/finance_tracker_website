"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    type: "signup",
                    email,
                    username,
                    password
                })
            })

            const data = await res.json();
            if(res.ok){
                router.push("/login");
            } else {
                alert("Signup failed: " + data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return(
        <div className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden font-sans py-12 px-4">
            <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-blue-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-purple-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mt-4">Create an account</h1>
                    <p className="text-gray-400 mt-2 text-sm">Join us to start managing your finances.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-300 ml-1">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" required/>
                    </div>
                    
                    <button type="submit" className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
                        Sign Up
                    </button>
                    
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-sm text-gray-400">Or continue with</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>
                    
                    <button type="button" className="mt-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition duration-300" onClick={()=> signIn("google",{callbackUrl:"/dashboard"})}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/> Google
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}