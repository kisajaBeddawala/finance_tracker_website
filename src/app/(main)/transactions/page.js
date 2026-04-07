"use client"

import EditForm from "@/components/EditForm";
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext";

export default function Transactions() {
    const { isGoogleUser } = useAuth();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");

    const [transactions, setTransactions] = useState([]);
    const [editingTx, setEditingTx] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token && !isGoogleUser) {
                    alert("You must be logged in to view transactions");
                    return;
                }

                const headers = {};
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const res = await fetch("/api/transactions", { headers });
                const data = await res.json();
                if (data.status === 200) {
                    setTransactions(data.transactions);
                } else {
                    alert("Failed to fetch transactions: " + data.message);
                }
            } catch (error) {
                console.error("Fetch transactions error:", error);
            }
        };
        fetchTransactions();
    }, [isGoogleUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            if (!token && !isGoogleUser) {
                alert("You must be logged in to add transactions");
                return;
            }

            const headers = {
                "Content-Type": "application/json"
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch("/api/transactions", {
                method: "POST",
                headers,
                body: JSON.stringify({
                    title,
                    amount: parseFloat(amount),
                    type,
                    note,
                    date                
                })
            });
            const data = await res.json();
            if (data.status === 201) {
                setTitle("");
                setAmount("");
                setType("income");
                setNote("");
                setDate("");
                setTransactions([data.transaction, ...transactions]);
            } else {
                alert("Failed to add transaction: " + data.message);
            }
        }catch(error){
            console.error("Add transaction error:", error);
            alert("Failed to add transaction. Please try again.");
        }
    }

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this transaction?")) return;
        try{
            const token = localStorage.getItem("token");
            if (!token && !isGoogleUser) {
                alert("You must be logged in to delete transactions");
                return;
            }   

            const headers = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
                headers
            });
            const data = await res.json();
            if (data.status === 200) {
                setTransactions((prev) => prev.filter((tx) => tx._id !== id));
            } else {
                alert("Failed to delete transaction: " + data.message);
            }
        }catch(error){
            console.error("Delete transaction error:", error);
            alert("Failed to delete transaction. Please try again.");
        }
    }

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            
            <div className="lg:col-span-4 flex flex-col items-center order-2 lg:order-1">
                <div className="w-full sticky top-28 bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden transition-colors">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-600/20 dark:to-purple-600/20 border-b border-gray-200 dark:border-white/10 py-5 px-6 transition-colors">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Add Transaction</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">Record a new income or expense</p>
                    </div>
                    
                    <form className="p-6 flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Title</label>
                            <input type='text' id="title" placeholder="e.g. Grocery, Salary" className='bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Amount ($)</label>
                            <input type='number' step="0.01" min="0" id="amount" placeholder="0.00" className='bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all' value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Type</label>
                                <select id="type" className='bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer' value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Date</label>
                                <input type='date' id="date" className='bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[50px] appearance-none' value={date} onChange={(e) => setDate(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="note" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Note (Optional)</label>
                            <textarea id="note" placeholder="Write a short description..." className='bg-gray-50 dark:bg-[#11111a] border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[80px] resize-none' value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>
                        
                        <button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] dark:hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
                            Add Transaction
                        </button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-8 flex flex-col order-1 lg:order-2">
                <div className="flex justify-between items-end mb-6 border-b border-gray-300 dark:border-white/10 pb-4 transition-colors">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors">Record <span className="text-purple-600 dark:text-purple-400">History</span></h1>
                    <span className="bg-gray-200 dark:bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">{transactions.length} items</span>
                </div>

                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl text-center shadow-md dark:shadow-none transition-colors">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 transition-colors">
                            <span className="text-2xl opacity-50">📋</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 transition-colors">No Transactions Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm transition-colors">When you add an income or expense, they will elegantly appear in this list.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {transactions.map((tx) => (
                            <div key={tx._id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-5 rounded-2xl transition-all duration-300 shadow-md dark:shadow-none">
                                
                                <div className="flex flex-1 min-w-0 items-center justify-start gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-green-100 dark:bg-[#4ade80]/20 text-green-600 dark:text-[#4ade80]' : 'bg-red-100 dark:bg-[#f87171]/20 text-red-600 dark:text-[#f87171]'}`}>
                                        {tx.type === 'income' ? '↓' : '↑'}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate w-full transition-colors">{tx.title}</h2>
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                                            <span>{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                                            {tx.note && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500 hidden sm:block flex-shrink-0"></span>
                                                    <span className="truncate max-w-[200px]">{tx.note}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between sm:justify-end gap-3 sm:gap-6 mt-4 sm:mt-0 w-full sm:w-auto">
                                    
                                    <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center sm:order-2">
                                        <p className={`text-xl font-extrabold ${tx.type === 'income' ? 'text-green-600 dark:text-[#4ade80]' : 'text-red-500 dark:text-[#f87171]'}`}>
                                            {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 w-full sm:w-auto justify-end flex-shrink-0 sm:order-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="flex-1 sm:flex-none bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium" onClick={() => setEditingTx(tx)}>
                                            Edit
                                        </button>
                                        <button className="flex-1 sm:flex-none bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/40 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium" onClick={() => handleDelete(tx._id)}>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {editingTx && <EditForm data={editingTx} onClose={() => setEditingTx(null)} setTransactions={setTransactions} />}
    </div>
  )
}