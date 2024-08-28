import {
  Box,
  Button,
  Checkbox,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {grey} from '@mui/material/colors';
import React, {useState} from 'react';
import {Header} from './models/header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HeadersEditor: React.FC = () => {
  const [headers, setHeaders] = useState<Header[]>([]);

  const handleHeaderAddition = () => {
    const header: Header = {
      key: '',
      value: '',
      checked: false,
    };
    setHeaders([...headers, header]);
  };

  return (
    <Container sx={{width: '90%', border: '1px solid red', padding: 2}}>
      <Box sx={{width: '100%'}} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={2}>
        <Typography component={'h6'} variant="h6">
          Headers
        </Typography>
        <Button variant="contained" onClick={handleHeaderAddition}>
          Add
        </Button>
      </Box>
      <TableContainer sx={{width: '100%', border: '1px solid', borderColor: grey[200]}}>
        <Table sx={{border: '1px solid', borderColor: grey[100]}} padding="normal" size="small">
          <TableHead sx={{backgroundColor: grey[100]}}>
            <TableRow>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], width: '10%'}}></TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], width: '40%'}}>
                <b>Key</b>
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], width: '40%'}}>
                <b>Value</b>
              </TableCell>
              <TableCell sx={{border: '1px solid', borderColor: grey[200], width: '10%'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.map((header, index) => (
              <TableRow key={index}>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Checkbox checked={header.checked}></Checkbox>
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Box display={'flex'} alignItems={'center'}>
                    <Input value={header.value} />
                    <Button>{<EditIcon />}</Button>
                  </Box>
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Box display={'flex'} alignItems={'center'}>
                    <Input value={header.value} />
                    <Button>{<EditIcon />}</Button>
                  </Box>
                </TableCell>
                <TableCell sx={{border: '1px solid', borderColor: grey[200]}}>
                  <Button>{<DeleteIcon />}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HeadersEditor;
