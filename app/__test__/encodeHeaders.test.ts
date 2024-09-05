import '@testing-library/jest-dom';
import encodeHeaders from '../utils/encodeHeaders';

describe('encodeHeaders', () => {
  test('Check if return an empty string if headers is undefined or null', () => {
    expect(encodeHeaders()).toBe('');
    expect(encodeHeaders(undefined)).toBe('');
  });
  test('Check if parse and encode headers when given as a JSON string', () => {
    const jsonString = '{"Content-Type":"application/json","Authorization":"token"}';
    const result = encodeHeaders(jsonString);
    expect(result).toBe('Content-Type=application%2Fjson&Authorization=token');
  });

  test('Check if encode headers when given as an object', () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'token',
    };
    const result = encodeHeaders(headers);
    expect(result).toBe('Content-Type=application%2Fjson&Authorization=token');
  });

  test('Check if return an empty string if headers is an empty object', () => {
    const result = encodeHeaders({});
    expect(result).toBe('');
  });

  test('Check if correctly encode special characters in keys and values', () => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Personal-Token': '123&456=789',
    };
    const result = encodeHeaders(headers);
    expect(result).toBe('Content-Type=application%2Fjson&X-Personal-Token=123%26456%3D789');
  });

  test('Check if encoding key-value pairs', () => {
    const headers = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    const result = encodeHeaders(headers);
    expect(result).toBe('key1=value1&key2=value2&key3=value3');
  });
});
