import {AppBar, Box, Container, IconButton, Stack, Toolbar, useScrollTrigger} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Link as RemixLink} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Menu as MenuIcon} from '@mui/icons-material';
import LanguageToggler from '../UI/LanguageToggler';
import WhiteButton from '../UI/WhiteButton';
import Logo from '../../../public/logo.svg';
import WhiteLink from '../UI/WhiteLink';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Header() {
  const {t} = useTranslation();
  const theme = useTheme();
  const [bgColor, setBgColor] = useState(theme.palette.primary.main);
  const trigger = useScrollTrigger({
    threshold: 0,
  });
  useEffect(() => {
    if (trigger) {
      setBgColor('#96B3D0');
    } else {
      setBgColor(theme.palette.primary.main);
    }
  }, [trigger, theme.palette.primary.main]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" style={{backgroundColor: bgColor, transition: 'all .8s'}}>
      <Container maxWidth="lg">
        <Toolbar sx={{padding: 0}}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={{
              padding: {xs: '10px 0', sm: '0'},
            }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <WhiteLink to="/">
                <img width="40" src={Logo} alt="App logo" />
              </WhiteLink>
              <Box display={{xs: 'none', md: 'flex'}} alignItems="center">
                <WhiteLink to="/">{t('mainPage')}</WhiteLink>
              </Box>
            </Stack>
            <Box display={{xs: 'flex', md: 'none'}}>
              <LanguageToggler />
              <IconButton onClick={handleMenuClick}>
                <MenuIcon sx={{color: 'white'}} />
              </IconButton>
            </Box>
            <Box display={{xs: 'none', md: 'flex'}} alignItems="center">
              <LanguageToggler />
              <Stack direction="row" spacing={1} ml={2}>
                <WhiteButton component={RemixLink} to="/sign-out">
                  {t('signOut')}
                </WhiteButton>
                <WhiteButton component={RemixLink} to="/sign-in">
                  {t('signIn')}
                </WhiteButton>
                <WhiteButton component={RemixLink} to="/sign-up">
                  {t('signUp')}
                </WhiteButton>
              </Stack>
            </Box>
          </Box>
        </Toolbar>
        <Box display={{xs: 'flex', md: 'none'}}>
          <MobileMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
        </Box>
      </Container>
    </AppBar>
  );
}
