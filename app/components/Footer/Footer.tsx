import {Box, Container, Link, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

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
        <Link href="https://github.com/playoffthecuff/graphiql-app" sx={{color: 'white'}}>
          GitHub
        </Link>
        <Typography sx={{color: 'white'}}>© {new Date().getFullYear()}</Typography>
        <Link href="https://rs.school/react/" sx={{color: 'white'}}>
          <img width="32" src="https://rs.school/assets/rss-logo-CM8B7fA7.svg" alt="RSSchool logo" />
        </Link>
      </Container>
    </Box>
  );
}
