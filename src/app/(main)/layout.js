"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MainLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { logout, user } = useAuth();

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
            } else {
                alert("Logout failed: " + data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transactions", path: "/transactions" },
        { name: "Reports", path: "/reports" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300">
            <div className="fixed top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen pointer-events-none animate-pulse -z-10"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-purple-600/10 blur-[150px] mix-blend-screen pointer-events-none animate-pulse -z-10" style={{ animationDelay: '2s' }}></div>

            <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg transition-all duration-300">
                <Link href="/dashboard" className="text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
                    Finance<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent text-3xl">Tracker</span>
                </Link>
                <div className="flex items-center justify-center gap-2 md:gap-6 font-semibold">
                    <div className="hidden md:flex gap-1 bg-black/5 dark:bg-black/20 p-1 rounded-full border border-black/5 dark:border-white/5 mr-4 transition-colors">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.path} 
                                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${pathname === link.path ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4 border-l border-black/10 dark:border-white/10 pl-4 transition-colors">
                        <ThemeToggle />
                        {user && (
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:block">
                                Hi, <span className="text-black dark:text-white">{user.name || user.username || user.email}</span>
                            </span>
                        )}
                        <button 
                            onClick={handleLogOut} 
                            className="bg-black/5 dark:bg-white/10 hover:bg-red-500/80 border border-black/10 dark:border-white/10 hover:border-red-500 text-gray-900 dark:text-white font-semibold py-1.5 px-5 rounded-full transition-all duration-300 cursor-pointer shadow-sm text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            
            <div className="md:hidden flex justify-center gap-1 bg-white/50 dark:bg-white/5 border-b border-black/10 dark:border-white/10 p-2 z-40 backdrop-blur-md transition-colors">
                {navLinks.map((link) => (
                     <Link 
                         key={link.name} 
                         href={link.path} 
                         className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${pathname === link.path ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
                     >
                         {link.name}
                     </Link>
                ))}
            </div>

            <main className="flex-1 relative z-10 w-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}