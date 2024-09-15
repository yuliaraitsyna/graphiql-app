import {Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';

export function ErrorBoundary() {
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message="You can start over" />
    </ErrorBoundaryWrapper>
  );
}

export default function Check() {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) throw new Error('test');
  }, [error]);
  return (
    <Button onClick={() => setError(true)} variant="contained">
      Throw Error
    </Button>
  );
}
