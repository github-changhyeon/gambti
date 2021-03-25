import React, { useContext } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { GoogleLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import { UserContext } from 'src/Context/UserContext';
import { signup } from 'src/common/axios/Account';

export default function Signup() {
  const history = useHistory();
  const user = useContext(UserContext);

  const [email, setEmail] = React.useState('');
  const [nickName, setNickName] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserChange = (event) => {
    setNickName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  // firebase signup
  const onSignup = (event) => {
    fire.auth.createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        history.push('/email-confirm');
        console.log(currentUser.user.emailVerified)

        // token 받아오기
        fire.auth.currentUser.getIdToken().then(function (idToken) {
          // firebase.store에서 정보 가져와서 넣어줌
          const param = {
            mbti: 'INFP',
            gender: 'FEMALE',
            steamId: '',
            maxPrice: 0,
            age: 0
          }

          // axios
          // response.data.status: 상태
          // response.data.message: 메세지
          // response.data.data: get할 경우 객체 받는거 
          signup(idToken, param, (response) => {

            // console.log(response, 'response');
            if (!response.data.status) {
            }
            else {
              // console.log(response.data.message)
            }
          }, (error) => {
            // console.log(error);
          })

        }).catch(function (error) {
          // Handle error
        });

        // add user to db
        fire.db.collection("users").doc(currentUser.user.uid).set({
          nickName: nickName,
          email: currentUser.user.email,
          emailVerified: currentUser.user.emailVerified,
          mbti: 'INFP',
          gender: 'FEMALE',
          steamId: '',
          maxPrice: 0,
          age: 0
        })

        const createdUser = currentUser.user;


        // 정보 수정
        createdUser.updateProfile({
          displayName: nickName,
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
        // 이메일 인증 
        createdUser.sendEmailVerification().then(function () {
          alert('인증메일 발송 이메일을 확인해주세요');
        }).catch(function (error) {
          alert('인증메일 발송에 실패하였습니다.');
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          alert('해당 이메일은 이미 존재합니다.')
        }
        console.log(errorMessage);
        // ..
      });
  }
  // TODO: preventDefault 알아보기
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSignup();
    }
  }

  return (
    <div className={styles.background}>
      <Container component="main" maxWidth="xs">
        <div className={styles.root}>
          <form noValidate className={styles.form}>
            <Typography className={styles.policy}>
              By signing up, you agree to the Terms of User and Privacy Policy, including the Cookie Policy.
          </Typography>
            {/* 소셜 로그인 */}
            {/* <div className={styles.buttons}> */}
            <GoogleLoginButton style={{ width: '330px' }} onClick={() => alert("Hellohihi")}>
              <span>
                Sign up with Google
              </span>
            </GoogleLoginButton>
            <TwitterLoginButton style={{ width: '330px' }} onClick={() => alert("Hello")} >
              <span>
                Sign up with Twitter
              </span>
            </TwitterLoginButton>
            {/* </div> */}
            <hr />
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
              id="nickName"
              label="NickName"
              variant="outlined"
              size="small"
              onChange={handleUserChange}
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
              onKeyPress={handleKeyPress}
            />
            <div className={styles.buttons}>
              <ButtonComp size='large' textvalue='SIGN UP' color='#CCFF00' onClick={onSignup} onKeyPress={onSignup}></ButtonComp>
            </div>
          </form>
          <div className={styles.move_page}>
            <a href="/login" className={styles.link}>or Log In</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
