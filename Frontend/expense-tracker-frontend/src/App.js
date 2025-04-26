// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseDashboard from './components/ExpenseDashboard';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from './services/api';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const newExpense = await addExpense(expenseData);
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const updatedExpense = await updateExpense(id, expenseData);
      setExpenses(expenses.map(expense => 
        expense.id === id ? updatedExpense : expense
      ));
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Expense Tracker
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <ExpenseForm 
                onSubmit={editingExpense ? 
                  (data) => handleUpdateExpense(editingExpense.id, data) : 
                  handleAddExpense
                }
                initialData={editingExpense}
                onCancel={editingExpense ? () => setEditingExpense(null) : undefined}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <ExpenseDashboard expenses={expenses} />
            </Paper>
            
            <Paper elevation={3} sx={{ p: 2 }}>
              <ExpenseList 
                expenses={expenses} 
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
                loading={loading}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;