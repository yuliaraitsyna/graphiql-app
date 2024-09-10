interface Data {
  endpoint: string;
  sdl: string;
  body: string;
  headers: object;
  variables: object;
}
export function saveGraphqlDataToLS(data: Data) {
  const existingData = localStorage.getItem('history');
  const historyData = existingData ? JSON.parse(existingData) : [];
  const localStorageData = {
    endpoint: data.endpoint,
    sdl: data.sdl,
    method: 'GRAPHQL',
    headers: data.headers,
    body: data.body,
    variables: data.variables,
    url: window.location.pathname,
  };
  historyData.push(localStorageData);
  localStorage.setItem('history', JSON.stringify(historyData));
}
