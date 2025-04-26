// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Grid, 
  Typography,
  Box
} from '@mui/material';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Shopping',
  'Personal Care',
  'Other'
];

const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().substr(0, 10)
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        category: initialData.category,
        description: initialData.description || '',
        date: initialData.date.substr(0, 10)
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
      
      if (!initialData) {
        // Reset form if this is a new expense
        setFormData({
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().substr(0, 10)
        });
      }
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              inputProps={{ step: '0.01' }}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              error={!!errors.date}
              helperText={errors.date}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: initialData ? 'space-between' : 'flex-end' }}>
              {initialData && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {initialData ? 'Update' : 'Add Expense'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ExpenseForm;