import {Box, Button, Container, Typography} from '@mui/material';
import {Link as RemixLink} from '@remix-run/react';
export function Welcome() {
  return (
    <Container maxWidth="lg" sx={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '100%',
          boxShadow: 2,
        }}>
        <Typography component={'h2'} variant="h3" textAlign={'center'} style={{marginBottom: '24px'}}>
          Welcome!
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
          }}>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2, marginRight: 1}}
            component={RemixLink}
            to="/sign-in">
            Sign In
          </Button>
          <Button variant="contained" color="primary" sx={{marginBottom: 2}} component={RemixLink} to="/sign-up">
            Sign Up
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
          }}>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2, marginRight: 1}}
            component={RemixLink}
            to="/rest">
            Rest Client
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2, marginRight: 1}}
            component={RemixLink}
            to="/graphql">
            GraphiQL Client
          </Button>
          <Button variant="contained" color="primary" sx={{marginBottom: 2}} component={RemixLink} to="/history">
            History
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
