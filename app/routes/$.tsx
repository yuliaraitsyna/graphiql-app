import {Typography} from '@mui/material';
import {GoBackLink, StartOverLink} from '~/components/CustomLinks';

export default function NotFoundPage() {
  return (
    <section style={{height: '100%', display: 'flex', flexFlow: 'column wrap', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h4" component={'h1'}>
          404
        </Typography>
        <Typography variant="h3" component={'h2'} style={{transform: 'translateY(-4px)'}}>
          &nbsp;|&nbsp;
        </Typography>
        <Typography variant="h5" component={'h3'}>
          non-existent route
        </Typography>
      </div>
      <GoBackLink />
      <StartOverLink />
    </section>
  );
}
