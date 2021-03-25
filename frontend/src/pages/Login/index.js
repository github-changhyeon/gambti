import React from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";


export default function Login() {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  // 채팅 or 실시간으로 변경될때 편하게 사용 가능 
  // var starCountRef = fire.database().ref('users/5qKHUGsoLCRuNGKEyZz7SY74g2Q2/' + 'username');
  // starCountRef.on('value', (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data)
  // });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = (event) => {
    // firebase Login
    fire.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // realtime Database 사용법
        // fire.database().ref('users/' + user.user.uid).set({
        //   username: 'ddddd',
        //   email: user.user.email,
        // })
        // console.log(user);
        if (user.user.emailVerified) {
          history.push('/');
        } else {
          history.push('/email-confirm')
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        alert(errorMessage)
      });
  }

  return (
    <div className={styles.background}>
      <Container component="main" maxWidth="xs">
        <div className={styles.root}>
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
            <div className={styles.buttons}>
              <ButtonComp size='large' textvalue='LOGIN' color='#CCFF00' onClick={onLogin}></ButtonComp>
              <hr />
              {/* 소셜 로그인 */}
              <GoogleLoginButton style={{ width: '330px' }} onClick={() => alert("Hellohi")} />
              <TwitterLoginButton style={{ width: '330px' }} onClick={() => alert("Hello")} />
            </div>
          </form>
          <div className={styles.move_page}>
            <a href="/checkgambti" className={styles.link}>or Sign Up</a>
            <a href="/forgot" className={styles.link}>Forgot Username or Password</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
