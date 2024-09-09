/* eslint-disable import/no-unresolved */
import {Box, Container, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {SendRequestButton} from './SendRequestButton';
import {Url} from './Url';
import useGraphqlData from '~/hooks/useGraphqlData';
import {QueryEditor} from '~/components/QueryEditor';
import {AccordionBlock} from '~/components/UI/AccordionBlock';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandler from '~/components/UI/ErrorHandler';
import JsonEditor from '~/components/JsonEditor/JsonEditor';

export const GraphiqlRequest: React.FC = () => {
  const {t} = useTranslation();
  const {
    errors,
    response,
    endpointUrl,
    sdlUrl,
    query,
    schema,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    handleSendRequest,
    handleQueryChange,
    handleSDLUrlBlur,
  } = useGraphqlData();

  const isDisabledSend = Object.prototype.hasOwnProperty.call(errors, 'endpoint');

  return (
    <Container maxWidth="xl">
      <Typography component={'h4'} variant="h4" textAlign={'center'}>
        {t('links.graphqlClient')}
      </Typography>
      <div>
        <Box sx={{flexGrow: 1, padding: 2}}>
          <SendRequestButton handleRequest={handleSendRequest} isDisabled={isDisabledSend} />
          <Url
            label={t('page.graphiql.endpointUrl')}
            name="endpoint"
            value={endpointUrl}
            onChange={handleEndpointUrlChange}
            onBlur={handleEndpointUrlBlur}
            placeholder={t('page.graphiql.placeholderEndpointUrl')}
          />
          <Url
            label={t('page.graphiql.sdlUrl')}
            name="sdl"
            value={sdlUrl}
            onChange={handleSDLChange}
            placeholder={t('page.graphiql.placeholderSdlUrl')}
            onBlur={handleSDLUrlBlur}
          />
        </Box>
        <QueryEditor schema={schema} value={query} onChange={handleQueryChange} />
        <AccordionBlock label={t('common.headers')}>
          <HeadersEditor />
        </AccordionBlock>
        <AccordionBlock label={t('common.variables')}>
          <VariablesEditor />
        </AccordionBlock>
        {response.status ? <p>HTTP status: {response.status}</p> : null}
        <JsonEditor mode="view" defaultValue={JSON.stringify(response.data)} />
        <p>SDL Documentation</p>
        <ToastContainer />
        <ErrorHandler errors={errors} />
      </div>
    </Container>
  );
};
