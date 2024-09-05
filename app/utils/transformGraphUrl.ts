import encodeHeaders from './encodeHeaders';

interface Url {
  endpointUrl: string;
  query: string;
  headers: object;
  variables: object;
}
type UrlPartToChange = 'endpoint' | 'query' | 'headers' | 'variables';

export default function transformGraphUrl(urlPartToChange: UrlPartToChange, value: string, data: Url): void {
  const {endpointUrl, query, headers, variables} = data;
  const method = 'GRAPHQL';
  let newUrl,
    encodedEndpoint,
    encodedQuery,
    encodedVariables = '';
  encodedEndpoint = endpointUrl ? btoa(endpointUrl) : '';
  encodedVariables = variables ? JSON.stringify(variables) : '';
  encodedQuery = query ? btoa(query) : '';

  let headersString = encodeHeaders(JSON.stringify(headers));

  switch (urlPartToChange) {
    case 'endpoint':
      encodedEndpoint = btoa(value);
      break;
    case 'query':
      encodedQuery = btoa(query);
      break;
    case 'headers':
      headersString = encodeHeaders(value);
      break;
    case 'variables':
      encodedVariables = JSON.stringify(JSON.parse(value));
      break;
    default:
      newUrl = `/${encodedEndpoint}/${encodedQuery + encodedVariables}/?${headers}`;
      break;
  }
  const encodedBody = btoa(JSON.stringify({encodedQuery, encodedVariables}));

  const urlParts = [
    `${method}/`,
    encodedEndpoint ? `${encodedEndpoint}/` : '',
    encodedBody ? `${encodedBody}/` : '',
    headersString ? `?${headersString}` : '',
  ];
  newUrl = `/${urlParts.join('')}`;
  window.history.replaceState({}, '', newUrl);
}
