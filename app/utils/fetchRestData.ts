import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import prettifyJson from './prettifyJson';

export type ResponseData = {
  headers: Headers;
  payload: string;
  status: number;
  statusText: string;
  size: number;
  start: number;
};

const NullResponse: ResponseData = {
  headers: new Headers(),
  payload: '',
  status: 999,
  statusText: '',
  size: 0,
  start: 0,
};

export default async function fetchRestData(
  method: HTTPMethods,
  encodedUri: string,
  encodedBody: string = '',
  queryParams: string = '',
): Promise<ResponseData> {
  const headersArr = Array.from(new URLSearchParams(queryParams)).map(h => h.map(v => decodeURIComponent(v)));
  const headers: Record<string, string> = Object.fromEntries(headersArr);

  // if (headers.length) {
  //   headers.forEach(header => {
  //     headersObj[header[]] = header.value;
  //   });
  // }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const uri = atob(encodedUri);
  // if (data.params && data.method === HTTPMethods.GET) {
  //   const queryParams = new URLSearchParams();
  //   data.params.forEach(param => {
  //     queryParams.append(param.name, param.value);
  //   });
  //   uri += `?${queryParams.toString()}`;
  // }

  const body = atob(encodedBody);

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if ([HTTPMethods.POST, HTTPMethods.PUT, HTTPMethods.PATCH].includes(method)) {
    fetchOptions.body = JSON.stringify(body || {});
  }
  // return {uri, fetchOptions}
  const start = Date.now();
  try {
    const response = await fetch(uri, fetchOptions);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const cloneResponse = response.clone();
    const blob = await cloneResponse.blob();
    const responseObj: object = await response.json();
    const payload = prettifyJson(JSON.stringify(responseObj)).json;
    const headers = response.headers;
    const status = response.status;
    const statusText = response.statusText;
    const size = blob.size;
    // if (method === HTTPMethods.HEAD) {
    //   return {headers, };
    // }
    return {headers, payload, status, statusText, size, start};
  } catch (error) {
    console.error('Fetch error:', error);
    const data = NullResponse;
    data.start = start;
    return data;
  }
}
