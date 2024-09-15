import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {jest} from '@jest/globals';
import RestClient from '~/components/RESTfullClient/RestClient/RestClient';
// import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
// import {createRestEncodedURL} from '~/utils/createRestEncodedURL';
// import {RequestParams} from '~/components/RESTfullClient/models/RequestParams';

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
}));

// jest.mock('~/routes/api_.rest', () => ({
//   fetchRestData: jest.fn(),
// }));

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
}));

jest.mock('@fontsource/roboto-mono', () => {});

describe.skip('RestClient Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Component elements render with translation', () => {
    // render(<RestClient onSendRequest={() => {}} />);
    render(<RestClient />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('Set Variables')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();

    const toggleButton = screen.getByText('Set Variables');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Set Headers')).toBeInTheDocument();
  });

  // test('should encode URL for GET method with headers', () => {
  //   const params: RequestParams = {
  //     endpointUrl: 'https://example.com/api/resource',
  //     method: HTTPMethods.GET,
  //     headers: [
  //       {key: 'Authorization', value: 'Bearer token', checked: true},
  //       {key: 'Content-Type', value: 'application/json', checked: true},
  //     ],
  //     body: '{title: "1" }',
  //   };

  //   let queryParams = '';

  //   if (params.headers) {
  //     queryParams = params.headers
  //       .filter(header => header.checked)
  //       .map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
  //       .join('&');
  //   }

  //   const expectedUrl = `${btoa(params.endpointUrl)}${queryParams ? `?${queryParams}` : ''}`;
  //   const result = createRestEncodedURL(params);

  //   expect(result).toBe(expectedUrl);
  // });

  // test('should encode URL for GET method with headers', () => {
  //   const params: RequestParams = {
  //     endpointUrl: 'https://example.com/api/resource',
  //     method: HTTPMethods.GET,
  //     headers: [
  //       {key: 'Authorization', value: 'Bearer token', checked: true},
  //       {key: 'Content-Type', value: 'application/json', checked: true},
  //     ],
  //     body: '{title: "1" }',
  //   };

  //   const queryParams = params.headers
  //     ?.filter(header => header.checked)
  //     .map(header => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
  //     .join('&');

  //   const expectedUrl = `${btoa(params.endpointUrl)}${queryParams ? `?${queryParams}` : ''}`;
  //   const result = createRestEncodedURL(params);

  //   expect(result).toBe(expectedUrl);
  // });
});
