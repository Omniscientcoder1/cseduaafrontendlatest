import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorage } from 'src/services/storage/localstorage';
import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_REFRESH_TOKEN } from 'src/constants/localstorage';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { IconUser } from '@tabler/icons';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { AuthContext } from 'src/context/AuthContext';
import { createMembershipClaim } from 'src/services/query/user';

// Import FormBuilder and input components
import { FormBuilder, Input, Select, FileInput } from 'src/components/forms/FormBuilder';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState('General');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [amountError, setAmountError] = useState('');
  const { logoutUser, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMembership = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = (data) => {
    if (validateForm(data)) {
      createMembershipClaim({
        category: data.category,
        amount_paid: parseInt(data.amount),
        date_of_registration: new Date(data.date).toISOString(),
      });
      setOpenDialog(false);
    }
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value <= 0) {
      setAmountError('Please enter a valid positive number');
    } else {
      setAmountError('');
    }
    setAmount(value);
  };

  const validateForm = (data) => {
    let valid = true;
    if (isNaN(data.amount) || data.amount <= 0) {
      setAmountError('Please enter a valid positive number');
      valid = false;
    } else {
      setAmountError('');
    }
    return valid;
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={userData?.profile_picture || ProfileImg}
          alt={userData?.profile_picture || ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl2(null);
            navigate('/profile');
          }}
        >
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {!userData?.is_pending &&
          (userData?.membership === 'None' ? (
            <Box mt={1} pt={1} px={2}>
              <Button
                onClick={handleMembership}
                variant="outlined"
                color="primary"
                component={Link}
                fullWidth
              >
                Already a Member?
              </Button>
            </Box>
          ) : (
            <Box
              my={1}
              mx={2}
              py={1}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
              }}
            >
              {userData?.membership + ' Member'}
            </Box>
          ))}
        <Box mt={1} py={1} px={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Membership Information</DialogTitle>
        <DialogContent style={{ paddingTop: 16, paddingBottom: 0 }}>
          <FormBuilder onSubmit={handleConfirm} defaultValues={{ category, amount, date }} pb="pb-2">
            {(register, errors, { control }) => (
              <>
                <Select
                  name="category"
                  label="Category"
                  defaultValue={category}
                  control={control}
                  errors={errors}
                  options={[
                    { name: 'General', value: 'General' },
                    { name: 'Lifetime', value: 'Lifetime' },
                  ]}
                />
                <Input
                  name="amount"
                  label="Amount Paid"
                  defaultValue={amount}
                  errors={errors}
                  register={register}
                  onChange={handleAmountChange}
                  error={!!amountError}
                  helperText={amountError}
                />
                <Input
                  name="date"
                  label="Date of Registration"
                  type="date"
                  defaultValue={date}
                  errors={errors}
                  register={register}
                  InputLabelProps={{ shrink: true }}
                />
                <FileInput
                  name="record"
                  errors={errors}
                  register={register}
                  label={'Record of Payment'}
                />
                <DialogActions>
                  <Button onClick={handleDialogClose} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </>
            )}
          </FormBuilder>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
