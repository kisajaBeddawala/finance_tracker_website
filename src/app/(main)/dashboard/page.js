"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bar, BarChart, Legend, Pie, PieChart, Tooltip, XAxis, YAxis, Cell } from "recharts";

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("/api/transactions");
                const result = await response.json();
                if (result.status === 200) {
                    setTransactions(result.transactions);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const barDataMap = {};

    transactions.forEach(t => {
        const d = new Date(t.date);
        const month = monthNames[d.getMonth()];
        if (!barDataMap[month]) {
            barDataMap[month] = { name: month, income: 0, expense: 0, monthIndex: d.getMonth() };
        }
        if (t.type === "income") {
            barDataMap[month].income += t.amount;
        } else if (t.type === "expense") {
            barDataMap[month].expense += t.amount;
        }
    });

    const barData = Object.values(barDataMap).sort((a, b) => a.monthIndex - b.monthIndex);

    const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

    const pieData = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
    ];
    
    const COLORS = ["#82ca9d", "#ff7f7f"];

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center h-screen gap-3 w-full p-6">
                <h1 className="text-3xl font-bold my-5">Welcome to Your Dashboard</h1>
                {isLoading ? (
                    <p>Loading your data...</p>
                ) : transactions.length === 0 ? (
                    <p>No transaction data available yet.</p>
                ) : (
                    <div className="flex flex-col md:flex-row gap-10 w-full justify-center">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
                            <BarChart width={500} height={300} data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                                <Bar dataKey="expense" fill="#ff7f7f" name="Expense" />
                            </BarChart>
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}