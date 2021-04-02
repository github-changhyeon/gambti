import React, { useContext } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
import { UserContext } from 'src/Context/UserContext';
import { signup } from 'src/common/axios/Account';
import background from 'src/Images/background.jpg';
import firebase from 'firebase';

export default function Signup() {
  const history = useHistory();
  const user = useContext(UserContext);

  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [nullError, setNullError] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);
  const [emailVarifiedError, setEmailVarifiedError] = React.useState(false);
  const [passwordLengthError, setNullPasswordLengthError] = React.useState(false);
  const [nicknameError, setNicknameError] = React.useState(false);
  const [emailLengthError, setEmailLengthError] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleUserChange = (event) => {
    setNickname(event.currentTarget.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  };

  function PassConfirm() {
    const pass = document.getElementById('password');
    const confirm = document.getElementById('passwordConfirm');
    if (pass && confirm != null) {
      if (pass.value === '' || confirm.value === '') {
        return <Typography>&nbsp;</Typography>;
      }
      if (pass.value === confirm.value) {
        return <Typography>&nbsp;</Typography>;

      }
      if (pass.value !== confirm.value) {
        return <Typography className={styles.error}>비밀번호가 일치하지 않습니다.</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  // TODO: 두번 눌러야 해결됨
  // firebase signup
  const onSignup = (event) => {

    setNullError(false);
    setNicknameError(false);
    setEmailVarifiedError(false);
    setEmailLengthError(false);
    setNullPasswordLengthError(false);
    setPasswordMatchError(false);


    console.log(nullError)
    console.log(Boolean(email), Boolean(password), Boolean(passwordConfirm), Boolean(nickname));

    if (!email || !password || !passwordConfirm || !nickname) {
      setNullError(true);
      console.log(nullError);
      console.log('모든 입력값');
      alert("모든 입력값을 채워주세요.");
      return;
    }
    if (1 > nickname.length || nickname.length > 10) {
      setNicknameError(true);
      console.log('닉네임을 10자 이하 입니다.');
      alert("닉네임을 10자 이하 입니다.");
      return;
    }
    let valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!valid.test(email)) {
      setEmailVarifiedError(true);
      console.log('이메일 형식이 아닙니다.');
      alert("이메일 형식이 아닙니다.");
      return;
    }
    if (email.length > 30) {
      setEmailLengthError(true);
      console.log('이메일은 30자 이하 입니다.');
      alert("이메일은 30자 이하 입니다.");
      return;
    }
    const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
    if (!reg.test(password)) {
      setNullPasswordLengthError(true);
      console.log('비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하 입니다.');
      alert("비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하 입니다.");
      return;
    }
    if (password != passwordConfirm) {
      setPasswordMatchError(true);
      console.log('비밀번호 확인이 일치하지 않습니다.');
      alert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    console.log(nullError);
    console.log(passwordMatchError);
    console.log(emailVarifiedError);
    console.log(passwordLengthError);
    console.log(nicknameError);
    console.log(emailLengthError);

    if (
      !nullError &&
      !passwordMatchError &&
      !emailVarifiedError &&
      !passwordLengthError &&
      !nicknameError &&
      !emailLengthError
    ) {
      console.log('정상작동');
      fire.auth
        .createUserWithEmailAndPassword(email, password)
        .then((currentUser) => {
          history.push("/email-confirm");

          // token 받아오기
          fire.auth.currentUser
            .getIdToken()
            .then(function (idToken) {
              window.localStorage.setItem('idToken', idToken);
              // firebase.store에서 정보 가져와서 넣어줌
              // mbti, gender는 대문자
              const param = {
                mbti: 'INFP',
                gender: 'FEMALE',
                steamId: '',
                maxPrice: 0,
                age: 0,
              };

            // add user to db
            fire.db.collection("users").doc(currentUser.user.uid).set({
              nickname: nickname,
              email: currentUser.user.email,
              emailVerified: currentUser.user.emailVerified,
              uid: currentUser.user.uid,
              mbti: "INFP",
              gender: "FEMALE",
              steamId: "",
              maxPrice: 1,
              rooms: [],
              age: 0,
            });

            // axios
            // response.data.status: 상태
            // response.data.message: 메세지
            // response.data.data: get할 경우 객체 받는거
            signup(
              idToken,
              param,
              (response) => {
                // console.log(response, 'response');
                if (!response.data.status) {
                } else {
                  // console.log(response.data.message)
                }
              },
              (error) => {
                // console.log(error);
              }
            );
          })
            .catch(function (error) {
              // Handle error
            });

          const createdUser = currentUser.user;

          // 정보 수정
          createdUser
            .updateProfile({
              displayName: nickname,
            })
            .then(function () {
              // Update successful.
            })
            .catch(function (error) {
              // An error happened.
            });
          // 이메일 인증
          createdUser
            .sendEmailVerification()
            .then(function () {
              alert('인증메일 발송 이메일을 확인해주세요');
            })
            .catch(function (error) {
              alert('인증메일 발송에 실패하였습니다.');
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (error.code === 'auth/email-already-in-use') {
            alert('해당 이메일은 이미 존재합니다.');
          }
          // console.log(errorMessage);
          // ..
        });
    }
  };

  // TODO: preventDefault 알아보기
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSignup();
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
              By signing up, you agree to the Terms of User and Privacy
              Policy, including the Cookie Policy.
              </Typography>
            {/* 소셜 로그인 */}
            {/* <div className={styles.buttons}> */}
            {/* <GoogleLoginButton style={{ width: '330px' }} onClick={() => alert("Hellohihi")}>
              <span>
                Sign up with Google
              </span>
            </GoogleLoginButton>
            <TwitterLoginButton style={{ width: '330px' }} onClick={() => alert("Hello")} >
              <span>
                Sign up with Twitter
              </span>
            </TwitterLoginButton> */}
            {/* </div> */}
            {/* <hr /> */}

            <div className={styles.form_holder}>
              {/* nickname */}
              <input
                id="nickname"
                type="text"
                className={styles.newinput}
                autofocus
                placeholder="nickname"
                required
                onChange={handleUserChange}
              />
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
              <input
                id="passwordConfirm"
                type="password"
                className={styles.newinput}
                placeholder="PasswordConfirm"
                required
                onChange={handlePasswordConfirmChange}
                onKeyPress={handleKeyPress}
              />
              <PassConfirm></PassConfirm>
            </div>

            <div className={styles.buttons}>
              <ButtonComp
                size="large"
                textvalue="SIGN UP"
                color="#CCFF00"
                onClick={onSignup}
                onKeyPress={onSignup}
              ></ButtonComp>
            </div>
          </form>
          <div className={styles.move_page}>
            <a href="/login" className={styles.link}>
              or Log In
              </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
