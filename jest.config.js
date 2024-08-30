/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/app/$1',
  },
};
