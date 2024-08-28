import {Container, Grid, Typography} from '@mui/material';
import {team} from '~/constants';
import TeamCard from '../TeamCard/TeamCard';
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
          <TeamCard team={member} key={index} />
        ))}
        ;
      </Grid>
    </Container>
  );
}
