import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Tab,
  Tabs,
  FormHelperText,
  useTheme,
} from '@mui/material';
import React, {ReactNode, useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {HTTPMethods} from './models/HTTPMethods';
import {grey} from '@mui/material/colors';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
// import {RESTAction} from './models/RESTAction';
import createRestEncodedUri from '~/utils/createRestEncodedURL';
import {RestHistoryData} from '../models/RequestParams';
// import {fetchRestData} from '~/routes/api_.rest';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
// import {replaceVariablesInURL} from '~/utils/replaceVariablesInURL';
import {useTranslation} from 'react-i18next';
import {Header} from '~/components/HeadersEditor/models/header';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import {getStringFromParams} from '~/utils/getStringFromParams';
import prettifyJson from '~/utils/prettifyJson';
import QueryParamsEditor from '~/components/QueryParamsEditor/QueryParamsEditor';
import getParamsFromUri from '~/utils/getParamsFromUri';
import {Variable} from '~/components/VariablesEditor/models/variable';
import {QueryParam} from '~/components/QueryParamsEditor/models/queryParams';

// interface RestRequestParams {
//   onSendRequest: (response: Response) => void;
// }

type Tabs = 'Headers' | 'Variables' | 'Body' | 'Response';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Props = {
  children: ReactNode;
  initialBody: string;
  initialHeaders: Header[];
  initialUri: string;
};

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const RestRequest: React.FC<RestRequestParams> = ({onSendRequest}) => {
const RestClient: React.FC<Partial<Props>> = ({children, initialBody = '', initialUri = '', initialHeaders = []}) => {
  const location = useLocation();
  const pathMethod = location.pathname.slice(1).toUpperCase() as HTTPMethods;
  const isValidMethod = Object.values(HTTPMethods).includes(pathMethod);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.split('/').length > 3) setTab(4);
  }, [location]);

  const {t} = useTranslation();
  // const [method, setMethod] = useState<HTTPMethods>(HTTPMethods.GET);
  // const [action, setAction] = useState<RESTAction>(RESTAction.SET_HEADERS);
  const [method, setMethod] = useState<HTTPMethods>(isValidMethod ? pathMethod : HTTPMethods.GET);
  const [body, setBody] = useState<string>(initialBody);
  const [headers, setHeaders] = useState<Header[]>(initialHeaders);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [params, setParams] = useState<QueryParam[]>([]);
  const [url, setUrl] = useState<string>('');
  const [uri, setUri] = useState<string>(initialUri);
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [errorUriMessage, setErrorMessage] = useState('');
  const [errorJsonMessage, setErrorJsonMessage] = useState('');

  const handleHeadersChange = (updatedHeaders: Header[]) => {
    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    if (location.state) {
      const request: RestHistoryData = location.state as RestHistoryData;

      setMethod(request.method);
      setUrl(request.uri);
      setHeaders(request.headers);
      setBody(request.body);
      setParams(request.params);
    }
  }, [location.state]);

  useEffect(() => {
    if (method === HTTPMethods.PATCH || method === HTTPMethods.POST || method === HTTPMethods.PUT) {
      const message = body ? (prettifyJson(body).error?.message ?? '') : '';
      setErrorJsonMessage(message);
    }
  }, [body, method]);

  const handleVariablesChange = (updatedVariables: Variable[]) => {
    setVariables(updatedVariables);
    // const params = getStringFromVariablesParams(updatedVariables);
    // setUri(params ? url + params : url);
  };

  const handleParamsChange = (updatedParams: QueryParam[]) => {
    setParams(updatedParams);
    const params = getStringFromParams(updatedParams);
    setUri(params ? url + params : url);
  };

  const handleSendingRequest = async () => {
    // const storedHeaders = localStorage.getItem('headers');
    // const headers: Header[] | null = storedHeaders ? JSON.parse(storedHeaders) : null;

    // const storedVariables = localStorage.getItem('variables');
    // const variables: Variable[] | null = storedVariables ? JSON.parse(storedVariables) : null;
    // const endpointURL = variables ? replaceVariablesInURL(url, variables) : url;

    // let parsedBody = null;

    // parsedBody = body ? JSON.parse(body) : null;

    const requestData: RestHistoryData = {
      uri,
      method,
      headers,
      params,
      body,
      type: 'rest',
    };
    const encodedUri = createRestEncodedUri(requestData);
    const history: RestHistoryData[] = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(requestData);
    localStorage.setItem('history', JSON.stringify(history));
    navigate(encodedUri);
    setTab(4);
    // const params: RequestParams = {
    //   endpointUrl: uri,
    //   method: method,
    //   headers: headers,
    //   variables: variables,
    //   body: parsedBody,
    // };

    //   const encodedURL = createRestEncodedURL(params);

    //   try {
    //     const response = await fetchRestData(params);
    //     console.log(response);
    //     onSendRequest(response);
    //     navigate(`/${method}/${encodedURL}`, {replace: true});
    //   } catch (error) {
    //     console.error('Error sending request:', error);
    //   }
  };

  const handleMethodSelection = (event: SelectChangeEvent) => {
    navigate(`/rest/${event.target.value}`);
    setMethod(event.target.value as HTTPMethods);
  };

  // const handleToggleRESTAction = () => {
  //   setAction(prevAction =>
  //     prevAction === RESTAction.SET_HEADERS ? RESTAction.SET_VARIABLES : RESTAction.SET_HEADERS,
  //   );
  // };

  const handleUrlChange = (value: string) => {
    let urlStr = '';
    let searchStr = '';
    try {
      const url: URL = new URL(value);
      const {href, search} = url;
      searchStr = search;
      urlStr = search ? href.slice(0, -search.length) : href;
      if (value + '/' === urlStr) urlStr = value;
      setErrorMessage('');
    } catch (error) {
      if (error instanceof TypeError && !!value) setErrorMessage(error.message);
    }
    const newUrlStr = urlStr || value;
    setUrl(newUrlStr);
    const uri = newUrlStr + searchStr;
    setUri(uri);
    setParams(getParamsFromUri(uri));
  };

  const handleBodyChange = (body: string) => {
    console.log(body); // remove later
    setBody(body);
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Container sx={{width: '80%'}}>
      <Typography component={'h4'} variant="h4" textAlign={'left'}>
        {t('page.rest.title')}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${grey[400]}`,
          borderRadius: '5px',
          display: 'flex',
          width: '100%',
          textAlign: 'center',
        }}>
        <Select fullWidth value={method} onChange={handleMethodSelection} sx={{maxWidth: '120px'}}>
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
          value={uri}
          onChange={e => handleUrlChange(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSendingRequest}
          disabled={!!errorUriMessage || !uri || !!errorJsonMessage}>
          {t('page.rest.send')}
        </Button>
      </Box>
      <FormHelperText
        style={{
          color: theme.palette.error.main,
          marginTop: 0,
          marginLeft: '8px',
          fontSize: '14px',
          height: '1.5rem',
        }}>
        {errorUriMessage}
      </FormHelperText>
      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label={t('editors.variablesTitle')} {...a11yProps(0)} />
            <Tab label={t('editors.queryTitle')} {...a11yProps(1)} />
            <Tab label={t('editors.headersTitle')} {...a11yProps(2)} />
            <Tab label={t('editors.bodyTitle')} {...a11yProps(3)} />
            <Tab label={t('editors.responseTitle')} {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          <VariablesEditor setStoredVariables={handleVariablesChange} decodedVariables={variables} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <QueryParamsEditor onParamsChange={handleParamsChange} queryParams={params} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          <HeadersEditor setStoredHeaders={handleHeadersChange} decodedHeaders={headers} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          <JsonEditor
            mode={
              method === HTTPMethods.PATCH || method === HTTPMethods.POST || method === HTTPMethods.PUT
                ? 'edit'
                : 'view'
            }
            onChange={handleBodyChange}
            defaultValue={body}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={4}>
          {children}
        </CustomTabPanel>
      </Box>
    </Container>
    // <Container sx={{width: '80%'}}>
    //   <Typography component={'h4'} variant="h4" textAlign={'left'}>
    //     {t('page.rest.title')}
    //   </Typography>
    //   <Box
    //     sx={{
    //       border: `1px solid ${grey[400]}`,
    //       borderRadius: '5px',
    //       display: 'flex',
    //       width: '100%',
    //       textAlign: 'center',
    //     }}>
    //     <Select fullWidth value={method} onChange={handleMethodSelection} sx={{maxWidth: '120px'}}>
    //       {Object.values(HTTPMethods).map((value, index) => (
    //         <MenuItem key={index} value={value}>
    //           {value}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //     <Input
    //       placeholder={t('page.rest.placeholder')}
    //       sx={{width: '80%', margin: '5px'}}
    //       disableUnderline
    //       value={URL}
    //       onChange={e => handleURLChange(e.target.value)}
    //     />
    //     <Button variant="contained" onClick={handleSendingRequest}>
    //       {t('page.rest.send')}
    //     </Button>
    //   </Box>
    //   <Button onClick={handleToggleRESTAction}>
    //     {action === RESTAction.SET_HEADERS ? t('page.rest.setVariables') : t('page.rest.setHeaders')}
    //   </Button>
    //   {action === RESTAction.SET_HEADERS ? <HeadersEditor></HeadersEditor> : <VariablesEditor></VariablesEditor>}
    //   <JsonEditor mode="edit" type="JSON" defaultValue="" onChange={handleBodyChange}></JsonEditor>
    // </Container>
  );
};

export default RestClient;
