import {useLocation, useNavigate} from '@remix-run/react';
import {useEffect} from 'react';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import RestClient from '~/components/RESTfullClient/RestClient/RestClient';

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

export default function RESTMethodRoute() {
  const location = useLocation();
  const pathMethod = location.pathname.slice(1).toUpperCase() as HTTPMethods;
  const isValidMethod = Object.values(HTTPMethods).includes(pathMethod);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidMethod) navigate('/rest/GET');
  }, [isValidMethod, navigate]);
  return <RestClient />;
}
