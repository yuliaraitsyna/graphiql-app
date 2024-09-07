import {json, type LoaderFunctionArgs, type MetaFunction} from '@vercel/remix';
import i18nServer from '../i18n.server';
import {AboutTeam} from '~/components/AboutTeam/AboutTeam';
import {AboutApp} from '~/components/AboutApp/AboutApp';
import {Welcome} from '~/components/Welcome/Welcome';
import {Button} from '@mui/material';
import {useState} from 'react';
import ErrorSnackbar from '~/components/ErrorSnackbar/ErrorSnackbar';
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: data?.title}, {name: 'description', content: data?.description}];
};

export async function loader({request}: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  return json({title: t('title'), description: t('description')});
}

export default function Index() {
  return (
    <>
      <Welcome />
      <AboutApp />
      <AboutTeam />
    </>
  );
}
