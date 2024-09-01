import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormBuilder, Input, Select, SelectWithFilter } from 'src/components/forms/FormBuilder';
import { register } from 'src/services/query/user';
import { toast } from 'react-toastify';
import { getBatches } from 'src/constants/options';
import { AuthContext } from 'src/context/AuthContext';


const AuthRegister = ({ title, subtitle, subtext }) => {
  const [hasCode, setHasCode] = React.useState(false);
  const navigate = useNavigate();
  const { loginToAccount } = useContext(AuthContext);

  const validateEmail = (value) => {
    const commonProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const emailParts = value.split('@');
    const domain = emailParts[1];
    if (!commonProviders.includes(domain)){
      return false || 'Invalid Email';
    }
    return true;
  };

  const validate = (value) => {
    // Regular expressions for each criteria
    const minLengthRegex = /.{12,}/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Check each criteria and return appropriate error message if not met
    if (!minLengthRegex.test(value)) {
      return false || 'Password must be at least 12 characters long';
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

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    const sqlTermsRegex = /(SELECT|DELETE)/i;
    if (!nameRegex.test(value)) {
      return 'Name must contain only alphabetical characters';
    }
    if (sqlTermsRegex.test(value)) {
      return 'Invalid Name';
    }
    return null;
  };

  const validateUsername = (value) => {
    const sqlTermsRegex = /(SELECT|DELETE)/i;
    if (sqlTermsRegex.test(value)) {
      return 'Invalid Name';
    }
    return null;
  };

  const handleSubmit = async (data) => {
    try {
      let resigterInfo;
      if (!hasCode) resigterInfo = { ...data, referral_code: null };
      else resigterInfo = data;
      const {username, password} = resigterInfo;
      const loginInfo = { username, password };
      const res = await register(resigterInfo);
      await loginToAccount(data);
      toast.success('User creation succeeded!');
      navigate('/profile');
    } catch (error) {
      toast.error('User creation failed!');
    } finally {
    }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <FormBuilder onSubmit={handleSubmit}>
        {(register, errors, { control }) => {
          return (
            <>
              <div className="row mt-3">
                <Input
                  name="first_name"
                  errors={errors}
                  required={true}
                  register={register}
                  validate={validateName}
                  class_name="col-12"
                  label={'First Name'}
                />
                <Input
                  name="last_name"
                  errors={errors}
                  required={true}
                  register={register}
                  validate={validateName}
                  class_name="col-12"
                  label={'Last Name'}
                />
                <Input
                  name="username"
                  errors={errors}
                  required={true}
                  register={register}
                  validate={validateUsername}
                  class_name="col-12"
                  label={'Username'}
                />
                <Input
                  name="email_address"
                  errors={errors}
                  required={true}
                  register={register}
                  validate={validateEmail}
                  class_name="col-12"
                  label={'Email'}
                />
                <Input
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  required={true}
                  validate={validate}
                  class_name="col-12"
                  label={'Password'}
                />
                <SelectWithFilter
                  name="batch_number"
                  control={control}
                  errors={errors}
                  required={true}
                  class_name="col-12"
                  label={'Batch'}
                  options={getBatches()}
                />
                <Select
                  name="sex"
                  control={control}
                  errors={errors}
                  required={true}
                  class_name="col-12"
                  label={'Gender'}
                  options={[
                    { name: 'Male', value: 'M' },
                    { name: 'Female', value: 'F' },
                  ]}
                />
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={hasCode} onChange={() => setHasCode(!hasCode)} />
                  }
                  label="I have a Referral Code"
                  class_name="col-12"
                  style={{ marginBottom: '10px' }}
                />
                {hasCode && (
                  <Input
                    name="referral_code"
                    register={register}
                    errors={errors}
                    required={hasCode}
                    className="col-12"
                    label={'Code'}
                    disabled={!hasCode}
                  />
                )}
                <Box>
                  <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Register
                  </Button>
                </Box>
              </div>
            </>
          );
        }}
      </FormBuilder>
      {subtitle}
    </>
  );
};

export default AuthRegister;
