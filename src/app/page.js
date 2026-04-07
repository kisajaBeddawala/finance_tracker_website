import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans flex flex-col">
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-blue-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-purple-600/20 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Finance<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent text-3xl">Tracker</span>
        </Link>
        <div className="flex gap-4 md:gap-6 items-center">
          <Link href="/login" className="text-sm md:text-base text-gray-300 hover:text-white font-medium transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="px-5 py-2 md:px-7 md:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition-all duration-300">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 mt-12 md:mt-16">        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-tight">
          Master Your Money with <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">Intelligence</span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed md:leading-relaxed">
          Track your income and expenses, analyze your spending habits, and improve your financial health with our beautifully simple and powerful finance tracker.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none mb-12">
          <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 md:py-4 md:px-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-lg text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1 transition-all duration-300">
            Get Started Free
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 md:py-4 md:px-10 rounded-full bg-white/5 font-bold text-lg text-white border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            View Dashboard
          </Link>
        </div>

        <div className="w-full max-w-5xl h-40 md:h-64 mt-auto rounded-t-2xl md:rounded-t-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 border-b-0 backdrop-blur-md relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="w-full border-b border-white/10 py-3 md:py-4 px-6 flex gap-2 items-center bg-white/5">
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
          <div className="flex-1 w-full bg-gradient-to-b from-white/5 to-transparent"></div>
        </div>
      </main>
    </div>
  );
}