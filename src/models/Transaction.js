import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
        min: 0,
    },
    type:{
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    note:{
        type: String,
        default: "",
    },
    date:{
        type: Date,
        default: Date.now,
    }
},{timestamps: true});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)