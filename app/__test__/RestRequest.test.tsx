import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {jest} from '@jest/globals';
import RestRequest from '~/components/RESTfullClient/RestRequest/RestRequest';
import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';
import {createRestEncodedURL} from '~/utils/createRestEncodedURL';
import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';
import {replaceVariablesInURL} from '~/utils/replaceVariablesInURL';
import {decodeRestEncodedURL} from '~/utils/decodeRestEncodedURL';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();

jest.mock('@remix-run/react', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('@remix-run/react', () => ({
  useLocation: jest.fn(),
}));

jest.mock('~/routes/api_.rest', () => ({
  fetchRestData: jest.fn(),
}));

jest.mock('~/utils/replaceVariablesInURL', () => ({
  replaceVariablesInURL: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'page.rest.title': 'REST Client',
        'page.rest.placeholder': 'Enter URL',
        'page.rest.send': 'Send',
        'page.rest.setVariables': 'Set Variables',
        'page.rest.setHeaders': 'Set Headers',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(() => jest.fn()),
  useLocation: jest.fn(() => jest.fn()),
}));

jest.mock('@fontsource/roboto-mono', () => {});

describe('RestRequest Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Component elements render with translation', () => {
    render(<RestRequest onSendRequest={() => {}} />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('Set Variables')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();

    const toggleButton = screen.getByText('Set Variables');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Set Headers')).toBeInTheDocument();
  });

  test('should encode URL for GET method with headers', () => {
    const params: RequestParams = {
      endpointUrl: 'https://example.com/api/resource',
      method: HTTPMethods.GET,
      headers: [
        {key: 'Authorization', value: 'Bearer token', checked: true},
        {key: 'Content-Type', value: 'application/json', checked: true},
      ],
      body: '{title: "1" }',
    };

    let queryParams = '';

    if (params.headers) {
      queryParams = params.headers
        .filter(header => header.checked)
        .map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
        .join('&');
    }

    const expectedUrl = `/${params.method}/${btoa(params.endpointUrl)}${queryParams ? `?headers=${queryParams}` : ''}`;
    const result = createRestEncodedURL(params);

    expect(result).toBe(expectedUrl);
  });

  test('should encode URL for GET method with headers', () => {
    const params: RequestParams = {
      endpointUrl: 'https://example.com/api/resource',
      method: HTTPMethods.GET,
      headers: [
        {key: 'Authorization', value: 'Bearer token', checked: true},
        {key: 'Content-Type', value: 'application/json', checked: true},
      ],
      body: '{title: "1" }',
    };

    const queryParams = params.headers
      ?.filter(header => header.checked)
      .map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
      .join('&');

    const expectedUrl = `/${params.method}/${btoa(params.endpointUrl)}${queryParams ? `?headers=${queryParams}` : ''}`;
    const result = createRestEncodedURL(params);

    expect(result).toBe(expectedUrl);
  });

  test('should allow using variables in the URL', async () => {
    render(<RestRequest onSendRequest={() => {}} />);

    const mockVariables = [
      {name: 'url', value: 'https://example.com', checked: true},
      {name: 'id', value: '123', checked: true},
    ];

    localStorage.setItem('variables', JSON.stringify(mockVariables));

    const urlField = screen.getByPlaceholderText('Enter URL');
    fireEvent.change(urlField, {target: {value: 'https://{url}/api/resource/{id}'}});
    fireEvent.click(screen.getByText('Send'));

    expect(replaceVariablesInURL).toHaveBeenCalledWith('https://{url}/api/resource/{id}', mockVariables);
  });

  test('should correctly decode URL', () => {
    const params: RequestParams = {
      endpointUrl: 'https://example.com/api/resource',
      method: HTTPMethods.GET,
      headers: [{key: 'Content-Type', value: 'application/json', checked: true}],
      variables: [{name: 'url', value: 'https://example.com', checked: true}],
      body: undefined,
    };
    const encodedURL = createRestEncodedURL(params);
    const decodedParams = decodeRestEncodedURL(encodedURL);
    expect(decodedParams).toEqual(params);
  });
});
