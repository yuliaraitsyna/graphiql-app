import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {handlePasswordCheck} from './utils/passwordValidation';
import {FormProps} from './models/formProps';

const SignUp: React.FC<{onSubmit: SubmitHandler<FormProps>; onInputChange: () => void}> = ({
  onSubmit,
  onInputChange,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    trigger,
  } = useForm<FormProps>({
    mode: 'onChange',
  });

  const password = watch('password');

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
              value: /^[0-9A-Za-z]{1,}@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,}$/,
              message: 'Invalid email address',
            },
            onChange: () => {
              onInputChange();
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
        />
        <Typography component={'label'} htmlFor="password">
          Password
        </Typography>
        <TextField
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            validate: value => {
              const passwordError = handlePasswordCheck(value);
              return passwordError || true;
            },
            onChange: () => {
              trigger('password');
              onInputChange();
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
        />
        <Typography component={'label'} htmlFor="repeat-password">
          Repeat Password
        </Typography>
        <TextField
          type="password"
          id="repeat-password"
          {...register('repeatPassword', {
            required: 'Repeating password is required',
            validate: value => value === password || 'Passwords do not match',
            onChange: () => {
              onInputChange();
            },
          })}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message || ' '}
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
