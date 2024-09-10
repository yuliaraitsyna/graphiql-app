import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';

export const createRestEncodedURL = (params: RequestParams): string => {
  const encodedURL = btoa(params.endpointUrl);
  let finalUrl = `/${params.method}/${encodedURL}`;
  console.log(finalUrl);

  if (params.method === HTTPMethods.POST || params.method === HTTPMethods.PUT || params.method === HTTPMethods.PATCH) {
    const encodedBody = btoa(JSON.stringify(params.body || {}));
    finalUrl += `/${encodedBody}`;
  }

  const headerParams = params.headers
    ?.filter(header => header.checked)
    .map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
    .join('&');

  const variableParams = params.variables
    ?.filter(header => header.checked)
    .map(variable => `${encodeURIComponent(variable.name)}=${encodeURIComponent(variable.value)}`)
    .join('&');

  const queryParams = [];
  if (headerParams) queryParams.push(`headers=${headerParams}`);
  if (variableParams) queryParams.push(`variables=${variableParams}`);

  if (queryParams.length > 0) {
    finalUrl += `?${queryParams.join('&')}`;
  }

  return finalUrl;
};
