import {json, type LoaderFunctionArgs, type MetaFunction} from '@vercel/remix';
import i18nServer from '../i18n.server';
import {AboutTeam} from '~/components/AboutTeam/AboutTeam';
import {AboutApp} from '~/components/AboutApp/AboutApp';
import {Welcome} from '~/components/Welcome/Welcome';
import ErrorSnackbar from '~/components/ErrorSnackbar/ErrorSnackbar';
import {isRouteErrorResponse, useRouteError} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {StartOverLink} from '~/components/CustomLinks';

export function ErrorBoundary() {
  const [open, setOpen] = useState(true);
  const handleChange = (v: boolean) => {
    setOpen(v);
  };
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Unknown error';
  return (
    <ErrorSnackbar title={message} isOpen={open} onChange={handleChange}>
      <StartOverLink message="You can start over" />
    </ErrorSnackbar>
  );
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: data?.title}, {name: 'description', content: data?.description}];
};

export async function loader({request}: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  return json({title: t('title'), description: t('description')});
}

export default function Index() {
  const [e, setE] = useState(false);
  useEffect(() => {
    if (e) throw new Error('render error');
  }, [e]);
  return (
    <>
      <Welcome />
      <button onClick={() => setE(!e)}>TOGGLE</button>
      <AboutApp />
      <AboutTeam />
    </>
  );
}
