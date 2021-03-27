import React, { useContext } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { UserContext } from 'src/Context/UserContext';
import background from 'src/Images/background.jpg';
import firebase from 'firebase';

export default function Login() {
  const history = useHistory();

  const user = useContext(UserContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [nullError, setNullError] = React.useState(false);
  const [emailVarifiedError, setEmailVarifiedError] = React.useState(false);
  const [passwordLengthError, setNullPasswordLengthError] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onLogin = (event) => {
    if (!email || !password) {
      setNullError(true);
      alert('모든 입력값을 채워주세요.');
      return;
    }
    let valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!valid.test(email)) {
      setEmailVarifiedError(true);
      alert('이메일 형식이 아닙니다.');
      return;
    }
    const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
    if (!reg.test(password)) {
      setNullPasswordLengthError(true);
      alert('비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하입니다.');
      return;
    }
    if (!nullError && !emailVarifiedError && !passwordLengthError) {
      // firebase Login
      fire.auth
        .signInWithEmailAndPassword(email, password)
        .then((currentUser) => {
          // token 지속성
          fire.auth
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              // console.log('성공');
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // alert('session', errorMessage);
            });

          if (currentUser.user.emailVerified) {
            history.push('/');
          } else {
            history.push('/email-confirm');
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Container component="main" maxWidth="xs">
        <div className={styles.root}>
          <form noValidate className={styles.form}>
            <Typography className={styles.policy}>
              By signing up, you agree to the Terms of User and Privacy Policy, including the Cookie
              Policy.
            </Typography>

            <div className={styles.form_holder}>
              {/* Email */}
              <input
                id="email"
                type="email"
                className={styles.newinput}
                placeholder="Email"
                required
                onChange={handleEmailChange}
              />
              {/* password */}
              <input
                id="password"
                type="password"
                className={styles.newinput}
                placeholder="Password"
                required
                onChange={handlePasswordChange}
              />
            </div>

            <div className={styles.buttons}>
              <ButtonComp
                size="large"
                textvalue="LOGIN"
                color="#CCFF00"
                onClick={onLogin}
              ></ButtonComp>
              {/* <hr /> */}
              {/* 소셜 로그인 */}
              {/* <GoogleLoginButton style={{ width: '330px' }} onClick={() => alert("Hellohi")} />
              <TwitterLoginButton style={{ width: '330px' }} onClick={() => alert("Hello")} /> */}
            </div>
          </form>
          <div className={styles.move_page}>
            <a href="/check-gambti" className={styles.link}>
              or Sign Up
            </a>
            <a href="/forgot" className={styles.link}>
              Forgot Username or Password
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
