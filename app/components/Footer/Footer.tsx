import {Box, Container, Link, Stack, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import gitLogo from '../../assets/images/git.svg';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        py: 3,
      }}>
      <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{width: '33%'}}>
          <Link href="https://github.com/playoffthecuff/graphiql-app" sx={{color: 'white'}}>
            <img src={gitLogo} width="25" alt="Github" />
          </Link>
          <Link href="https://github.com/elizaveta-tukailo/" sx={{color: 'white'}}>
            <img src={gitLogo} width="25" alt="Github" />
          </Link>
          <Link href="https://github.com/yuliaraitsyna" sx={{color: 'white'}}>
            <img src={gitLogo} width="25" alt="Github" />
          </Link>
        </Stack>
        <Typography sx={{color: 'white', width: '33%', textAlign: 'center'}}>© {new Date().getFullYear()}</Typography>
        <Link href="https://rs.school/react/" sx={{color: 'white', width: '33%', textAlign: 'right'}}>
          <img width="30" src="https://rs.school/assets/rss-logo-CM8B7fA7.svg" alt="RSSchool logo" />
        </Link>
      </Container>
    </Box>
  );
}
