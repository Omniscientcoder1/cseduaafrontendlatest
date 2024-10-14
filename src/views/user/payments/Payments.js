// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// // Example data for past transactions
// const pastTransactions = [
//   { id: '1', amount: '1000 BDT', date: '2024-09-01' },
//   { id: '2', amount: '500 BDT', date: '2024-08-25' },
//   { id: '3', amount: '2000 BDT', date: '2024-08-20' },
// ];

// const Payments = () => {
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     navigate('/payment-form');
//   };

//   return (
//     <div>
//       {/* <Typography variant="h4" gutterBottom>
//         Past Transactions
//       </Typography> */}
//       {/* <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Transaction ID</TableCell>
//             <TableCell>Amount</TableCell>
//             <TableCell>Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {pastTransactions.map((transaction) => (
//             <TableRow key={transaction.id}>
//               <TableCell>{transaction.id}</TableCell>
//               <TableCell>{transaction.amount}</TableCell>
//               <TableCell>{transaction.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table> */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handlePayment}
//         sx={{ marginTop: '20px' }}
//       >
//         Lifetime Membership- 20000 Tk
//       </Button>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handlePayment}
//         sx={{ marginTop: '20px' }}
//       >
//         Annual Membership
//       </Button>
//     </div>
//   );
// };

// export default Payments;
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [years, setYears] = useState(1); // Initial number of years
  const [annualAmount, setAnnualAmount] = useState(1000); // Initial amount for 1 year
  const [startYear] = useState(2024); // Membership always starts in 2024
  const [endYear, setEndYear] = useState(2024); // End year based on the number of years selected
  const navigate = useNavigate();

  const handleLifetimePayment = () => {
    navigate('/payment-form', { state: { amount: 20000 } }); // Lifetime membership fee
  };

  const handleAnnualPayment = () => {
    navigate('/payment-form', { state: { amount: annualAmount } }); // Annual membership fee
  };

  const handleDonation = () => {
    navigate('/payment-form'); // Navigate to the donation form
  };

  const handleIncreaseYears = () => {
    setYears((currentYears) => {
      const newYears = currentYears + 1;
      setAnnualAmount(newYears * 1000); // Update the payable amount for the new number of years
      setEndYear(startYear + newYears - 1); // Update the end year based on the new number of years
      return newYears;
    });
  };

  const handleDecreaseYears = () => {
    setYears((currentYears) => {
      if (currentYears > 1) {
        const newYears = currentYears - 1;
        setAnnualAmount(newYears * 1000); // Update the payable amount for the reduced number of years
        setEndYear(startYear + newYears - 1); // Update the end year for the reduced number of years
        return newYears;
      }
      return currentYears; // If the years is 1, don't allow it to go lower
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {/* Lifetime Membership Section */}
      <Card sx={{ maxWidth: 400, mb: 4 }}>
        <CardContent display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Typography variant="h5" gutterBottom>
            Lifetime Membership
          </Typography>
          <Typography variant="body1">Payable Amount: 20,000 BDT</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLifetimePayment}
            sx={{ marginTop: '10px' }}
          >
            Pay for Lifetime Membership
          </Button>
        </CardContent>
      </Card>

      {/* Annual Membership Section */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Typography variant="h5" gutterBottom>
            Annual Membership
          </Typography>
          <Typography variant="body1" gutterBottom>
            From {startYear} to {endYear}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <IconButton color="primary" onClick={handleDecreaseYears}>
              <Remove />
            </IconButton>
            <Typography variant="h6" mx={2}>
              {years} {years > 1 ? 'Years' : 'Year'}
            </Typography>
            <IconButton color="primary" onClick={handleIncreaseYears}>
              <Add />
            </IconButton>
          </Box>
          <Typography variant="body1" mt={2}>
            Payable Amount: {annualAmount} BDT
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnnualPayment}
            sx={{ marginTop: '10px' }}
          >
            Pay for Annual Membership
          </Button>
        </CardContent>
      </Card>

      {/* Donation Section */}
      <Card sx={{ maxWidth: 400, mt: 4 }}>
        <CardContent display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Typography variant="h5" gutterBottom>
            Donate
          </Typography>
          <Typography variant="body1">Your donation helps us support our programs.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDonation}
            sx={{ marginTop: '10px' }}
          >
            Donate
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payments;
