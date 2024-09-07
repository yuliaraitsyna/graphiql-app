import {Box, Button, Container, Input, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {HTTPMethods} from './models/HTTPMethods';
import {grey} from '@mui/material/colors';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {RESTAction} from './models/RESTAction';
import {useNavigate} from '@remix-run/react';

interface RestRequestProps {
  initialMethod: HTTPMethods;
}

const RestRequest: React.FC<RestRequestProps> = ({initialMethod}) => {
  const [method, setMethod] = useState<HTTPMethods>(initialMethod);
  const [action, setAction] = useState<RESTAction>(RESTAction.SET_HEADERS);
  const [URL, setURL] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedHeaders = localStorage.getItem('headers');
    const headers = storedHeaders ? JSON.parse(storedHeaders) : null;

    const encodedHeaders = Object.entries(headers)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .join('&');

    const queryParams = `${encodedHeaders}`;

    const encodedURL = btoa(unescape(encodeURIComponent(URL)));

    if (URL) {
      navigate(`/rest/${method}?url=${encodedURL}${queryParams}`, {replace: true});
    } else {
      navigate(`/rest/${method}`, {replace: true});
    }
  }, [method, URL, navigate]);

  const handleMethodSelection = (event: SelectChangeEvent) => {
    setMethod(event.target.value as HTTPMethods);
  };

  const handleToggleRESTAction = () => {
    setAction(prevAction =>
      prevAction === RESTAction.SET_HEADERS ? RESTAction.SET_VARIABLES : RESTAction.SET_HEADERS,
    );
  };

  const handleURLChange = (value: string) => {
    setURL(value);
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
        <Input
          placeholder={'Endpoint URL'}
          sx={{width: '80%', margin: '5px'}}
          disableUnderline
          value={URL}
          onChange={e => handleURLChange(e.target.value)}
        />
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
