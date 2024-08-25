import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormProps} from './models/formProps';

const SignIn: React.FC<{onSubmit: SubmitHandler<FormProps>}> = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormProps>({
    mode: 'onChange',
  });

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
          {...register('password', {required: 'Password is required'})}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={2}>
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </Box>
    </form>
  );
};

export default SignIn;
