import {Link} from '@mui/material';
import {pages} from '~/constants';
import {HomeIcon} from '../Icons';

type Props = {
  message: string;
};

export const StartOverLink = ({message = 'or start over'}: Partial<Props>) => (
  <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Link href={pages.main.path}>
      <HomeIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
      <span>{message}</span>
    </Link>
  </div>
);
