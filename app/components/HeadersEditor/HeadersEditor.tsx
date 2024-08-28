import {
  Box,
  Button,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {grey} from '@mui/material/colors';
import React from 'react';

const HeadersEditor: React.FC = () => {
  return (
    <Container sx={{width: '90%', border: '1px solid red', padding: 2}}>
      <Box sx={{width: '100%'}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={2}>
        <Typography component={'h6'} variant="h6">
          Headers
        </Typography>
        <Button variant="contained">Add</Button>
      </Box>
      <TableContainer sx={{width: '100%', border: '1px solid', borderColor: grey[300]}}>
        <Table sx={{border: '1px solid', borderColor: grey[300]}} padding="normal" size="small">
          <TableHead sx={{backgroundColor: grey[100]}}>
            <TableRow>
              <TableCell sx={{border: '1px solid', borderColor: grey[300], width: '10%'}}></TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}>
                <b>Key</b>
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}>
                <b>Value</b>
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300], width: '10%'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}>
                <Checkbox />
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}></TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}></TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[300]}}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HeadersEditor;
