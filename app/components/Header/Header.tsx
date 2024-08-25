import {AppBar, Box, Container, Stack, useScrollTrigger} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Link as RemixLink} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import LanguageToggler from '../UI/LanguageToggler';
import WhiteButton from '../UI/WhiteButton';
import Logo from '../../../public/logo.svg';
import WhiteLink from '../UI/WhiteLink';

export default function Header() {
  const {t} = useTranslation();
  const theme = useTheme();
  const [bgColor, setBgColor] = useState(theme.palette.primary.main);

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  useEffect(() => {
    if (trigger) {
      setBgColor('#96B3D0');
    } else {
      setBgColor(theme.palette.primary.main);
    }
  }, [trigger, theme.palette.primary.main]);
  return (
    <>
      <AppBar position="sticky" style={{backgroundColor: bgColor}}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={2} flexWrap="wrap">
            <Stack direction="row" spacing={1}>
              <WhiteLink to="/">
                <img width="120" src={Logo} alt="App logo" />
              </WhiteLink>
              <Box display="flex" alignItems="center">
                <WhiteLink to="/fef">{t('mainPage')}</WhiteLink>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <LanguageToggler />
              <Stack direction="row" spacing={1}>
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
            </Stack>
          </Box>
        </Container>
      </AppBar>
    </>
  );
}
