import Expense from "../models/expense.model.js";
import logger from "../utils/logger.js";


export const addExpense = async (expenseData) => {
    try {
        logger.info("Add Expense Details ..");
        const expense = new Expense(expenseData);
        await expense.save();
        logger.info(`Expense Details Successfully..`);
        return expense;
    } catch (error) {
        logger.error(`Failed to Add New Expense!!`);
        throw new Error("Error adding expense: " + error.message);
    }
};


export const getAllExpenses = async () => {
    try {
        logger.info(`Get all Expense Details`);
        return await Expense.find();
    } catch (error) {
        logger.error(`Failed to Get all Expense!!`);
        throw new Error("Error fetching expenses: " + error.message);
    }
};


export const updateExpenseById = async (id, updatedData) => {
    try {
        logger.info(`Update Expense ${id} Details...`);
        const expense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });
        if (!expense) {
            logger.info(`Expense Details not present..`);
            throw new Error("Expense not found");
        }
        logger.info(`Update Expense Details...`);
        return expense;
    } catch (error) {
        logger.error("Update Expense Detaits...");
        throw new Error("Error updating expense: " + error.message);
    }
};


export const deleteExpenseById = async (id) => {
    try {
        logger.info(`Expense ${id} Details Deleted..`);
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            throw new Error("Expense not found");
        }
        logger.info("Expense Details Deleted...");
        return expense;
    } catch (error) {
        logger.info(`Expense deleted ${error}`);
        throw new Error("Error deleting expense: " + error.message);
    }
};
