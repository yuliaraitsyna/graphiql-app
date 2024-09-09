import {type ActionFunctionArgs, json} from '@vercel/remix';
import {cors} from 'remix-utils/cors';
import {getIntrospectionQuery} from 'graphql';

type FetchGraphQLDataParams = {
  endpointUrl: string;
  query: string;
  variables: string;
  //headers: string;
};

type FetchGraphQLIntrospectionParams = {
  sdlUrl: string;
};

const fetchGraphQLData = async ({endpointUrl, query, variables}: FetchGraphQLDataParams) => {
  const response = await fetch(endpointUrl, {
    method: 'POST',
    //headers
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables}),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();

  // if (responseData.errors) {
  //   return { ...response, data: responseData.errors, };
  // }
  return {
    status: response.status,
    data: responseData.data,
  };
};

const fetchGraphQLIntrospectionData = async ({sdlUrl}: FetchGraphQLIntrospectionParams) => {
  const response = await fetch(sdlUrl, {
    method: 'POST',
    //headers
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  return responseData.data;
};

export const loader = async () => {
  return new Response('Method Not Allowed', {status: 405});
};

export const action = async ({request}: ActionFunctionArgs): Promise<Response> => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {status: 405});
  }
  const data = Object.fromEntries(await request.formData()) as Record<string, string>;
  const {endpointUrl, sdlUrl, query, variables, _action} = data;
  let apiResponse;
  try {
    switch (_action) {
      case 'QUERY':
        apiResponse = await fetchGraphQLData({endpointUrl, query, variables});
        return cors(
          request,
          json({message: 'Getting data from the endpoint URL', method: request.method, data: apiResponse}),
        );
      case 'SDL': {
        apiResponse = await fetchGraphQLIntrospectionData({sdlUrl});
        return cors(
          request,
          json({message: 'Getting sdl from the endpoint URL', method: request.method, data: apiResponse}),
        );
      }
      default:
        return new Response('Method Not Allowed', {status: 405});
    }
  } catch (error) {
    return cors(
      request,
      json({error: error instanceof Error ? error.message : 'An unknown error occurred'}, {status: 500}),
    );
  }
};
