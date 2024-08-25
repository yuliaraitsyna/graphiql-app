import React, {useState} from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  getHelperPasswordMessage,
  getPasswordStrengthColor,
  handlePasswordCheck,
  PasswordStrength,
} from './utils/passwordValidation';
import {FormProps} from './models/formProps';

const SignUp: React.FC<{onSubmit: SubmitHandler<FormProps>}> = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormProps>({
    mode: 'onChange',
  });

  const password = watch('password');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Typography component={'label'} htmlFor="email">
          Email
        </Typography>
        <TextField
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Typography component={'label'} htmlFor="password">
          Password
        </Typography>
        <TextField
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            onChange: e => {
              setPasswordStrength(handlePasswordCheck(e.target.value));
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {passwordStrength && (
          <Box>
            <Typography color={getPasswordStrengthColor(passwordStrength)}>{passwordStrength} Password</Typography>
            <Typography fontSize={10} margin={1}>
              {getHelperPasswordMessage(passwordStrength)}
            </Typography>
          </Box>
        )}
        <Typography component={'label'} htmlFor="repeat-password">
          Repeat Password
        </Typography>
        <TextField
          type="password"
          id="repeat-password"
          {...register('repeatPassword', {
            required: 'Repeating password is required',
            validate: value => value === password || 'Passwords do not match',
          })}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={2}>
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
