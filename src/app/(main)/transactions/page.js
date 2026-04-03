"use client"

import EditForm from "@/components/EditForm";
import { useEffect, useState } from "react"

export default function Transactions() {

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
                if (!token) {
                    alert("You must be logged in to view transactions");
                    return;
                }
                const res = await fetch("/api/transactions", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (data.status === 200) {
                    setTransactions(data.transactions);
                } else {
                    alert("Failed to fetch transactions: " + data.message);
                }
            } catch (error) {
                console.error("Fetch transactions error:", error);
                alert("Failed to fetch transactions. Please try again.");
            }
        };
        fetchTransactions();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to add transactions");
                return;
            }
            const res = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  
                },
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
                alert("Transaction added successfully");
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
        try{
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to delete transactions");
                return;
            }   
            const res = await fetch(`/api/transactions/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.status === 200) {
                alert("Transaction deleted successfully");
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
    <div>
        <h1 className="text-3xl font-bold my-5 text-center">Transactions Page</h1>
        <form className="flex flex-col gap-4 justify-center items-start p-8 my-2 mx-5" onSubmit={handleSubmit}>
            <div className="flex gap-3">
                <label htmlFor="title" className="block text-white font-bold text-xl">Title :</label>
                <input type='text' id="title" placeholder="Transaction Title" className='border border-gray-300 rounded py-2 px-4' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex gap-3 ">
                <label htmlFor="amount" className="block text-white font-bold text-xl">Amount :</label>
                <input type='text' id="amount" placeholder="Transaction Amount" className='border border-gray-300 rounded py-2 px-4' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex gap-3">
                <label htmlFor="type" className="block text-white font-bold text-xl">Type :</label>
                <select id="type" className='border border-gray-300 rounded py-2 px-4' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income" className="bg-black">Income</option>
                    <option value="expense" className="bg-black">Expense</option>
                </select>
            </div>

            <div className="flex gap-3 ">
                <label htmlFor="note" className="block text-white font-bold text-xl">Note :</label>
                <input type='text' id="note" placeholder="Transaction Note" className='border border-gray-300 rounded py-2 px-4' value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="flex gap-3 ">
                <label htmlFor="date" className="block text-white font-bold text-xl">Date :</label>
                <input type='date' id="date" className='border border-gray-300 rounded py-2 px-4' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-1.5 px-4 rounded transition duration-500 cursor-pointer text-align-center">
                Add Transaction
            </button>
        </form>

        <div className="flex flex-col justify-center my-5">
            <h1 className="text-3xl font-bold text-center underline">Transaction History</h1>
            {transactions.length === 0 ? (
                <p className="text-center mt-5">No transactions found. Please add some transactions.</p>
            ) : (
                <div className="flex flex-col gap-4 mt-5">
                    {transactions.map((tx) => (
                        <div key={tx._id} className="bg-white p-4 rounded text-black">
                            <h2 className="text-xl font-bold">{tx.title}</h2>
                            <p className="text-lg">${tx.amount.toFixed(2)}</p>
                            <p className="text-md">{tx.type}</p>
                            <p className="text-md ">{tx.note}</p>
                            <p className="text-md ">{tx.date}</p>
                            <div className="flex gap-3">
                            <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-1.5 px-4 rounded transition duration-500 cursor-pointer" onClick={() => handleDelete(tx._id)}>
                                Delete
                            </button>
                            <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-1.5 px-4 rounded transition duration-500 cursor-pointer" onClick={() => setEditingTx(tx)}>
                                Edit
                            </button>
                            
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>

        {editingTx && <EditForm data={editingTx} onClose={() => setEditingTx(null)} setTransactions={setTransactions} />}
    </div>
  )
}