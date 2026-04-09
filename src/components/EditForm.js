"use client"
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function EditForm({ data, onClose, setTransactions }) {
    const { isGoogleUser } = useAuth();

    const [title, setTitle] = useState(data.title ?? "");
    const [amount, setAmount] = useState(data.amount ?? "");
    const [type, setType] = useState(data.type ?? "income");
    const [note, setNote] = useState(data.note ?? "");
    const [date, setDate] = useState(data.date ?? "");

    async function handleEdit(id) {
        try{
            const token = localStorage.getItem("token");
            if (!token && !isGoogleUser) {
                alert("You must be logged in to edit transactions");
                return;
            }   

            const headers = {
                "Content-Type": "application/json"
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`/api/transactions/${id}`, {
                method: "PUT",
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
            if (data.status === 200) {
                alert("Transaction updated successfully");
                setTransactions((prev) => prev.map((tx) => tx._id === id ? data.transaction : tx));
                onClose();
            } else {
                alert("Failed to update transaction: " + data.message);
            }
        }catch(error){
            console.error("Update transaction error:", error);
            alert("Failed to update transaction. Please try again.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex justify-center items-center z-50 p-4 transition-colors mt-10">
            <div className="bg-white dark:bg-[#11111a] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-white/10 relative transition-colors">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-5 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-bold text-2xl cursor-pointer"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center transition-colors">Edit Transaction</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-title" className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">Title</label>
                        <input type='text' id="edit-title" placeholder="Transaction Title" className='bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-amount" className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">Amount</label>
                        <input type='number' id="edit-amount" placeholder="Transaction Amount" className='bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-type" className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">Type</label>
                        <select id="edit-type" className='bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-note" className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">Note</label>
                        <input type='text' id="edit-note" placeholder="Transaction Note" className='bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all' value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-date" className="text-xs font-semibold text-gray-600 dark:text-gray-400 ml-1">Date</label>
                        <input type='date' id="edit-date" className='bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-12.5 appearance-none' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl transition duration-300 cursor-pointer">
                            Cancel
                        </button>
                        <button type="button" onClick={() => handleEdit(data._id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 cursor-pointer">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}