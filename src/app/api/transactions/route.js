import { createTransaction, deleteTransaction, getTransactions } from "@/controllers/transactionsController";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try{
        await connectDB();
        const result = await getTransactions(req);
        return Response.json(result, { status: result.status });
    }catch (error) {
        console.error("GET /api/transactions error:", error);
        return Response.json({ status: 500, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
    try{
        await connectDB();
        const result = await createTransaction(req);
        return Response.json(result, { status: result.status });
    }catch (error) {
        console.error("POST /api/transactions error:", error);
        return Response.json({ status: 500, message: "Server error" }, { status: 500 });
    }
}

