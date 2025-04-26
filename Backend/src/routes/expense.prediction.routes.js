import express from "express";
import { 
    predictExpensesController, 
    getGrowthRecommendationsController, 
    getCategoryTrendsController 
} from "../controllers/expense.prediction.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to get expense predictions
router.get(
    "/predict", 
    authMiddleware,
    predictExpensesController
);

// Route to get income growth recommendations
router.get(
    "/growth-recommendations", 
    authMiddleware,
    getGrowthRecommendationsController
);

// Route to get expense category trends
router.get(
    "/category-trends", 
    authMiddleware,
    getCategoryTrendsController
);

export default router;