import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white overflow-hidden font-sans flex flex-col transition-colors duration-300">
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-blue-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-purple-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 sm:py-6 bg-black/5 dark:bg-white/5 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors gap-3">
        <Link href="/" className="text-lg sm:text-2xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent whitespace-nowrap">
          Finance<span className="bg-linear-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent text-xl sm:text-3xl">Tracker</span>
        </Link>
        <div className="flex gap-2 sm:gap-4 md:gap-6 items-center">
          <ThemeToggle />
          <Link href="/login" className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors whitespace-nowrap">
            Log In
          </Link>
          <Link href="/signup" className="px-3 py-2 sm:px-5 md:px-7 md:py-2.5 rounded-full bg-linear-to-r from-blue-600 to-purple-600 font-semibold text-xs sm:text-sm md:text-base text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 mt-10 md:mt-16">        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-tight">
          Master Your Money with <span className="bg-linear-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">Intelligence</span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed md:leading-relaxed transition-colors">
          Track your income and expenses, analyze your spending habits, and improve your financial health with our beautifully simple and powerful finance tracker.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none mb-12">
          <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 md:py-4 md:px-10 rounded-full bg-linear-to-r from-blue-600 to-purple-600 font-bold text-lg text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1 transition-all duration-300">
            Get Started Free
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 md:py-4 md:px-10 rounded-full bg-gray-100 dark:bg-white/5 font-bold text-lg text-gray-900 dark:text-white border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            View Dashboard
          </Link>
        </div>

        <div className="w-full max-w-5xl h-40 md:h-64 mt-auto rounded-t-2xl md:rounded-t-3xl bg-linear-to-b from-black/5 dark:from-white/10 to-transparent border border-black/10 dark:border-white/10 border-b-0 backdrop-blur-md relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col transition-all">
          <div className="w-full border-b border-black/10 dark:border-white/10 py-3 md:py-4 px-6 flex gap-2 items-center bg-black/5 dark:bg-white/5 transition-colors">
            <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
          </div>
          <div className="flex-1 w-full bg-linear-to-b from-black/5 dark:from-white/5 to-transparent transition-colors"></div>
        </div>
      </main>
    </div>
  );
}