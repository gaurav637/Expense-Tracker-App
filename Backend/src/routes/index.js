import express from 'express';
import userRouter from './users.routes.js';
import expenseRouter from './expense.routes.js';
import expensePredictionRoutes from './expense.prediction.routes.js';
const router = express.Router();
const routes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/expense',
        route: expenseRouter
    },
    {
        path: '/expense-prediction',
        route: expensePredictionRoutes
    }
]

routes.map((obj) => {
    router.use(obj.path, obj.route);
});

export default router;