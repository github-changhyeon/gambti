import React from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import background from 'src/Images/background.jpg';

export default function ForgotSent() {
  const history = useHistory();

  return (
    <div
      className={styles.background_image}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={styles.background}>
        <Container component="main" maxWidth="xs">
          <div className={styles.root}>
            <form noValidate className={styles.form}>
              <Typography className={styles.title}>Check your mail!</Typography>
              <Typography className={styles.sub}>
                We’ve sent your login credentials to the email address you entered.
              </Typography>
              <Typography className={styles.sub2}>
                If you don’t see our email within 10 minutes, please check your spam folder. It
                might have been gobbled up!
              </Typography>
              <div className={styles.buttons}>
                <ButtonComp
                  size="large"
                  textvalue="Login"
                  color="#CCFF00"
                  onClick={() => {
                    history.push('/login');
                  }}
                />
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
