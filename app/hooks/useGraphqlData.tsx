import {useState} from 'react';
// import { buildClientSchema, GraphQLSchema, parse } from 'graphql';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {emptySchema} from '../utils/emptyGraphiQLSchema';

const useGraphqlData = () => {
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
    transformGraphUrl('endpoint', event.target.value, graphqlData);
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
    graphqlData,
    ...graphqlData,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    handleSendRequest,
  };
};

export default useGraphqlData;
