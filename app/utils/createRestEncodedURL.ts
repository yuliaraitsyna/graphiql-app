import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';

export const createRestEncodedURL = (params: RequestParams): string => {
  const encodedURL = btoa(params.endpointUrl);
  let finalUrl = `${encodedURL}`;

  if (params.method === HTTPMethods.POST || params.method === HTTPMethods.PUT || params.method === HTTPMethods.PATCH) {
    const encodedBody = btoa(JSON.stringify(params.body || {}));
    finalUrl += `/${encodedBody}`;
  }

  const queryParams = params.headers
    ?.map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
    .join('&');

  if (queryParams) {
    finalUrl += `?${queryParams}`;
  }

  return finalUrl;
};
