"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function DashboardPage() {

    return(
        <ProtectedRoute>
            <div className="flex flex-col items-center h-screen gap-3">
                <h1 className="text-3xl font-bold my-5">Welcome to Your Dashboard</h1>
                
            </div>
        </ProtectedRoute>
    )
}