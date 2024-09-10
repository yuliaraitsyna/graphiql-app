import {extractVariablesFromGraphQLQuery} from './exctractVariablesFromQuery';
export function parseGraphQLUrl(url: string) {
  try {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname.split('/');
    const endpointBase64 = pathname[2];
    const bodyBase64 = pathname[3];
    const endpoint = atob(endpointBase64);
    const queryUrl = atob(bodyBase64);
    const {updatedQuery, variables} = extractVariablesFromGraphQLQuery(queryUrl);
    const query = updatedQuery ?? queryUrl;
    const headerParams: Record<string, string> = {};
    Object.entries(urlObject.searchParams).map(([value, key]) => {
      headerParams[key] = value;
    });
    return {
      endpoint,
      query,
      headerParams,
      variables,
    };
  } catch (error) {
    if (error) {
      return null;
    }
  }
}
