"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
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

    return(
        <ProtectedRoute>
            <div className="flex flex-col items-center h-screen gap-3">
                <nav className="flex items-center justify-between w-full px-3 py-2 bg-blue-500 text-black font-bold">
                    <h1 className="text-2xl">Finance Tracker</h1>
                    <div className="flex items-center justify-center gap-4 mx-3">
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/transactions">Transactions</Link>
                        <Link href="/reports">Reports</Link>
                        <button onClick={handleLogOut} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1.5 px-4 rounded transition duration-300 cursor-pointer text-align-center ">Logout</button>
                    </div>
                </nav>
                <h1 className="text-3xl font-bold my-5">Welcome to Your Dashboard</h1>
                <p className="text-center my-3">
                    Here you can manage your finances, track your income and expenses,
                    and analyze your spending habits. Use the navigation menu to access
                    different features of the finance tracker.
                </p>
            </div>
        </ProtectedRoute>
    )
}