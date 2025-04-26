import React, { useMemo } from 'react';
import { 
  Typography, 
  Grid, 
  Box, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', 
  '#FF6B6B', '#54A0FF', '#1DD1A1', '#FECA57', '#FF9FF3'
];

const ExpenseDashboard = ({ expenses }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // For the total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // For the category distribution pie chart
  const categoryData = useMemo(() => {
    const categoryMap = {};
    
    expenses.forEach(expense => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });
    
    return Object.keys(categoryMap).map(category => ({
      name: category,
      value: categoryMap[category]
    })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  // For the monthly expenses bar chart
  const monthlyData = useMemo(() => {
    if (expenses.length === 0) return [];
    
    // Get the last 6 months
    const today = new Date();
    const sixMonthsAgo = subMonths(today, 5);
    
    const months = eachMonthOfInterval({
      start: startOfMonth(sixMonthsAgo),
      end: endOfMonth(today)
    });
    
    const monthlyTotals = months.map(monthDate => {
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthName = format(monthDate, 'MMM');
      
      const total = expenses.reduce((sum, expense) => {
        const expenseDate = parseISO(expense.date);
        return (expenseDate >= monthStart && expenseDate <= monthEnd) 
          ? sum + expense.amount 
          : sum;
      }, 0);
      
      return {
        month: monthName,
        total: total
      };
    });
    
    return monthlyTotals;
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h6">
          No expense data to display. Add expenses to see your dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Expense Dashboard
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="div" align="center" color="primary" gutterBottom>
          ${totalExpenses.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          Total Expenses
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom align="center">
            Expenses by Category
          </Typography>
          
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 60 : 80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              />
              <Legend layout={isMobile ? "horizontal" : "vertical"} align="center" />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom align="center">
            Monthly Expenses
          </Typography>
          
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
            <BarChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Total']} />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpenseDashboard;