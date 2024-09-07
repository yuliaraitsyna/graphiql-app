import {Box, Container, MenuItem, Select, Typography} from '@mui/material';
import React from 'react';
import {HTTPMethods} from './models/HTTPMethods';

const RestRequest: React.FC = () => {
  return (
    <Container>
      <Typography component={'h4'} variant="h4" textAlign={'center'}>
        REST Client
      </Typography>
      <Box border={'solid red'} display={'flex'}>
        <Select autoWidth>
          {Object.values(HTTPMethods).map((value, index) => (
            <MenuItem key={index}>{value}</MenuItem>
          ))}
        </Select>
      </Box>
    </Container>
  );
};

export default RestRequest;
