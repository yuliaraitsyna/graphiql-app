import {Box, Container, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {SendRequestButton} from './SendRequestButton';
import {Url} from './Url';
import useGraphqlData from '~/hooks/useGraphqlData';
import JsonEditor from '~/components/JsonEditor/JsonEditor';

export function GraphiqlRequest() {
  const {t} = useTranslation();
  const {endpointUrl, sdlUrl, url, handleEndpointUrlChange, handleEndpointUrlBlur, handleSDLChange} = useGraphqlData();
  return (
    <Container maxWidth="xl">
      <Typography component={'h4'} variant="h4" textAlign={'center'}>
        {t('links.graphqlClient')}
      </Typography>
      <form>
        <Box sx={{flexGrow: 1, padding: 2}}>
          <SendRequestButton url={url} />
          <Url
            name="endpoint"
            value={endpointUrl}
            label={t('page.graphiql.endpointUrl')}
            onChange={handleEndpointUrlChange}
            onBlur={handleEndpointUrlBlur}
          />
          <Url name="sdl" value={sdlUrl} label={t('page.graphiql.sdlUrl')} onChange={handleSDLChange} />
        </Box>
        <HeadersEditor />
        <JsonEditor type="JSON" mode="edit" />
        <VariablesEditor />
      </form>
    </Container>
  );
}
