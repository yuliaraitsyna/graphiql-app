import '@testing-library/jest-dom';
import transformGraphUrl from '../utils/transformGraphUrl';
import encodeHeaders from '../utils/encodeHeaders';

jest.mock('../utils/encodeHeaders');

describe('transformGraphUrl', () => {
  const originalReplaceState = window.history.replaceState;

  beforeEach(() => {
    jest.resetAllMocks();
    window.history.replaceState = jest.fn();
  });

  afterAll(() => {
    window.history.replaceState = originalReplaceState;
  });

  test('Check if update the URL for endpoint changes', () => {
    const urlData = {
      endpointUrl: 'http://example.com',
      query: 'query { ... }',
      headers: {Authorization: 'Bearer token'},
      variables: {key: 'value'},
    };

    transformGraphUrl('endpoint', 'http://new-url.com', urlData);

    expect(encodeHeaders).toHaveBeenCalledWith(JSON.stringify(urlData.headers));
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('/' + btoa('http://new-url.com') + '/'),
    );
  });

  test('Check if update the URL for query changes', () => {
    const urlData = {
      endpointUrl: 'http://example.com',
      query: 'query { old }',
      headers: {},
      variables: {},
    };

    transformGraphUrl('query', 'query { new }', urlData);

    expect(encodeHeaders).toHaveBeenCalledWith(JSON.stringify(urlData.headers));
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('/GRAPHQL/' + btoa(urlData.endpointUrl) + '/'),
    );
  });

  test('Check if update the URL for headers changes', () => {
    const urlData = {
      endpointUrl: 'http://example.com',
      query: 'query { ... }',
      headers: {Authorization: 'Bearer old-token'},
      variables: {},
    };

    transformGraphUrl('headers', JSON.stringify({Authorization: 'Bearer new-token'}), urlData);

    expect(encodeHeaders).toHaveBeenCalledWith(JSON.stringify({Authorization: 'Bearer new-token'}));
    expect(window.history.replaceState).toHaveBeenCalled();
  });

  test('Check if update the URL for variables changes', () => {
    const urlData = {
      endpointUrl: 'http://example.com',
      query: 'query { ... }',
      headers: {},
      variables: {oldKey: 'oldValue'},
    };

    transformGraphUrl('variables', JSON.stringify({newKey: 'newValue'}), urlData);

    expect(window.history.replaceState).toHaveBeenCalled();
  });

  test('Check if construct the new URL correctly for all parameters', () => {
    const urlData = {
      endpointUrl: 'http://example.com',
      query: 'query { ... }',
      headers: {},
      variables: {},
    };

    transformGraphUrl('endpoint', 'http://new-url.com', urlData);

    expect(window.history.replaceState).toHaveBeenCalled();
    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('/' + btoa('http://new-url.com') + '/'),
    );
  });
});
