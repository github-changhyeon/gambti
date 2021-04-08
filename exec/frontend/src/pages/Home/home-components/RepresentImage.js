import { React, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from '../index.module.css';
import { useHistory, generatePath } from 'react-router';
import { UserContext } from 'src/Context/UserContext';
import routerInfo from 'src/constants/routerInfo';
import NeonButton from 'src/components/NeonButton/NeonButton';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';

export default function RepresentImage() {
  const history = useHistory();
  const user = useContext(UserContext);

  const scrollToGames = (event) => {
    window.scrollTo({ top: 680, behavior: 'smooth' });
  };

  return (
    <Paper
      className={styles.main_post}
      // style={{ backgroundImage: 'url(/images/home_represent_YesterMorrow.jpg)' }}
      style={{
        backgroundImage:
          'url(https://cdn.akamai.steamstatic.com/steam/apps/1210490/extras/YesterMorrow24.gif?t=1604617995)',
      }}
    >
      <div className={styles.overlay} />
      <Grid
        container
        style={{
          justifyContent: 'center',
        }}
      >
        <Grid item md={6}>
          <div
            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
            onClick={() => {
              history.push({
                pathname: generatePath(routerInfo.PAGE_URLS.DETAIL, {
                  gameId: 1210490,
                }),
              });
            }}
          >
            <AvatarComp
              size="medium"
              imgPath={
                'https://cdn.akamai.steamstatic.com/steam/apps/1210490/header.jpg?t=1604617995'
              }
            ></AvatarComp>
          </div>
          <div className={styles.main_post_content}>
            <Typography className={styles.text_title}>Welcome to GAMBTI</Typography>
            <Typography className={styles.text_contents} paragraph>
              What I really love about GAMBTI is
              <br />
              that it makes me possible to select funny games!
            </Typography>
            {!user.isLoggedIn ? (
              <NeonButton
                onClick={() => {
                  history.push(routerInfo.PAGE_URLS.CHECK_GAMBTI);
                }}
                textValue="Find your GAMBTI"
              ></NeonButton>
            ) : (
              <NeonButton
                onClick={() => {
                  scrollToGames();
                }}
                textValue="Recommended Game"
              ></NeonButton>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
