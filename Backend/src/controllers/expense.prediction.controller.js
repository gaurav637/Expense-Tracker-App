import logger from "../utils/logger.js";
import {
    predictFutureExpenses, 
    calculateGrowthRecommendations, 
    getExpenseCategoryTrends 
} from '../services/expense.prediction.services.js';

export const predictExpensesController = async (req, res) => {
    try {
        logger.info(`Prediction Controller:: Starting expense prediction flow`);
        const userId = req.user._id; // Assuming auth middleware adds user to request
        const { months } = req.query;
        
        const predictions = await predictFutureExpenses(userId, parseInt(months) || 6);
        
        if (!predictions.success) {
            return res.status(400).json({
                message: predictions.message,
                statusCode: 400,
                success: false
            });
        }
        
        logger.info(`Prediction Controller:: Successfully generated expense predictions`);
        res.status(200).json({
            message: "Expense predictions generated successfully",
            statusCode: 200,
            success: true,
            data: predictions
        });
    } catch (error) {
        logger.error(`Prediction Controller:: Failed to generate expense predictions!! ${error.message}`);
        res.status(500).json({ 
            error: error.message,
            statusCode: 500,
            success: false
        });
    }
};

export const getGrowthRecommendationsController = async (req, res) => {
    try {
        logger.info(`Prediction Controller:: Starting growth recommendations flow`);
        const userId = req.user._id; // Assuming auth middleware adds user to request
        const { savingsGoal } = req.query;
        
        // Validate savingsGoal
        const goalPercentage = parseInt(savingsGoal) || 20;
        if (goalPercentage < 0 || goalPercentage > 90) {
            logger.warn(`Prediction Controller:: Invalid savings goal: ${goalPercentage}%`);
            return res.status(400).json({
                message: "Savings goal must be between 0 and 90 percent",
                statusCode: 400,
                success: false
            });
        }
        
        const recommendations = await calculateGrowthRecommendations(userId, goalPercentage);
        
        if (!recommendations.success) {
            return res.status(400).json({
                message: recommendations.message,
                statusCode: 400,
                success: false
            });
        }
        
        logger.info(`Prediction Controller:: Successfully generated growth recommendations`);
        res.status(200).json({
            message: "Growth recommendations generated successfully",
            statusCode: 200,
            success: true,
            data: recommendations
        });
    } catch (error) {
        logger.error(`Prediction Controller:: Failed to generate growth recommendations!! ${error.message}`);
        res.status(500).json({ 
            error: error.message,
            statusCode: 500,
            success: false
        });
    }
};

export const getCategoryTrendsController = async (req, res) => {
    try {
        logger.info(`Prediction Controller:: Starting category trends analysis flow`);
        const userId = req.user._id; // Assuming auth middleware adds user to request
        
        const categoryTrends = await getExpenseCategoryTrends(userId);
        
        if (!categoryTrends.success) {
            return res.status(400).json({
                message: categoryTrends.message,
                statusCode: 400,
                success: false
            });
        }
        
        logger.info(`Prediction Controller:: Successfully analyzed category trends`);
        res.status(200).json({
            message: "Category trends analysis completed successfully",
            statusCode: 200,
            success: true,
            data: categoryTrends
        });
    } catch (error) {
        logger.error(`Prediction Controller:: Failed to analyze category trends!! ${error.message}`);
        res.status(500).json({ 
            error: error.message,
            statusCode: 500,
            success: false
        });
    }
};