import { deleteTransaction, updateTransaction } from "@/controllers/transactionsController";
import { connectDB } from "@/lib/db";

export async function DELETE(req, { params }) {
    try{
        await connectDB();
        const result = await deleteTransaction(req, { params });
        return Response.json(result, { status: result.status });
    }catch (error) {
        console.error("DELETE /api/transactions/:id error:", error);
        return Response.json({ status: 500, message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try{
        await connectDB();
        const result = await updateTransaction(req, { params });
        return Response.json(result, { status: result.status });
    }catch (error) {
        console.error("PUT /api/transactions/:id error:", error);
        return Response.json({ status: 500, message: "Server error" }, { status: 500 });
    }
}