import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from '../index.module.css';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';
import Button from '@material-ui/core/Button';

export default function RepresentImage() {
  const history = useHistory();

  return (
    <Paper
      className={styles.main_post}
      style={{ backgroundImage: 'url(/images/home_represent_castle.jpg)' }}
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
            <Typography component="h1" variant="h2" style={{ color: 'white', fontFamily:'DungGeunMo'}} gutterBottom>
              Welcome Gambti
            </Typography>
            <Typography variant="h5" style={{ color: 'white', fontFamily:'DungGeunMo'}} paragraph align="center">
              What I really love about Gambti is that it makes me possible to select funny games!
            </Typography>
            <Button
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.CHECK_GAMBTI);
              }}
              style={{
                backgroundColor: '#ccff00',
                color: 'black',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              Find your GAMBTI
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
