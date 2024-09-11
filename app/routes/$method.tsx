import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import RestRequest from '~/components/RESTfullClient/RestRequest/RestRequest';

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

export default function RESTMethodRoute() {
  return <RestRequest onSendRequest={() => {}} />;
}
