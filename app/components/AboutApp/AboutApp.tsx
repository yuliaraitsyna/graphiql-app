import {Box, Card, CardContent, Container, Grid, Typography} from '@mui/material';

export function AboutApp() {
  return (
    <Container maxWidth="lg" style={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Typography component={'h3'} variant="h3" textAlign={'center'} style={{marginBottom: '16px'}}>
        About project
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        RS School is a free and community-based online education program conducted by The Rolling Scopes Community since
        2013. Currently 500+ developers from different countries and companies involve in the education process as
        mentors.
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        React course provides by RS School is designed for developers who want to harness the power of one of the most
        popular JavaScript libraries in the world. Dive deep into the essentials of React and learn how to create
        dynamic, high-performance user interfaces. Throughout the course, you will engage in hands-on projects that
        solidify your understanding and give you practical experience. Learn best practices for building scalable
        applications, manage application state effectively, and optimize performance.
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        Now lets provide a short overview of the app that our team created as the final project for the React Course at
        RS School. There are two main features of our project:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Box display="flex" height="100%">
            <Card
              style={{flexGrow: 1}}
              sx={{
                flexGrow: 1,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {boxShadow: 6},
              }}>
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  REST client
                </Typography>
                <img
                  src="https://voyager.postman.com/illustration/rest-client/rest-client-hero-postman.svg"
                  alt="Rest api"
                  style={{display: 'block', margin: '16px auto', maxHeight: '200px', maxWidth: '100%'}}
                />
                <Typography variant="body1" component="div" align="center">
                  Traditional approaches to calling a REST API require the API user to know a programming language,
                  understand the APIs protocol, and interpret the response. A REST client streamlines this process,
                  enabling developers of all levels to explore, test, and debug REST APIs from an intuitive user
                  interface.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box display="flex" height="100%">
            <Card
              style={{flexGrow: 1}}
              sx={{
                flexGrow: 1,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {boxShadow: 6},
              }}>
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  GraphiQL Client
                </Typography>
                <img
                  src="https://pbs.twimg.com/profile_images/1139581957887733760/EeojZPdO_400x400.png"
                  alt="Rest api"
                  style={{display: 'block', margin: '16px auto', maxHeight: '200px', maxWidth: '100%'}}
                />
                <Typography variant="body1" component="div" align="center">
                  GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing
                  data. GraphQL provides a complete and understandable description of the data in your API, gives
                  clients the power to ask for exactly what they need and nothing more.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
