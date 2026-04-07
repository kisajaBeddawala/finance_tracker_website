"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bar, BarChart, Legend, Pie, PieChart, Tooltip, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import { useAuth } from "../../../context/AuthContext";

const COLORS = ["#4ade80", "#f87171"];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow-xl dark:shadow-2xl backdrop-blur-lg transition-colors">
                <p className="text-gray-800 dark:text-gray-200 font-semibold mb-3 border-b border-gray-200 dark:border-white/10 pb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-md flex justify-between gap-6" style={{ color: entry.color }}>
                        <span>{entry.name}</span>
                        <span className="font-bold">${entry.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 p-3 rounded-xl shadow-xl dark:shadow-2xl backdrop-blur-lg text-center font-bold transition-colors">
                <p style={{ color: payload[0].payload.fill }}>
                    {payload[0].name}: ${payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </p>
            </div>
        );
    }
    return null;
};

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const headers = {};
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
                const response = await fetch("/api/transactions", { headers });
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

    return (
        <ProtectedRoute>
            <div className="relative min-h-screen bg-transparent pb-16 pt-6 transition-colors">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-purple-600 bg-clip-text text-transparent">Dashboard</span> Overview
                        </h1>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-10 text-center shadow-lg dark:shadow-2xl transition-colors">
                            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">No transaction data available yet.</p>
                            <p className="text-sm text-gray-500 mt-2">Start adding transactions to see your charts.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-lg dark:shadow-xl flex flex-col justify-center transition-all hover:-translate-y-1">
                                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-1 transition-colors">Net Balance</p>
                                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
                                        ${(totalIncome - totalExpense).toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </h2>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 dark:from-[#112a1d] to-white dark:to-white/5 backdrop-blur-xl border border-green-200 dark:border-[#4ade80]/30 p-6 rounded-3xl shadow-lg dark:shadow-xl flex flex-col justify-center transition-all hover:-translate-y-1">
                                    <p className="text-green-700 dark:text-[#4ade80] font-medium mb-1 transition-colors">Total Income</p>
                                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
                                        ${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </h2>
                                </div>
                                <div className="bg-gradient-to-br from-red-50 dark:from-[#3b1515] to-white dark:to-white/5 backdrop-blur-xl border border-red-200 dark:border-[#f87171]/30 p-6 rounded-3xl shadow-lg dark:shadow-xl flex flex-col justify-center transition-all hover:-translate-y-1">
                                    <p className="text-red-600 dark:text-[#f87171] font-medium mb-1 transition-colors">Total Expense</p>
                                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
                                        ${totalExpense.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                    </h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-lg dark:shadow-2xl flex flex-col transition-colors">
                                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 transition-colors">Monthly Cashflow</h2>
                                    <div style={{ width: '100%', height: 350 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 13}} axisLine={false} tickLine={false} dy={10}/>
                                                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 13}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`}/>
                                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(156, 163, 175, 0.1)'}} />
                                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                                <Bar dataKey="income" fill="#4ade80" name="Income" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                                <Bar dataKey="expense" fill="#f87171" name="Expense" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-lg dark:shadow-2xl flex flex-col transition-colors">
                                    <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 w-full text-left transition-colors">Income vs Expense</h2>
                                    <div style={{ width: '100%', height: 350 }} className="flex justify-center items-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={90}
                                                    outerRadius={130}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomPieTooltip />} />
                                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}