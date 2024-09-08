import {Link} from '@mui/material';
import {ArrowBackIcon} from '../Icons';
import {useNavigate} from '@remix-run/react';

export function GoBackLink() {
  const navigate = useNavigate();
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Link onClick={() => navigate(-1)} component="button">
        <ArrowBackIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
        <span>You can go back</span>
      </Link>
    </div>
  );
}
