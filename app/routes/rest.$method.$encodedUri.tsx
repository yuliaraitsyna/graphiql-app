// import {LoaderFunctionArgs} from '@vercel/remix';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import RestClient from '~/components/RESTfullClient/RestClient/RestClient';

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

// export async function loader({params}: LoaderFunctionArgs) {
//   return null;
// }

export default function RESTMethodRoute() {
  console.log('ENCODED');
  return (
    <>
      <h1>ENCODED</h1>
      <RestClient />
    </>
  );
}
