import { addExpense, getAllExpenses, updateExpenseById, deleteExpenseById } from "../services/expense.services.js";
import logger from "../utils/logger.js";


export const addExpenseController = async (req, res) => {
    try {
        logger.info(`Expnese Controller:: Add New Expense...`);
        const expenseData = req.body;
        const newExpense = await addExpense(expenseData);
        logger.info(`Expense Details Added.`);
        res.status(201).json({
            message: "Expense added successfully",
            statusCode: 201,
            expense: newExpense,
        });
    } catch (error) {
        logger.error(`User Controller:: Failed to add new Expense!!`);
        res.status(400).json({ error: error.message });
    }
};

export const getAllExpensesController = async (req, res) => {
    try {
        logger.info(`Get All Exepnse...`);
        const expenses = await getAllExpenses();
        res.status(200).json({
            message: `${expenses.length} Exepsne Details Fetched..`,
            statusCode: 200,
            Expense: expenses
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateExpenseController = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`Update Expense Details .. ${id}`);
        const updatedData = req.body;
        const updatedExpense = await updateExpenseById(id, updatedData);
        logger.info(`Expense Details Updated..`);
        res.status(200).json({
            message: `Expense ${id} updated successfully`,
            statusCode: 200,
            expense: updatedExpense,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteExpenseController = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`Expense ${id} Details Update....`);
        const expense = await deleteExpenseById(id);
        res.status(200).json({ 
            message: "Expense deleted successfully",
            statusCode: 200,
            expense: expense
        });
    } catch (error) {
        logger.info(`Delete Expense Details..`);
        res.status(400).json({ error: error.message });
    }
};
