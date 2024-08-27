import {Avatar, Box, Card, CardContent, Container, Grid, Typography} from '@mui/material';
import {Link} from '@remix-run/react';
import {team} from '~/constants';
export default function AboutTeam() {
  return (
    <Container maxWidth="lg" style={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Typography component={'h3'} variant="h3" textAlign={'center'} style={{marginBottom: '16px'}}>
        About us
      </Typography>
      <Grid container spacing={2} sx={{marginBottom: '16px'}}>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" sx={{marginBottom: '20px'}}>
            The objective of this course is to acquire knowledge and practical experience in working with React, promote
            best coding practices, and provide an opportunity for collaborative teamwork.
          </Typography>
          <Typography variant="body1" sx={{marginBottom: '20px'}}>
            Working together as a team on a coding task brings out the best in all of us, and our collaboration is a
            testament to the synergy we create. Each team member brings unique skills and perspectives, which allows us
            to tackle challenges.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <Link to={member.git}>
                    <Avatar alt={member.name} src={member.image} sx={{width: 150, height: 150, margin: '0 auto'}} />
                  </Link>
                  <Typography variant="h6" component="div" align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{marginBottom: 2}}>
                    {member.role}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
