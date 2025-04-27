import { jest } from '@jest/globals';
import { 
  addExpenseController, 
  getAllExpensesController, 
  updateExpenseController, 
  deleteExpenseController 
} from '../src/controllers/expense.controller.js';
import * as services from '../src/services/expense.prediction.services.js';
import logger from '../src/utils/logger.js';

jest.mock('../src/services/expense.prediction.services.js', () => {
  return {
    addExpense: jest.fn(),
    getAllExpenses: jest.fn(),
    updateExpense: jest.fn(),
    deleteExpense: jest.fn()
  };
});

jest.mock('../src/utils/logger.js', () => {
  return {
    info: jest.fn(),
    error: jest.fn()
  };
});
describe('Expense Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('addExpenseController', () => {
    test('should add expense successfully', async () => {
      const expenseData = { 
        amount: 100,
        category: 'Food',
        description: 'Lunch'
      };
      const newExpense = { 
        id: '123',
        ...expenseData,
        createdAt: new Date()
      };
      
      req.body = expenseData;
      services.addExpense.mockResolvedValue(newExpense);
      
      await addExpenseController(req, res);
      
      expect(logger.info).toHaveBeenCalledWith('Expense Controller:: Add New Expense...');
      expect(services.addExpense).toHaveBeenCalledWith(expenseData);
      expect(logger.info).toHaveBeenCalledWith('Expense Details Added.');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Expense added successfully',
        statusCode: 201,
        expense: newExpense
      });
    });
    
    test('should handle errors when adding expense', async () => {
      const errorMessage = 'Failed to add expense';
      services.addExpense.mockRejectedValue(new Error(errorMessage));
    
      await addExpenseController(req, res);
      
      expect(logger.error).toHaveBeenCalledWith('User Controller:: Failed to add new Expense!!');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  
  describe('getAllExpensesController', () => {
    test('should get all expenses successfully', async () => {
      // Arrange
      const expenses = [
        { id: '1', amount: 50, category: 'Food' },
        { id: '2', amount: 100, category: 'Transport' }
      ];
      services.getAllExpenses.mockResolvedValue(expenses);
      
      await getAllExpensesController(req, res);
      
      expect(logger.info).toHaveBeenCalledWith('Get All Expense...');
      expect(services.getAllExpenses).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '2 Expense Details Fetched..',
        statusCode: 200,
        Expense: expenses
      });
    });
  });
});