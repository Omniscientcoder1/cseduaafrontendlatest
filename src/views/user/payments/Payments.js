
import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Card, CardContent, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [years, setYears] = useState(1); 
  const [annualAmount, setAnnualAmount] = useState(1000); 
  const [startYear] = useState(new Date().getFullYear()); 
  const [endYear, setEndYear] = useState(startYear + 5);
  const [donationType, setDonationType] = useState(''); 
  const [donationAmount, setDonationAmount] = useState(''); 
  const navigate = useNavigate();

  // Handle Lifetime Membership Payment
  const handleLifetimePayment = () => {
    navigate('/payment-form', { state: { amount: 20000 } }); // Lifetime membership fee
  };

  // Handle Annual Membership Payment
  const handleAnnualPayment = () => {
    navigate('/payment-form', { state: { amount: annualAmount } }); // Annual membership fee based on years selected
  };

  // Handle Donation Payment
  const handleDonation = () => {
    if (!donationAmount || donationAmount <= 0 || !donationType) {
      alert('Please select a donation type and enter a valid amount.');
      return;
    }

    navigate('/donation-form', { state: { amount: donationAmount, donationType } }); // Redirect to donation form
  };

  const handleIncreaseYears = () => {
  setYears((currentYears) => {
    if (currentYears < 5) { 
      const newYears = currentYears + 1;
      setAnnualAmount(newYears * 1000); 
      setEndYear(startYear + newYears - 1); 
      return newYears;
    }
    return currentYears; 
  });
};

  // Decrease the number of years for annual membership
  const handleDecreaseYears = () => {
    setYears((currentYears) => {
      if (currentYears > 1) {
        const newYears = currentYears - 1;
        setAnnualAmount(newYears * 1000); 
        setEndYear(startYear + newYears - 1);
        return newYears;
      }
      return currentYears; 
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
          <Typography variant="body1" gutterBottom>
            Your donation helps us support our programs.
          </Typography>

          {/* Dropdown for Donation Type */}
          <Select
            fullWidth
            value={donationType}
            onChange={(e) => setDonationType(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>
              Select Donation Type
            </MenuItem>
            <MenuItem value="zakaat fund">Zakaat Fund</MenuItem>
            <MenuItem value="Annual Tour">Annual Tour</MenuItem>
            <MenuItem value="General Donation">General Donation</MenuItem>
            <MenuItem value="Annual Picnic">Annual Picnic</MenuItem>
            <MenuItem value="Annual Sports">Annual Sports</MenuItem>
            <MenuItem value="Inter Dept. Football">Inter Dept. Football</MenuItem>
            <MenuItem value=" Inter Dept. Cricket"> Inter Dept. Cricket</MenuItem>
            <MenuItem value="Department Renovation">Department Renovation</MenuItem>
            <MenuItem value="ICPC Tournament">ICPC Tournament</MenuItem>
          </Select>

          {/* Input for Custom Donation Amount */}
          <TextField
            label="Enter Donation Amount"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDonation}
            sx={{ marginTop: '10px' }}
          >
            Donate Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payments;

