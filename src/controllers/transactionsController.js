import verifyToken, { getTokenFromRequest } from "@/lib/auth";
import Transaction from "@/models/Transaction";



function getUserFromRequest(req) {
    const token = getTokenFromRequest(req);

    if (!token) {
        return { error: { status: 401, message: "Unauthorized" } };
    }

    const user = verifyToken(token);
    if (!user) {
        return { error: { status: 401, message: "Invalid token" } };
    }

    return { userId: user.userId };
}

export async function getTransactions(req) {
    try{
        const user = getUserFromRequest(req);
        if (user.error) {
            return user.error;
        }
        const transactions = await Transaction.find({ userId: user.userId }).sort({ date: -1 });
        return {
            status: 200,
            message: "Transactions retrieved successfully",
            transactions
        }
    }catch(error){
        console.error("Get transactions error:", error);
        return {
            status: 500,
            message: "Server error"
        }
    }
}

export async function createTransaction(req) {
    try{
        const user = getUserFromRequest(req);
        if (user.error) {
            return user.error;
        }
        const body = await req.json();
        const { title, amount, type, note, date } = body;

        if(!title || amount === undefined || !type){
            return {
                status: 400,
                message: "Title, amount and type are required"
            }
        }
        if (amount < 0) {
            return {
                status: 400,
                message: "Amount must be a positive number"
            }
        }
        const transaction = await Transaction.create({
            userId: user.userId,
            title,
            amount,
            type,
            note,
            date
        });

        return {
            status: 201,
            message: "Transaction created successfully",
            transaction
        }

    }catch(error){
        console.error("Create transaction error:", error);
        return {
            status: 500,
            message: "Server error"
        }
    }
}