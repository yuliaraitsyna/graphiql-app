import {Link, Typography} from '@mui/material';
import {useNavigate} from '@remix-run/react';
import {ArrowBackIcon, HomeIcon} from '~/components/Icons';
import {pages} from '~/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();
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
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link onClick={() => navigate(-1)} component="button">
          <ArrowBackIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
          <span>You can go back</span>
        </Link>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link href={pages.main.path}>
          <HomeIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
          <span>or start over</span>
        </Link>
      </div>
    </section>
  );
}
