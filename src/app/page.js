import Link from "next/link"

export default function Home() {
  return(
    <div className="flex flex-col items-center h-screen gap-3">
      <div className="flex justify-between items-center p-4 w-screen bg-gray-800">
        <h1 className="text-3xl font-bold mx-5">Finance Tracker</h1>
        <div className="flex gap-3 justify-center items-center mx-5">
          <Link href="/login" className="bg-blue-800 rounded-4xl px-5 py-1.5">Login</Link>
          <Link href="/signup" className="bg-blue-800 rounded-4xl px-5 py-1.5">Sign Up</Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-10 px-5">
        <h1 className="text-3xl font-bold my-5">Manage Your Finances Easily</h1>
        <p className="text-center my-3">
          Track your income and expenses, analyze spending,
          and improve your financial health with our simple
          and powerful finance tracker.
        </p>
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-2xl font-bold">Get Started Today</h2>
          <Link href="/signup" className="text-xl font-bold py-2 px-12 bg-blue-800 rounded-4xl">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}