import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import SignIn from './signIn';
import SignUp from './signUp';
import {SubmitHandler} from 'react-hook-form';
import {FormProps} from './models/formProps';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '~/utils/firebaseConfig';
import {FormAction} from './models/formAction';

const Authorization: React.FC = () => {
  const [action, setAction] = React.useState<FormAction>(FormAction.SIGN_IN);

  const handleSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    try {
      if (action === FormAction.SIGN_IN) {
        const user = await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log('Successful sign in:', user);
      } else if (action === FormAction.SIGN_UP) {
        const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('Successful sign up:', user);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component={'h5'} variant="h5" textAlign={'center'}>
        {action === FormAction.SIGN_IN ? 'Sign in' : 'Sign up'}
      </Typography>
      {action === FormAction.SIGN_IN ? <SignIn onSubmit={handleSubmit} /> : <SignUp onSubmit={handleSubmit} />}
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button
          onClick={() =>
            action === FormAction.SIGN_IN ? setAction(FormAction.SIGN_UP) : setAction(FormAction.SIGN_IN)
          }>
          {action === FormAction.SIGN_IN ? 'Sign up' : 'Sign in'}
        </Button>
      </Box>
    </Container>
  );
};

export default Authorization;
