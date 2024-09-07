import {useState} from 'react';
// import { buildClientSchema, GraphQLSchema, parse } from 'graphql';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {emptySchema} from '../utils/emptyGraphiQLSchema';
import useGraphqlErrors from './useGraphqlErrors';
import {useTranslation} from 'react-i18next';

const useGraphqlData = () => {
  const {t} = useTranslation();
  const {errors, setError, clearError} = useGraphqlErrors();

  const [graphqlData, setGraphqlData] = useState({
    endpointUrl: '',
    sdlUrl: '',
    query: '',
    variables: [],
    headers: [],
    schema: emptySchema,
    introspection: {data: null, endpoint: ''},
    response: {},
  });

  const handleEndpointUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      endpointUrl: event.target.value,
    }));
  };

  const handleEndpointUrlBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (URL.canParse(value)) {
      transformGraphUrl('endpoint', value, graphqlData);
      clearError(event.target.name);
      if (graphqlData.sdlUrl === '') {
        setGraphqlData(prevState => ({
          ...prevState,
          sdlUrl: value + '?sdl',
        }));
      }
    } else {
      setError(event.target.name, t('errors.graphql.endpoint'));
    }
  };

  const handleSDLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      sdlUrl: event.target.value,
    }));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      query: event.target.value,
    }));
  };

  const handleSendRequest = async () => {
    console.log(window.location);
    const apiUrl = `${window.location.protocol}//${window.location.host}/api/graphql`;
    const queryData = new FormData();
    //formData.append('endpointUrl', graphqlData.endpointUrl);
    queryData.append('endpointUrl', 'https://countries.trevorblades.com/');
    //formData.append('sdlUrl', graphqlData.sdlUrl);
    queryData.append('sdlUrl', '');
    queryData.append(
      'query',
      `query {
  countries {
    name
  }
}`,
    );
    queryData.append('variables', '');
    queryData.append('headers', '');
    queryData.append('_action', 'QUERY');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: queryData,
        redirect: 'follow',
      });
      const result = await response.json();
      clearError('response');
      setGraphqlData(prevState => ({
        ...prevState,
        response: result,
      }));
    } catch (error) {
      if (error) {
        setError('response', t('errors.graphql.endpoint'));
      }
    }

    const introspectionData = new FormData();
    introspectionData.append('_action', 'SDL');
    introspectionData.append('sdlUrl', 'https://countries.trevorblades.com/?sdl');

    //schema, introspection
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: introspectionData,
        redirect: 'follow',
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    errors,
    graphqlData,
    ...graphqlData,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    handleSendRequest,
    handleQueryChange,
  };
};

export default useGraphqlData;
