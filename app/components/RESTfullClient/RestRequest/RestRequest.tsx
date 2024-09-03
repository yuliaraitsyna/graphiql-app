import {Box, Button, Container, Input, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import React, {useState} from 'react';
import {HTTPMethods} from './models/HTTPMethods';
import {grey} from '@mui/material/colors';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {RESTAction} from './models/RESTAction';

const RestRequest: React.FC = () => {
  const [method, setMethod] = useState<HTTPMethods>(HTTPMethods.GET);
  const [action, setAction] = useState<RESTAction>(RESTAction.SET_HEADERS);

  const handleMethodSelection = (event: SelectChangeEvent) => {
    setMethod(event.target.value as HTTPMethods);
  };

  const handleToggleRESTAction = () => {
    setAction(prevAction =>
      prevAction === RESTAction.SET_HEADERS ? RESTAction.SET_VARIABLES : RESTAction.SET_HEADERS,
    );
  };

  return (
    <Container sx={{width: '80%', border: 'solid red'}}>
      <Typography component={'h4'} variant="h4" textAlign={'left'}>
        REST Client
      </Typography>
      <Box sx={{border: `1px solid ${grey[400]}`, borderRadius: '5px', display: 'flex', width: '100%'}}>
        <Select fullWidth value={method} onChange={handleMethodSelection} sx={{maxWidth: '150px'}}>
          {Object.values(HTTPMethods).map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Input placeholder={'Endpoint URL'} sx={{width: '80%', margin: '5px'}} disableUnderline></Input>
        <Button variant="contained">Send</Button>
      </Box>
      <Button onClick={handleToggleRESTAction}>
        {action === RESTAction.SET_HEADERS ? RESTAction.SET_VARIABLES : RESTAction.SET_HEADERS}
      </Button>
      {action === RESTAction.SET_HEADERS ? <HeadersEditor></HeadersEditor> : <VariablesEditor></VariablesEditor>}
    </Container>
  );
};

export default RestRequest;
