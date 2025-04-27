import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all expenses
export const fetchExpenses = async () => {
  try {
    const response = await api.get('/expense/get-all');
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

// Add a new expense
export const addExpense = async (expenseData) => {
  try {
    const response = await api.post('/expense/new', expenseData);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Update an existing expense
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};