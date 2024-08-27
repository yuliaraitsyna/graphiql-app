import {Menu, MenuItem} from '@mui/material';
import {Link as RemixLink} from '@remix-run/react';
import WhiteButton from '../UI/WhiteButton';
import {useTranslation} from 'react-i18next';

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({anchorEl, open, onClose}) => {
  const {t} = useTranslation();
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiMenu-list': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}>
      <MenuItem onClick={onClose}>
        <WhiteButton component={RemixLink} to="/">
          {t('mainPage')}
        </WhiteButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <WhiteButton component={RemixLink} to="/sign-out">
          {t('signOut')}
        </WhiteButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <WhiteButton component={RemixLink} to="/sign-in">
          {t('signIn')}
        </WhiteButton>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <WhiteButton component={RemixLink} to="/sign-up">
          {t('signUp')}
        </WhiteButton>
      </MenuItem>
    </Menu>
  );
};
export default MobileMenu;
