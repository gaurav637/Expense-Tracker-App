import React, { useState } from 'react';
import { 
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onEdit, onDelete, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (expenses.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">No expenses found. Add your first expense!</Typography>
      </Paper>
    );
  }

  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const displayedExpenses = sortedExpenses
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'primary',
      'Transportation': 'secondary',
      'Housing': 'error',
      'Utilities': 'info',
      'Entertainment': 'success',
      'Healthcare': 'warning',
      'Education': 'primary',
      'Shopping': 'secondary',
      'Personal Care': 'error',
      'Other': 'default'
    };
    return colors[category] || 'default';
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Expense History
      </Typography>
      
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{format(new Date(expense.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Chip 
                    label={expense.category} 
                    color={getCategoryColor(expense.category)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{expense.description || '-'}</TableCell>
                <TableCell align="right">${expense.amount.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => onEdit(expense)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this expense?')) {
                        onDelete(expense.id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ExpenseList;