import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import SignIn from './signIn';
import SignUp from './signUp';

const Authorization: React.FC = () => {
  const [action, setAction] = React.useState('signIn');

  return (
    <Container component="main" maxWidth="xs">
      <Typography component={'h5'} variant="h5" textAlign={'center'}>
        {action === 'signIn' ? 'Sign in' : 'Sign up'}
      </Typography>
      {action === 'signIn' ? <SignIn></SignIn> : <SignUp></SignUp>}
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <Button variant="contained" type="submit">
          {action === 'signIn' ? 'Sign in' : 'Sign up'}
        </Button>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button onClick={() => (action === 'signIn' ? setAction('signUp') : setAction('signIn'))}>
          {action === 'signIn' ? 'Sign up' : 'Sign in'}
        </Button>
      </Box>
    </Container>
  );
};

export default Authorization;
