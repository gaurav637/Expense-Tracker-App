import Expense from "../models/expense.model.js";
import User from "../models/users.models.js";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const predictFutureExpenses = async (userId, months = 6) => {
    try {
        logger.info(`Prediction Service:: Predicting expenses for user: ${userId} for next ${months} months`);
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        // Get monthly expense data for past months
        const monthlyData = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $project: {
                    amount: 1,
                    month: { $dateToString: { format: "%Y-%m", date: "$date" } }
                }
            },
            {
                $group: {
                    _id: "$month",
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    month: "$_id",
                    totalAmount: 1,
                    count: 1,
                    _id: 0
                }
            }
        ]);
        
        logger.info(`Prediction Service:: Found ${monthlyData.length} months of expense data`);
        
        // Check if we have enough data for prediction
        if (monthlyData.length < 3) {
            logger.warn(`Prediction Service:: Insufficient data for prediction. Need at least 3 months.`);
            return {
                success: false,
                message: "At least 3 months of expense data is needed for accurate predictions"
            };
        }
        
        // Apply linear regression for prediction
        const predictions = calculateLinearRegressionPredictions(monthlyData, months);
        logger.info(`Prediction Service:: Generated predictions for next ${months} months`);
        
        return {
            success: true,
            historicalData: monthlyData,
            predictions: predictions.predictedMonths,
            trend: predictions.trend
        };
    } catch (error) {
        logger.error(`Prediction Service:: Failed to predict expenses! Reason: ${error.message}`);
        throw new Error(`Failed to predict future expenses! Reason: ${error.message}`);
    }
};

export const calculateGrowthRecommendations = async (userId, savingsGoal = 20) => {
    try {
        logger.info(`Prediction Service:: Calculating growth recommendations for user: ${userId}`);
        
        // Get user's current income
        const user = await User.findById(userId);
        if (!user || !user.monthlyIncome) {
            logger.warn(`Prediction Service:: User income information missing`);
            return {
                success: false,
                message: "Monthly income information is required for growth recommendations"
            };
        }
        
        const currentIncome = user.monthlyIncome;
        logger.info(`Prediction Service:: User current monthly income: ${currentIncome}`);
        
        // Get expense predictions
        const predictionData = await predictFutureExpenses(userId);
        if (!predictionData.success) {
            return predictionData; // Return error message if prediction failed
        }
        
        // Calculate required income based on predictions and savings goal
        const recommendations = calculateIncomeRequirements(predictionData, currentIncome, savingsGoal);
        logger.info(`Prediction Service:: Generated growth recommendations with ${savingsGoal}% savings goal`);
        
        return recommendations;
    } catch (error) {
        logger.error(`Prediction Service:: Failed to calculate growth recommendations! Reason: ${error.message}`);
        throw new Error(`Failed to calculate growth recommendations! Reason: ${error.message}`);
    }
};

export const getExpenseCategoryTrends = async (userId) => {
    try {
        logger.info(`Prediction Service:: Analyzing category trends for user: ${userId}`);
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        // Get expenses by category for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const categoryTrends = await Expense.aggregate([
            { 
                $match: { 
                    userId: userObjectId,
                    date: { $gte: sixMonthsAgo } 
                } 
            },
            {
                $group: {
                    _id: {
                        category: "$category",
                        month: { $dateToString: { format: "%Y-%m", date: "$date" } }
                    },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.month": 1 } },
            {
                $group: {
                    _id: "$_id.category",
                    monthlyData: { 
                        $push: { 
                            month: "$_id.month", 
                            amount: "$totalAmount" 
                        } 
                    },
                    averageAmount: { $avg: "$totalAmount" }
                }
            },
            {
                $project: {
                    category: "$_id",
                    monthlyData: 1,
                    averageAmount: 1,
                    _id: 0
                }
            }
        ]);
        
        logger.info(`Prediction Service:: Analyzed trends for ${categoryTrends.length} expense categories`);
        
        // Calculate growth rate for each category
        const categoriesWithTrends = categoryTrends.map(category => {
            const monthlyAmounts = category.monthlyData.map((month, index) => ({
                x: index,
                y: month.amount
            }));
            
            // Calculate trend using linear regression if enough data points
            let trend = { growthRate: 0 };
            if (monthlyAmounts.length >= 2) {
                trend = calculateTrendForCategory(monthlyAmounts);
            }
            
            return {
                category: category.category,
                monthlyData: category.monthlyData,
                averageAmount: parseFloat(category.averageAmount.toFixed(2)),
                trend: {
                    growthRate: parseFloat(trend.growthRate.toFixed(2)),
                    isIncreasing: trend.growthRate > 0
                }
            };
        });
        
        return {
            success: true,
            categoryTrends: categoriesWithTrends
        };
    } catch (error) {
        logger.error(`Prediction Service:: Failed to analyze category trends! Reason: ${error.message}`);
        throw new Error(`Failed to analyze expense category trends! Reason: ${error.message}`);
    }
};

