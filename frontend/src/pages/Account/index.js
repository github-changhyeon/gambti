import React from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Divider } from 'material-ui';
import fire from 'src/firebaseConfig';
import { useHistory } from 'react-router';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Account() {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hi, setHi] = React.useState('hello');


  // 채팅 or 실시간으로 변경될때 편하게 사용 가능 
  var starCountRef = fire.database().ref('users/5qKHUGsoLCRuNGKEyZz7SY74g2Q2/' + 'username');
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = (event) => {
    // firebase Login
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // realtime Database 사용법
        // fire.database().ref('users/' + user.user.uid).set({
        //   username: 'ddddd',
        //   email: user.user.email,
        // })



        // Signed in
        // ...
        // console.log(user.user.uid)

        // history.push('/')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.root}>
        <Typography> {hi} </Typography>
        <form noValidate className={styles.form}>
          <Typography className={styles.policy}>
            By signing up, you agree to the Terms of User and Privacy Policy, including the Cookie Policy.
          </Typography>
          <TextField
            className={styles.input}
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            onChange={handleEmailChange}
          />
          <TextField
            className={styles.input}
            margin="normal"
            id="password"
            variant="outlined"
            type="password"
            label="Password"
            size="small"
            required
            onChange={handlePasswordChange}

          />
          <ButtonComp size='large' textvalue='LOGIN' onClick={onLogin}></ButtonComp>
          <hr />
          <ButtonComp size='large' textvalue='Sign in with Google'></ButtonComp>
          <ButtonComp size='large' textvalue='Sign in with Steam'></ButtonComp>
        </form>
        <div className={styles.move_page}>
          <a href="/account" className={styles.link}>or Sign Up</a>
          <a href="/forgot" className={styles.link}>Forgot Username or Password</a>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
