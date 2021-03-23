import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from '../index.module.css';

export default function RepresentImage() {
  return (
    <Paper
      className={styles.main_post}
      style={{ backgroundImage: 'url(/images/home_represent_image.jpg)' }}
    >
      {/* Increase the priority of the hero background image */}
      <div className={styles.overlay} />
      <Grid
        container
        style={{
          justifyContent: 'center',
        }}
      >
        <Grid item md={6}>
          <div className={styles.main_post_content}>
            <Typography
              component="h1"
              variant="h3"
              style={{ color: 'white' }}
              gutterBottom
              align="center"
            >
              Welcome Gambti
            </Typography>
            <Typography variant="h5" style={{ color: 'white' }} paragraph align="center">
              What I really love about Gambti is that it makes me possible to select funny games!
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
