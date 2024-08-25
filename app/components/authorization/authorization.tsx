import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import SignIn from './signIn';
import SignUp from './signUp';
import {SubmitHandler} from 'react-hook-form';
import {FormProps} from './models/formProps';

const Authorization: React.FC = () => {
  const [action, setAction] = React.useState('signIn');

  const handleSubmit: SubmitHandler<FormProps> = (data: FormProps) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component={'h5'} variant="h5" textAlign={'center'}>
        {action === 'signIn' ? 'Sign in' : 'Sign up'}
      </Typography>
      {action === 'signIn' ? <SignIn onSubmit={handleSubmit} /> : <SignUp onSubmit={handleSubmit} />}
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button onClick={() => (action === 'signIn' ? setAction('signUp') : setAction('signIn'))}>
          {action === 'signIn' ? 'Sign up' : 'Sign in'}
        </Button>
      </Box>
    </Container>
  );
};

export default Authorization;
