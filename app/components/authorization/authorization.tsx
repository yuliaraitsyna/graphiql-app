import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import SignIn from './signIn';
import SignUp from './signUp';
import {SubmitHandler} from 'react-hook-form';
import {FormProps} from './models/formProps';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '~/utils/firebaseConfig';
import {FormAction} from './models/formAction';
import {useNavigate} from '@remix-run/react';
import {red} from '@mui/material/colors';

const Authorization: React.FC = () => {
  const [action, setAction] = useState<FormAction>(FormAction.SIGN_IN);
  const [authError, setAuthError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    setAuthError('');
  }, [action]);

  const handleSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    try {
      if (action === FormAction.SIGN_IN) {
        const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);

        localStorage.setItem('user', JSON.stringify(userCredentials.user.email));

        setAuthError(' ');
        navigate('/');
      } else if (action === FormAction.SIGN_UP) {
        const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);

        setAuthError(' ');
        navigate('/');

        localStorage.setItem('user', JSON.stringify(userCredentials.user.email));
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError('Authorization error');
    }
  };

  const handleInputChange = () => {
    setAuthError(' ');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component={'h5'} variant="h5" textAlign={'center'}>
        {action === FormAction.SIGN_IN ? 'Sign in' : 'Sign up'}
      </Typography>
      {action === FormAction.SIGN_IN ? (
        <SignIn onSubmit={handleSubmit} onInputChange={handleInputChange} />
      ) : (
        <SignUp onSubmit={handleSubmit} onInputChange={handleInputChange} />
      )}
      <Typography color={red[500]} textAlign={'center'}>
        {authError}
      </Typography>
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
