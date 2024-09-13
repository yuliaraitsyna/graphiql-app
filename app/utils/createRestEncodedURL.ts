import {RestRequestData} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import {getStringFromHeadersParams} from './getStringFromParams';

// export const createRestEncodedURL = (params: RequestParams): string => {
//   const encodedURL = btoa(params.endpointUrl);
//   let finalUrl = `${encodedURL}`;

//   if (params.method === HTTPMethods.POST || params.method === HTTPMethods.PUT || params.method === HTTPMethods.PATCH) {
//     const encodedBody = btoa(JSON.stringify(params.body || {}));
//     finalUrl += `/${encodedBody}`;
//   }

//   const queryParams = params.headers
//     ?.map(header => {
//       if (header.checked) {
//         return `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`;
//       }
//     })
//     .join('&');

//   if (queryParams) {
//     finalUrl += `?${queryParams}`;
//   }
//   console.log(finalUrl)
//   return finalUrl;
// };
//  http://localhost:5137/POST/9tL3Bvc3Rz/eyJ0aXRsZSI6lIn0=?Content-Type=application%2Fjson

export default function createRestEncodedUri(requestData: RestRequestData) {
  const uriSegment = btoa(requestData.uri);
  const isBodyNecessary =
    !!requestData.body &&
    (requestData.method === HTTPMethods.PATCH ||
      requestData.method === HTTPMethods.POST ||
      requestData.method === HTTPMethods.PUT);
  const bodySegment = isBodyNecessary ? '/' + btoa(JSON.stringify(JSON.parse(requestData.body))) : '';
  const headersSegment = getStringFromHeadersParams(requestData.headers);
  return uriSegment + bodySegment + headersSegment;
}
