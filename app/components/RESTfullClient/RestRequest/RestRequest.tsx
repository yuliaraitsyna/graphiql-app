import {Box, Button, Container, Input, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {HTTPMethods} from './models/HTTPMethods';
import {grey} from '@mui/material/colors';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {RESTAction} from './models/RESTAction';
import {createRestEncodedURL} from '~/utils/createRestEncodedURL';
import {RequestParams} from '../models/RequestParams';
import {fetchRestData} from '~/routes/api_.rest';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
import {replaceVariablesInURL} from '~/utils/replaceVariablesInURL';
import {useTranslation} from 'react-i18next';
import {decodeRestEncodedURL} from '~/utils/decodeRestEncodedURL';
import {Header} from '~/components/HeadersEditor/models/header';

interface RestRequestParams {
  onSendRequest: (response: Response) => void;
}
const RestRequest: React.FC<RestRequestParams> = ({onSendRequest}) => {
  const {t} = useTranslation();
  const [method, setMethod] = useState<HTTPMethods>(HTTPMethods.GET);
  const [action, setAction] = useState<RESTAction>(RESTAction.SET_HEADERS);
  const [body, setBody] = useState<string>('');
  const [URL, setURL] = useState<string>('');
  const [headers, setHeaders] = useState<Header[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = window.location.pathname;
    setMethod(pathname.slice(1) as HTTPMethods);
    const search = window.location.search;
    const hash = window.location.hash;

    if (search) {
      const fullUrl = `${pathname}${search}${hash}`;
      const params = decodeRestEncodedURL(fullUrl);

      setMethod(params.method);
      setBody(params.method);
      setURL(params.endpointUrl);

      if (params.headers) {
        setHeaders(params.headers);
      }
    }
  }, [location]);

  const handleSendingRequest = async () => {
    const storedHeaders = localStorage.getItem('headers');
    const headers = storedHeaders ? JSON.parse(storedHeaders) : null;

    const storedVariables = localStorage.getItem('variables');
    const variables = storedVariables ? JSON.parse(storedVariables) : null;

    const endpointURL = replaceVariablesInURL(URL, variables);

    let parsedBody = null;

    parsedBody = body ? JSON.parse(body) : null;

    const params: RequestParams = {
      endpointUrl: endpointURL,
      method: method,
      headers: headers,
      variables: variables,
      body: parsedBody,
    };

    const encodedURL = createRestEncodedURL(params);

    try {
      const response = await fetchRestData(params);
      onSendRequest(response);
      navigate(`${encodedURL}`, {replace: true});
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleMethodSelection = (event: SelectChangeEvent) => {
    const method = event.target.value;
    window.location.pathname = `/${method}`;
    setMethod(method as HTTPMethods);
  };

  const handleToggleRESTAction = () => {
    setAction(prevAction =>
      prevAction === RESTAction.SET_HEADERS ? RESTAction.SET_VARIABLES : RESTAction.SET_HEADERS,
    );
  };

  const handleURLChange = (value: string) => {
    setURL(value);
  };

  const handleBodyChange = (body: string) => {
    console.log(body);
    setBody(body);
  };

  return (
    <Container sx={{width: '80%'}}>
      <Typography component={'h4'} variant="h4" textAlign={'left'}>
        {t('page.rest.title')}
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
          placeholder={t('page.rest.placeholder')}
          sx={{width: '80%', margin: '5px'}}
          disableUnderline
          value={URL}
          onChange={e => handleURLChange(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendingRequest}>
          {t('page.rest.send')}
        </Button>
      </Box>
      <Button onClick={handleToggleRESTAction}>
        {action === RESTAction.SET_HEADERS ? t('page.rest.setVariables') : t('page.rest.setHeaders')}
      </Button>
      {action === RESTAction.SET_HEADERS ? <HeadersEditor></HeadersEditor> : <VariablesEditor></VariablesEditor>}
      <JsonEditor mode="edit" type="JSON" defaultValue="" onChange={handleBodyChange}></JsonEditor>
    </Container>
  );
};

export default RestRequest;
