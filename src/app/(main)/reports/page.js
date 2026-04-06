"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function Reports(){
    const [month,setMonth] = useState("")
    const [year,setYear] = useState("")

    const [loading, setLoading] = useState(false)

    const handleGenerateReport = async(e) => {
        e.preventDefault()
        
        if (!month || !year) {
            alert("Please select both a month and a year.")
            return
        }

        try {
            setLoading(true)
            const res = await fetch("/api/transactions")
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
        <div className="flex flex-col items-center h-screen gap-3 w-full p-6">
            <p className="text-lg">Here you can genarate your monthly report as a pdf</p>
            <form className="flex gap-5 mt-10">
                <div className="flex justify-center items-center gap-4">
                    <label className="text-xl">Month</label>
                    <select 
                        value={month} 
                        onChange={(e)=>setMonth(e.target.value)} 
                        className="border-2 border-gray-600 bg-slate-800 text-white px-2 py-1 rounded"
                    >
                        <option value="" disabled>Select Month</option>
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
                <div className="flex justify-center items-center gap-4">
                    <label className="text-xl">Year</label>
                    <select 
                        value={year} 
                        onChange={(e)=>setYear(e.target.value)} 
                        className="border-2 border-gray-600 bg-slate-800 text-white px-2 py-1 rounded"
                    >
                        <option value="" disabled>Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400" 
                    onClick={handleGenerateReport}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </form>
        </div>
    )
}