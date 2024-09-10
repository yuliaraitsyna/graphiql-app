import {useState} from 'react';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {emptySchema} from '../utils/emptyGraphiQLSchema';
import useGraphqlErrors from './useGraphqlErrors';
import {useTranslation} from 'react-i18next';
import {isValidURL} from '~/utils/isValidUrl';
import {buildClientSchema} from 'graphql';

const useGraphqlData = () => {
  const {t} = useTranslation();
  const {errors, setError, clearError, clearAllErrors} = useGraphqlErrors();

  const [graphqlData, setGraphqlData] = useState({
    endpointUrl: '',
    sdlUrl: '',
    query: '',
    variables: [],
    headers: [],
    schema: emptySchema,
    introspection: {data: null, endpoint: ''},
    response: {
      status: '',
      data: {},
    },
    sdl: emptySchema,
  });

  const handleEndpointUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      endpointUrl: event.target.value,
    }));
  };

  const handleEndpointUrlBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValidURL(value)) {
      transformGraphUrl('endpoint', value, graphqlData);
      if (graphqlData.sdlUrl === '') {
        setGraphqlData(prevState => ({
          ...prevState,
          sdlUrl: value + '?sdl',
        }));
      }
    }
  };

  const handleSDLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      sdlUrl: event.target.value,
    }));
  };

  const handleQueryChange = (value: string) => {
    setGraphqlData(prevState => ({
      ...prevState,
      query: value,
    }));
    transformGraphUrl('query', value, graphqlData);
  };

  const handleSendRequest = async () => {
    clearError('response');
    clearError('request');
    const apiUrl = `${window.location.protocol}//${window.location.host}/api/graphql`;
    if (!graphqlData.endpointUrl && !graphqlData.sdlUrl) {
      setError('request', t('errors.graphql.sendRequest'));
    }
    if (graphqlData.endpointUrl && isValidURL(graphqlData.endpointUrl)) {
      const queryData = new FormData();
      queryData.append('endpointUrl', graphqlData.endpointUrl);
      queryData.append('query', graphqlData.query);
      queryData.append('variables', JSON.stringify(graphqlData.variables));
      queryData.append('headers', JSON.stringify(graphqlData.headers));
      queryData.append('_action', 'QUERY');
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: queryData,
          redirect: 'follow',
        });
        const result = await response.json();
        setGraphqlData(prevState => ({
          ...prevState,
          response: result.data,
        }));
        if (result.data.status !== 200) {
          setError('response', t('errors.graphql.responseErrorStatus') + result.data.status);
        }
      } catch (error) {
        if (error) {
          setGraphqlData(prevState => ({
            ...prevState,
            response: {status: '', data: {}},
          }));
          setError('response', t('errors.graphql.responseError'));
        }
      }
    } else {
      setError('response', t('errors.graphql.notValidEndpoint'));
    }
    if (graphqlData.sdlUrl && isValidURL(graphqlData.sdlUrl)) {
      const introspectionData = new FormData();
      introspectionData.append('_action', 'SDL');
      introspectionData.append('sdlUrl', graphqlData.sdlUrl);
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: introspectionData,
          redirect: 'follow',
        });
        const result = await response.json();
        if (result.data) {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: buildClientSchema(result.data),
          }));
        } else {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: emptySchema,
          }));
        }
      } catch (error) {
        if (error) {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: emptySchema,
          }));
        }
      }
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
    clearAllErrors,
    clearError,
  };
};

export default useGraphqlData;
