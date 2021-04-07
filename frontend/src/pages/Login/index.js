import React, { useContext } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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

  const valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  function Email() {
    const email = document.getElementById('email');
    if (email != null) {
      if (email.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (!valid.test(email.value)) {
        setNullError(false);
        setEmailVarifiedError(true);
        return <Typography className={styles.error}>이메일 형식이 아닙니다.</Typography>;
      } else {
        setNullError(false);
        setEmailVarifiedError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
    }
    // setNullError(true);
    return <Typography className={styles.error_message}>&nbsp;</Typography>;
  }

  // 비밀번호 규칙
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
  function Pass() {
    const pass = document.getElementById('password');
    if (pass != null) {
      if (pass.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (!reg.test(pass.value)) {
        setNullError(false);
        setNullPasswordLengthError(true);
        return (
          <Typography className={styles.error}>
            비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하입니다.
          </Typography>
        );
      } else {
        setNullError(false);
        setNullPasswordLengthError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
    }
    // setNullError(true);
    return <Typography>&nbsp;</Typography>;
  }

  const onLogin = (event) => {
    if (nullError || emailVarifiedError || passwordLengthError) {
      alert('조건에 적합하지 않은 부분이 있습니다.');
    } else {
      // firebase Login
      fire.auth
        .signInWithEmailAndPassword(email, password)
        .then((currentUser) => {
          // token 지속성
          fire.auth
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              // console.log('성공');
              fire.auth.currentUser
                .getIdToken()
                .then(function (idToken) {
                  window.localStorage.setItem('idToken', idToken);
                })
                .catch(function (error) {
                  // Handle error
                });
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // alert('session', errorMessage);
            });

          fire.messaging.getToken().then((res) => {
            console.log('res', res);
            fire.db.collection('users').doc(currentUser.user.uid).update({
              fcmToken: res,
            });
          });

          if (currentUser.user.emailVerified) {
            console.log(currentUser.user);
            history.push('/');
          } else {
            history.push('/email-confirm');
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (
            errorMessage ===
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            alert('사용자가 존재하지 않습니다.');
          } else if (
            errorMessage === 'The password is invalid or the user does not have a password.'
          ) {
            alert('비밀번호가 일치하지 않습니다.');
          }
        });
    }
  };
  // TODO: preventDefault 알아보기
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onLogin();
    }
  };

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
              <Typography className={styles.title}>Login</Typography>
              <Typography className={styles.policy}>
                By signing up, you agree to the Terms of User and Privacy Policy, including the
                Cookie Policy.
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
                <Email className={styles.error} />
                {/* password */}
                <input
                  id="password"
                  type="password"
                  className={styles.newinput}
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
                />
                <Pass className={styles.error} />
              </div>

              <div className={styles.buttons}>
                <ButtonComp
                  size="large"
                  textvalue="LOGIN"
                  color="#CCFF00"
                  onClick={onLogin}
                  onKeyPress={onLogin}
                ></ButtonComp>
                {/* <hr /> */}
                {/* 소셜 로그인 */}
                {/* <GoogleLoginButton style={{ width: '330px' }} onClick={() => alert("Hellohi")} />
              <TwitterLoginButton style={{ width: '330px' }} onClick={() => alert("Hello")} /> */}
              </div>
            </form>
            <div className={styles.move_page}>
              <a href="/check-gambti" className={styles.link}>
                Sign Up
              </a>
              &nbsp;&nbsp;or&nbsp;&nbsp;
              <a href="/forgot" className={styles.link}>
                Forgot Password
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
