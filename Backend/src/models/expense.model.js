import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["income", "expense"], // Can either be "income" or "expense"
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{timestamps: true});

const Expense = mongoose.model('Expense',expenseSchema);
export default Expense;