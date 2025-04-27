import * as expenseService from "../src/services/expense.services.js";
import Expense from "../src/models/expense.model.js"; 
import logger from "../src/utils/logger.js"; 

jest.mock("../src/models/expense.model.js");
jest.mock("../src/utils/logger.js");

describe("Expense Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("addExpense", () => {
        it("should add an expense successfully", async () => {
            const expenseData = { name: "Food", amount: 50 };
            Expense.mockImplementationOnce(() => ({
                save: jest.fn().mockResolvedValue(expenseData),
            }));

            const result = await expenseService.addExpense(expenseData);

            expect(result).toEqual(expenseData);
            expect(logger.info).toHaveBeenCalledWith("Add Expense Details ..");
            expect(logger.info).toHaveBeenCalledWith("Expense Details Successfully..");
        });

        it("should throw an error if adding expense fails", async () => {
            const expenseData = { name: "Food", amount: 50 };
            const error = new Error("Database Error");
            Expense.mockImplementationOnce(() => ({
                save: jest.fn().mockRejectedValue(error),
            }));

            await expect(expenseService.addExpense(expenseData)).rejects.toThrow(
                "Error adding expense: Database Error"
            );
            expect(logger.error).toHaveBeenCalledWith("Failed to Add New Expense!!");
        });
    });

    describe("getAllExpenses", () => {
        it("should return all expenses", async () => {
            const mockExpenses = [{ name: "Food", amount: 50 }, { name: "Rent", amount: 500 }];
            Expense.find.mockResolvedValue(mockExpenses);

            const result = await expenseService.getAllExpenses();

            expect(result).toEqual(mockExpenses);
            expect(logger.info).toHaveBeenCalledWith("Get all Expense Details");
        });

        it("should throw an error if fetching expenses fails", async () => {
            const error = new Error("Database Error");
            Expense.find.mockRejectedValue(error);

            await expect(expenseService.getAllExpenses()).rejects.toThrow(
                "Error fetching expenses: Database Error"
            );
            expect(logger.error).toHaveBeenCalledWith("Failed to Get all Expense!!");
        });
    });

    describe("updateExpenseById", () => {
        it("should update an expense successfully", async () => {
            const id = "123";
            const updatedData = { name: "Food", amount: 100 };
            const mockExpense = { _id: id, ...updatedData };
            Expense.findByIdAndUpdate.mockResolvedValue(mockExpense);

            const result = await expenseService.updateExpenseById(id, updatedData);

            expect(result).toEqual(mockExpense);
            expect(logger.info).toHaveBeenCalledWith(`Update Expense ${id} Details...`);
            expect(logger.info).toHaveBeenCalledWith(`Update Expense Details...`);
        });

        it("should throw an error if expense not found", async () => {
            const id = "123";
            const updatedData = { name: "Food", amount: 100 };
            Expense.findByIdAndUpdate.mockResolvedValue(null);

            await expect(expenseService.updateExpenseById(id, updatedData)).rejects.toThrow(
                "Expense not found"
            );
            expect(logger.info).toHaveBeenCalledWith(`Update Expense ${id} Details...`);
            expect(logger.info).toHaveBeenCalledWith(`Expense Details not present..`);
        });

        it("should throw an error if updating fails", async () => {
            const id = "123";
            const updatedData = { name: "Food", amount: 100 };
            const error = new Error("Database Error");
            Expense.findByIdAndUpdate.mockRejectedValue(error);

            await expect(expenseService.updateExpenseById(id, updatedData)).rejects.toThrow(
                "Error updating expense: Database Error"
            );
            expect(logger.error).toHaveBeenCalledWith("Update Expense Detaits...");
        });
    });

    describe("deleteExpenseById", () => {
        it("should delete an expense successfully", async () => {
            const id = "123";
            const mockExpense = { _id: id, name: "Food", amount: 50 };
            Expense.findByIdAndDelete.mockResolvedValue(mockExpense);

            const result = await expenseService.deleteExpenseById(id);

            expect(result).toEqual(mockExpense);
            expect(logger.info).toHaveBeenCalledWith(`Expense ${id} Details Deleted..`);
            expect(logger.info).toHaveBeenCalledWith("Expense Details Deleted...");
        });

        it("should throw an error if expense not found", async () => {
            const id = "123";
            Expense.findByIdAndDelete.mockResolvedValue(null);

            await expect(expenseService.deleteExpenseById(id)).rejects.toThrow(
                "Expense not found"
            );
            expect(logger.info).toHaveBeenCalledWith(`Expense ${id} Details Deleted..`);
        });

        it("should throw an error if deleting fails", async () => {
            const id = "123";
            const error = new Error("Database Error");
            Expense.findByIdAndDelete.mockRejectedValue(error);

            await expect(expenseService.deleteExpenseById(id)).rejects.toThrow(
                "Error deleting expense: Database Error"
            );
            expect(logger.error).toHaveBeenCalledWith(`Expense deleted ${error}`);
        });
    });
});
