import {ActionFunction, json, LoaderFunction, LoaderFunctionArgs} from '@remix-run/node';
import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';

export const fetchRestData = async (params: RequestParams) => {
  const headersObj: HeadersInit = {};

  if (params.headers) {
    params.headers.forEach(header => {
      headersObj[header.key] = header.value;
    });
  }

  if (!headersObj['Content-Type']) {
    headersObj['Content-Type'] = 'application/json';
  }

  let finalUrl = params.endpointUrl;
  if (params.variables && params.method === HTTPMethods.GET) {
    const queryParams = new URLSearchParams();
    params.variables.forEach(variable => {
      queryParams.append(variable.name, variable.value);
    });
    finalUrl += `?${queryParams.toString()}`;
  }

  const fetchOptions: RequestInit = {
    method: params.method,
    headers: headersObj,
  };

  if (params.method === HTTPMethods.POST || params.method === HTTPMethods.PUT || params.method === HTTPMethods.PATCH) {
    fetchOptions.body = JSON.stringify(params.body || {});
  }

  try {
    const response = await fetch(finalUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const loader: LoaderFunction = async ({params}: LoaderFunctionArgs) => {
  const method = params.method as HTTPMethods;
  const encodedURL = params.encodedURL;

  if (!encodedURL) {
    throw new Error('Encoded URL is missing');
  }

  const decodedURL = atob(encodedURL);

  if (method !== 'GET') {
    throw new Response('Invalid request method', {status: 405});
  }

  const response = await fetchRestData({
    endpointUrl: decodedURL,
    method,
  });

  return json(response);
};

export const action: ActionFunction = async ({params, request}) => {
  try {
    const method = params.method as HTTPMethods;
    const encodedURL = params.encodedURL;

    if (!encodedURL) {
      return json({error: 'Encoded URL is missing'}, {status: 400});
    }

    const decodedURL = atob(encodedURL);

    const body = await request.json();

    const response = await fetchRestData({
      endpointUrl: decodedURL,
      method,
      body,
    });

    return json(response);
  } catch (error) {
    console.error('Action error:', error);
    return json({error: 'Failed to fetch data'}, {status: 500});
  }
};
