import {json, LoaderFunction} from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json({message: 'Welcome to the GRAPHQL endpoint'});
};
