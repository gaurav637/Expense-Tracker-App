import express from 'express';
import {
    addExpenseController,
    getAllExpensesController,
    updateExpenseController,
    deleteExpenseController,
} from "../controllers/expense.controller.js";
const router = express.Router();

router.post(
    "/new",
    addExpenseController
);

router.get(
    "/get-all", 
    getAllExpensesController
);

router.put(
    "/edit/:id", 
    updateExpenseController
);

router.delete(
    "/delete/:id", 
    deleteExpenseController
);

export default router;
