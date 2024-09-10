import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';
import {Header} from '~/components/HeadersEditor/models/header';
import {Variable} from '~/components/models/variable'; // Import Variable if needed

export const decodeRestEncodedURL = (url: string): RequestParams => {
  const [baseUrl, queryString] = url.split('?');
  const trimmedUrl = baseUrl.startsWith('/') ? baseUrl.slice(1) : baseUrl;
  const [encodedMethod, encodedURL, encodedBody] = trimmedUrl.split('/');

  let headers: Header[] = [];
  let variables: Variable[] = [];
  let body = undefined;

  const endpointUrl = atob(encodedURL);

  if ([HTTPMethods.POST, HTTPMethods.PUT, HTTPMethods.PATCH].includes(encodedMethod as HTTPMethods) && encodedBody) {
    try {
      body = JSON.parse(atob(encodedBody));
    } catch (e) {
      console.error('Failed to parse body JSON:', e);
      body = undefined;
    }
  }

  if (queryString) {
    const queryParams = new URLSearchParams(queryString);

    const headersParam = queryParams.get('headers');
    if (headersParam) {
      headers = headersParam.split('&').map(param => {
        const [key, value] = param.split('=');
        return {
          key: decodeURIComponent(key),
          value: decodeURIComponent(value),
          checked: true,
        };
      });
    }

    const variablesParam = queryParams.get('variables');
    if (variablesParam) {
      variables = variablesParam.split('&').map(param => {
        const [key, value] = param.split('=');
        return {
          name: decodeURIComponent(key),
          value: decodeURIComponent(value),
          checked: true,
        };
      });
    }
  }

  return {
    method: encodedMethod as HTTPMethods,
    endpointUrl,
    body: body === undefined ? undefined : body,
    headers: headers.length > 0 ? headers : undefined,
    variables: variables.length > 0 ? variables : undefined,
  };
};
