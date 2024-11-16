import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  Grid,
  TablePagination
} from '@mui/material';
import { getPaymentUsers } from 'src/services/query/user'; 

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0); 

  const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, 
  });
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPaymentUsers({ page: page + 1, rowsPerPage });
        // console.log(response); 
        setPayments(response || []);
        setTotalRows(response.count || 0);
      } catch (error) {
        console.error('Failed to fetch payment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="SSLCommerz Payments" titleTypographyProps={{ variant: 'h6' }} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Membership ID</TableCell>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.transaction_id}>
                      <TableCell>{payment.cus_name}</TableCell>
                      <TableCell>{payment.cus_email}</TableCell>
                      <TableCell>{payment.cus_phone}</TableCell>
                      <TableCell>{payment.membershipId}</TableCell>
                      <TableCell>{payment.transaction_id}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{formatDate(payment.created_at)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalRows}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaymentsTable;


