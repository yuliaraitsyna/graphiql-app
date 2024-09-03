import {Button, Typography} from '@mui/material';
import {json, type LoaderFunctionArgs, type MetaFunction} from '@vercel/remix';
import {useLoaderData, useNavigate} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import i18nServer from '../i18n.server';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: data?.title}, {name: 'description', content: data?.description}];
};

export async function loader({request}: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  return json({title: t('title'), description: t('description')});
}

export default function Index() {
  const {t} = useTranslation();
  const {description} = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const handleLanguageChange = (lng: string) => {
    navigate(`?lng=${lng}`, {replace: true});
  };

  return (
    <>
      <Typography variant="h6" component="h1">
        {t('title')}
      </Typography>
      <Typography variant="subtitle1" component="p">
        {description}
      </Typography>
      <div style={{display: 'flex', gap: '1rem'}}>
        <Button variant="contained" onClick={() => handleLanguageChange('es')}>
          Español
        </Button>
        <Button variant="contained" onClick={() => handleLanguageChange('en')}>
          English
        </Button>
      </div>
    </>
  );
}
