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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative text-black">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-4 text-black hover:text-blue-500 font-bold text-xl cursor-pointer"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-black text-center">Edit Transaction</h2>
                <form className="flex flex-col gap-4 text-black">
                    <input type='text' id="title" placeholder="Transaction Title" className='border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type='number' id="amount" placeholder="Transaction Amount" className='border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <select id="type" className='border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income" className="bg-white text-black">Income</option>
                        <option value="expense" className="bg-white text-black">Expense</option>
                    </select>
                    <input type='text' id="note" placeholder="Transaction Note" className='border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500' value={note} onChange={(e) => setNote(e.target.value)} />
                    <input type='date' id="date" className='border border-gray-600 rounded py-2 px-4 focus:outline-none focus:border-blue-500' value={date} onChange={(e) => setDate(e.target.value)} />
                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition duration-300 cursor-pointer">
                            Cancel
                        </button>
                        <button type="button" onClick={() => handleEdit(data._id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 cursor-pointer">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}