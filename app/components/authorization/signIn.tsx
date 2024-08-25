import React from 'react';
import {Box, Typography, TextField} from '@mui/material';

const SignIn: React.FC = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
      <Typography component={'label'}>Email</Typography>
      <TextField type="email"></TextField>
      <Box>
        <Typography color={'red'}>Error</Typography>
      </Box>
      <Typography component={'label'}>Password</Typography>
      <TextField type="password"></TextField>
      <Box>
        <Typography color={'red'}>Error</Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
