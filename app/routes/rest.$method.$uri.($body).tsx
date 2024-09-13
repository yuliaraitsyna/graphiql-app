import {Box} from '@mui/material';
import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@vercel/remix';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
import ResponseBar from '~/components/ResponseBar/ResponseBar';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import fetchRestData, {ResponseData} from '~/utils/fetchRestData';

type Routes = {
  method: HTTPMethods;
  uri: string;
  body: string;
  params: string;
};

type LoaderData = {
  data: ResponseData;
};

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

export async function loader({params, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const method = params.method as HTTPMethods;
  const routes: Routes = {
    method,
    uri: params.uri ?? '',
    body: params.body ?? '',
    params: url.search ?? '',
  };
  const data = await fetchRestData(routes.method, routes.uri, routes.body, routes.params);
  return json({routes, data});
}

export default function RESTMethodRoute() {
  const {data} = useLoaderData<LoaderData>();
  console.log(data.payload);
  return (
    <>
      <ResponseBar status={data.status} statusText={data.statusText} size={data.size} time={Date.now() - data.start} />
      <Box sx={{marginTop: '1rem'}}>
        <JsonEditor mode="view" defaultValue={data.payload} />
      </Box>
    </>
  );
}