// Helper functions
function calculateLinearRegressionPredictions(monthlyData, monthsToPredict) {
    const n = monthlyData.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    // Calculate sums for linear regression formula
    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += monthlyData[i].totalAmount;
        sumXY += i * monthlyData[i].totalAmount;
        sumXX += i * i;
    }
    
    // Calculate slope (m) and y-intercept (b)
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    
    // Generate predictions for future months
    const predictedMonths = [];
    const lastMonthDate = new Date(monthlyData[n - 1].month + "-01");
    
    for (let i = 1; i <= monthsToPredict; i++) {
        const predictedIndex = n + i - 1;
        const predictedAmount = m * predictedIndex + b;
        
        // Calculate the month for this prediction
        const predictionDate = new Date(lastMonthDate);
        predictionDate.setMonth(lastMonthDate.getMonth() + i);
        const predictionMonth = predictionDate.toISOString().substring(0, 7);
        
        predictedMonths.push({
            month: predictionMonth,
            predictedAmount: Math.max(0, parseFloat(predictedAmount.toFixed(2))) // Ensure positive and round to 2 decimals
        });
    }
    
    // Calculate trend metrics
    const averageMonthlyExpense = sumY / n;
    const growthRate = m / averageMonthlyExpense * 100; // Monthly percentage growth
    
    return {
        predictedMonths,
        trend: {
            slope: parseFloat(m.toFixed(2)),
            intercept: parseFloat(b.toFixed(2)),
            growthRate: parseFloat(growthRate.toFixed(2)), 
            averageMonthlyExpense: parseFloat(averageMonthlyExpense.toFixed(2))
        }
    };
}

function calculateIncomeRequirements(predictionData, currentIncome, savingsGoal) {
    const { predictions, trend } = predictionData;
    
    // Calculate average predicted monthly expense
    const totalPredictedExpense = predictions.reduce((sum, month) => sum + month.predictedAmount, 0);
    const avgPredictedExpense = totalPredictedExpense / predictions.length;
    
    // Calculate required income based on desired savings
    const savingsRatio = savingsGoal / 100;
    const requiredIncome = avgPredictedExpense / (1 - savingsRatio);
    
    // Calculate required income growth
    const incomeGrowthNeeded = ((requiredIncome - currentIncome) / currentIncome) * 100;
    
    // Generate specific recommendations
    let recommendation = "";
    let actionItems = [];
    
    if (currentIncome > requiredIncome) {
        recommendation = "Your current income is sufficient to cover predicted expenses and meet your savings goal.";
        actionItems = [
            "Consider increasing your savings goal",
            "Look into investment opportunities for excess savings",
            "Build an emergency fund if you don't already have one"
        ];
    } else if (incomeGrowthNeeded <= 5) {
        recommendation = "You need a small income increase to meet your savings goals based on predicted expenses.";
        actionItems = [
            "Look for small side gigs or freelance opportunities",
            "Consider asking for a small raise at work",
            "Find small areas to reduce expenses"
        ];
    } else if (incomeGrowthNeeded <= 15) {
        recommendation = "You need moderate income growth to achieve your financial goals.";
        actionItems = [
            "Consider upskilling to qualify for higher-paying roles",
            "Look for promotion opportunities in your current workplace",
            "Cut non-essential expenses in high-growth categories",
            "Consider a part-time secondary income source"
        ];
    } else {
        recommendation = "Significant income growth is needed to meet your financial goals.";
        actionItems = [
            "Consider career change options with better income potential",
            "Look into additional income streams or side businesses",
            "Reassess your budget and identify major expense categories to reduce",
            "Consider adjusting your savings goal temporarily while growing income"
        ];
    }
    
    return {
        success: true,
        currentIncome: parseFloat(currentIncome.toFixed(2)),
        averagePredictedExpense: parseFloat(avgPredictedExpense.toFixed(2)),
        requiredIncome: parseFloat(requiredIncome.toFixed(2)),
        monthlySavingsTarget: parseFloat((requiredIncome * savingsRatio).toFixed(2)),
        incomeGrowthNeeded: parseFloat(incomeGrowthNeeded.toFixed(2)),
        savingsGoal: savingsGoal,
        recommendation,
        actionItems,
        expenseTrend: {
            isIncreasing: trend.growthRate > 0,
            monthlyGrowthRate: trend.growthRate
        }
    };
}

function calculateTrendForCategory(dataPoints) {
    const n = dataPoints.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    // Calculate sums for linear regression formula
    for (let i = 0; i < n; i++) {
        sumX += dataPoints[i].x;
        sumY += dataPoints[i].y;
        sumXY += dataPoints[i].x * dataPoints[i].y;
        sumXX += dataPoints[i].x * dataPoints[i].x;
    }
    
    // Calculate slope (m) and y-intercept (b)
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calculate growth rate
    const averageY = sumY / n;
    const growthRate = (slope / averageY) * 100;
    
    return {
        slope,
        intercept,
        growthRate,
        average: averageY
    };
}