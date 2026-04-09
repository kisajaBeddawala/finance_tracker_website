"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useAuth } from "../../../context/AuthContext"

export default function Reports(){
    const [month,setMonth] = useState("")
    const [year,setYear] = useState("")

    const [loading, setLoading] = useState(false)
    const { token } = useAuth()

    const handleGenerateReport = async(e) => {
        e.preventDefault()
        
        if (!month || !year) {
            alert("Please select both a month and a year.")
            return
        }

        try {
            setLoading(true)
            const headers = {}
            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }
            const res = await fetch("/api/transactions", { headers })
            const result = await res.json()
            
            if(result.status !== 200){
                alert("Failed to fetch transactions")
                return
            }

            const filteredData = result.transactions.filter(t => {
                const tDate = new Date(t.date)
                return (tDate.getMonth() + 1).toString() === month && tDate.getFullYear().toString() === year
            })

            if(filteredData.length === 0){
                alert("No transactions found for the selected month and year.")
                return
            }

            const doc = new jsPDF()
            
            const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const title = `Monthly Finance Report - ${monthNames[month]} ${year}`
            
            doc.setFontSize(20)
            doc.text(title, 14, 22)
            
            let totalIncome = 0
            let totalExpense = 0

            const tableBody = filteredData.map(t => {
                const amount = Number(t.amount) || 0
                if(t.type === "income") totalIncome += amount
                if(t.type === "expense") totalExpense += amount
                
                return [
                    new Date(t.date).toLocaleDateString(),
                    t.type.charAt(0).toUpperCase() + t.type.slice(1),
                    `$${amount.toFixed(2)}` 
                ]
            })

            autoTable(doc, {
                startY: 30,
                head: [['Date', 'Type', 'Amount']],
                body: tableBody,
            })

            const finalY = doc.lastAutoTable.finalY || 30
            doc.setFontSize(14)
            doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, finalY + 10)
            doc.text(`Total Expense: $${totalExpense.toFixed(2)}`, 14, finalY + 20)
            doc.text(`Net Income: $${(totalIncome - totalExpense).toFixed(2)}`, 14, finalY + 30)

            doc.save(`Finance_Report_${year}_${monthNames[month]}.pdf`)
            
        } catch (err) {
            console.error(err)
            alert("An error occurred while generating the report")
        } finally {
            setLoading(false)
        }
    }  

    return (
        <div className="flex flex-col items-center min-h-[80vh] w-full p-4 sm:p-6 pt-8 sm:pt-10 transition-colors">
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-white transition-colors">
                    <span className="bg-linear-to-r from-blue-600 via-purple-500 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-purple-600 bg-clip-text text-transparent">Financial</span> Reports
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 transition-colors">Generate your transaction history as a downloadable PDF.</p>
            </div>
            
            <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl dark:shadow-2xl w-full max-w-xl flex flex-col items-center mt-2 relative overflow-hidden transition-colors">
                <form className="flex flex-col gap-6 mt-4 w-full" onSubmit={handleGenerateReport}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col w-full gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Select Month</label>
                            <select 
                                value={month} 
                                onChange={(e)=>setMonth(e.target.value)} 
                                className="bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all w-full cursor-pointer appearance-none"
                            >
                                <option value="" disabled className="text-gray-500">Pick a month...</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Select Year</label>
                            <select 
                                value={year} 
                                onChange={(e)=>setYear(e.target.value)} 
                                className="bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all w-full cursor-pointer appearance-none"
                            >
                                <option value="" disabled className="text-gray-500">Pick a year...</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`mt-4 w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] dark:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 transform ${loading || !year || !month ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_6px_20px_rgba(139,92,246,0.3)] dark:hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5'}`}
                        disabled={loading || !year || !month}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Generating...
                            </span>
                        ) : "Download PDF Report"}
                    </button>
                </form>
            </div>
        </div>
    )
}