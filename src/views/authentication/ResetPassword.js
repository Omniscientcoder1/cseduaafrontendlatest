import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormBuilder, Input } from 'src/components/forms/FormBuilder';
import { AuthContext } from 'src/context/AuthContext';
import { toast } from 'react-toastify';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const ResetPassword = () => {
  const { resetAccountPasswordConfirm } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const localToken = searchParams.get('token');

    // Redirect to an error page if token is missing
    if (!localToken) {
        navigate('/auth/login');
    }

    setToken(localToken);
  }, [location.search]);
  
  const handleSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        token: token, // Include the token here
        };

      const res = await resetAccountPasswordConfirm(requestData);
      console.log(res);
      toast.success(`Successfully reset your password.`);
      navigate('/auth/login');
    } catch (error) {
      const statusCode = error.response?.status;

      // Handle different toasts based on the status code
      if (statusCode === 404) {
        toast.error('User does not exist with the given email.'); // Toast for 401 Unauthorized
      } else {
        toast.error(`Invalid token.`); // Generic error toast
      }

      console.log(error);
    } finally {
    }
  };

   const validate = (value) => {
    // Regular expressions for each criteria
    const minLengthRegex = /.{8,}/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Check each criteria and return appropriate error message if not met
    if (!minLengthRegex.test(value)) {
      return false || 'Password must be at least 8 characters long';
    }
    if (!lowercaseRegex.test(value)) {
      return false || 'Password must contain at least one lowercase letter';
    }
    if (!uppercaseRegex.test(value)) {
      return false || 'Password must contain at least one uppercase letter';
    }
    if (!numberRegex.test(value)) {
      return false || 'Password must contain at least one number';
    }
    if (!specialCharRegex.test(value)) {
      return false || 'Password must contain at least one special character';
    }

    // If all criteria are met, return null (no error)
    return true;
  };

  return (
    <PageContainer title="Reset Password" description="this is reset password page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <h3>Enter a New Password</h3>
              </Box>
              <FormBuilder onSubmit={handleSubmit}>
                {(register, errors, { control }) => {
                  return (
                    <>
                      <div className="row mt-3">
                        <Input
                          name="email"
                          errors={errors}
                          required={true}
                          register={register}
                          class_name="col-12"
                          label={'E-mail'}
                        />
                        <Input
                          name="new_password"
                          errors={errors}
                          required={true}
                          register={register}
                          validate={validate}
                          type="password"
                          class_name="col-12"
                          label={'New Password'}
                        />
                        <Box>
                          <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            type="submit"
                          >
                            Set New Password
                          </Button>
                        </Box>
                      </div>
                    </>
                  );
                }}
              </FormBuilder>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ResetPassword;
