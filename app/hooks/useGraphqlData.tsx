import {useState} from 'react';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {emptySchema} from '../utils/emptyGraphiQLSchema';
import useGraphqlErrors from './useGraphqlErrors';
import {useTranslation} from 'react-i18next';
import {isValidURL} from '~/utils/isValidUrl';
import {buildClientSchema} from 'graphql';

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
      clearError(event.target.name);
      if (graphqlData.sdlUrl === '') {
        setGraphqlData(prevState => ({
          ...prevState,
          sdlUrl: value + '?sdl',
        }));
      }
    } else {
      if (value !== '') {
        setError(event.target.name, t('errors.graphql.endpoint'));
      }
    }
  };

  const handleSDLUrlBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    //clearError(event.target.name);
    if (isValidURL(value)) {
      // clearError(event.target.name);
    } else {
      if (value !== '') {
        //setError(event.target.name, t('errors.graphql.sdl'));
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
    const apiUrl = `${window.location.protocol}//${window.location.host}/api/graphql`;
    if (graphqlData.endpointUrl) {
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
    } else {
      setError('request', t('errors.graphql.sendRequest'));
    }
    if (graphqlData.sdlUrl) {
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
        setGraphqlData(prevState => ({
          ...prevState,
          schema: buildClientSchema(result.data),
        }));
      } catch (error) {
        setGraphqlData(prevState => ({
          ...prevState,
          schema: emptySchema,
        }));
        console.log('error', error);
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
    handleSDLUrlBlur,
  };
};

export default useGraphqlData;
