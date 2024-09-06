import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Example data for past transactions
const pastTransactions = [
  { id: '1', amount: '1000 BDT', date: '2024-09-01' },
  { id: '2', amount: '500 BDT', date: '2024-08-25' },
  { id: '3', amount: '2000 BDT', date: '2024-08-20' },
];

const Payments = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/payment-form');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Past Transactions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ marginTop: '20px' }}
      >
        Make Payment
      </Button>
    </div>
  );
};

export default Payments;
