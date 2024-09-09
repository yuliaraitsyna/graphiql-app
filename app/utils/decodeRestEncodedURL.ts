import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';
import {Header} from '~/components/HeadersEditor/models/header';

export const decodeRestEncodedURL = (url: string): RequestParams => {
  const [baseUrl, queryString] = url.split('?');
  const trimmedUrl = baseUrl.startsWith('/') ? baseUrl.slice(1) : baseUrl;
  const [encodedMethod, encodedURL, encodedBodyAndParams] = trimmedUrl.split('/');

  let headers: Header[] = [];
  if (queryString) {
    const queryParams = queryString.split('&');
    headers = queryParams.map(param => {
      const [key, value] = param.split('=');
      return {
        key: decodeURIComponent(key),
        value: decodeURIComponent(value),
        checked: true,
      };
    });
  }

  const endpointUrl = atob(encodedURL);
  let body = undefined;

  if (encodedBodyAndParams) {
    const [encodedBody] = encodedBodyAndParams.split('?');
    if (encodedBody && [HTTPMethods.POST, HTTPMethods.PUT, HTTPMethods.PATCH].includes(encodedMethod as HTTPMethods)) {
      try {
        body = JSON.parse(atob(encodedBody));
      } catch (e) {
        console.error('Failed to parse body JSON:', e);
        body = undefined;
      }
    }
  }

  return {
    method: encodedMethod as HTTPMethods,
    endpointUrl,
    body: body === undefined ? undefined : body,
    headers: headers.length > 0 ? headers : undefined,
  };
};
