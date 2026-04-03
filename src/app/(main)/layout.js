"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function MainLayout({ children }) {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogOut = async () => {
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "logout"
                })
            });
            const data = await res.json();
            if (data.status === 200) {
                logout();
                router.push("/login");
                alert("Logout successful");
            } else {
                alert("Logout failed: " + data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen">
            <nav className="flex items-center justify-between w-full px-5 py-4 bg-blue-600 text-white shadow-md">
                <Link href="/dashboard" className="text-2xl font-bold hover:text-gray-200 transition">
                    Finance Tracker
                </Link>
                <div className="flex items-center justify-center gap-6 font-semibold">
                    <Link href="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
                    <Link href="/transactions" className="hover:text-gray-300 transition">Transactions</Link>
                    <Link href="/reports" className="hover:text-gray-300 transition">Reports</Link>
                    <button 
                        onClick={handleLogOut} 
                        className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-5 rounded-lg transition duration-300 cursor-pointer shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}