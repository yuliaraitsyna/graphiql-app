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
  });

  const handleEndpointUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      endpointUrl: event.target.value,
    }));
  };

  const handleEndpointUrlBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(URL.canParse(value));
    if (URL.canParse(value)) {
      transformGraphUrl('endpoint', value, graphqlData);
      clearError(event.target.name);
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

  const handleSendRequest = async () => {
    console.log(window.location);
    const apiUrl = `${window.location.protocol}//${window.location.host}/api/graphql`;
    const formData = new FormData();
    //formData.append('endpointUrl', graphqlData.endpointUrl);
    formData.append('endpointUrl', 'https://countries.trevorblades.com/');
    //formData.append('sdlUrl', graphqlData.sdlUrl);
    formData.append('sdlUrl', '');
    formData.append(
      'query',
      `query {
  countries {
    name
  }
}`,
    );
    formData.append('variables', '');
    formData.append('headers', '');
    formData.append('_action', 'QUERY');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
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
  };
};

export default useGraphqlData;
